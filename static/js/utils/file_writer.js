// Note: The file system has been prefixed as of Google Chrome 12:
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
function initFS(callback) {
	//request the usage
	window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.PERSISTENT, //the type can be either TEMPORARY or PERSISTENT
		function(used, remaining) {
		  console.log("Used quota: " + used + ", remaining quota: " + remaining);
		}, function(e) {
		  console.log('Error: ', e); 
	});
	//request for persistent storage
	window.webkitStorageInfo.requestQuota(PERSISTENT, 5*1024*1024, function(grantedBytes) {
		window.requestFileSystem(PERSISTENT, grantedBytes, function(fs){
			fis = fs;
			if(typeof callback !== 'undefined') {
				callback();
			}
		}, errorCallback);
	}, function(e) {
		console.log('Error', e);
	});
}

function backupData(jsondata) {
	var d = new DateTimeConvertor();
	if(!fis) {
		console.log("No file system api has been init...");
		return;
	}
	try {
		console.log("backing up data...");
  		fis.root.getFile('backup-'+d.getCurrentDateAndTime()+'.json', {create: true, exclusive: true}, 
  			function(fileEntry) {
  			// Create a FileWriter object for our FileEntry (log.txt).
  			try{
  				fileEntry.createWriter(function(fileWriter) {
  					fileWriter.onwriteend = function(e) {
  						enablepage();
  						console.log('Write completed.');
  					};
  					fileWriter.onerror = function(e) {
  						console.log('Write failed: ' + e.toString());
  					};
  					// Create a new Blob and write it to log.txt.
  					var blob = new Blob([jsondata], {type: 'application/json;charset=UTF-8'});
  					fileWriter.write(blob);
  				}, errorCallback);
  			} catch (e) {
				// TODO: handle exception
			}
  		}, 
  		errorCallback);
  	} catch (e) {
		console.log("open file export for read or append");
	}
}

function listBackupFiles(callback) {
	if(!fis) {
		console.log("Start to init the file system...");
		initFS(function(){
			var dirReader = fis.root.createReader();
			dirReader.readEntries(function(entries){callback(entries);}, errorCallback);
		});
	}
	else {
		var dirReader = fis.root.createReader();
		dirReader.readEntries(function(entries){callback(entries);}, errorCallback);
	}
}

function errorCallback(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      console.log("file already exist...");
      appendFile();
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

