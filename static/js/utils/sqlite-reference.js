var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);
var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, phone TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (firstName, lastName, phone) VALUES (?, ?, ?)";
var updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";

var results = document.getElementById('results'); 
var id = document.getElementById('id');
var firstName = document.getElementById('firstName');  
var lastName = document.getElementById('lastName');  
var phone = document.getElementById('phone');


function createTable() { 
	db.transaction(function(tx) {
		tx.executeSql(createStatement, [], showRecords, onError);
	});
}

function insertRecord() {
	db.transaction(function(tx) {
		tx.executeSql(insertStatement, [firstName.value, lastName.value, phone.value], showRecords, onError);
	});
}

function loadRecord(i) {
	var item = dataset.item(i); 
	firstName.value = item['firstName'];
	lastName.value = item['lastName'];
	phone.value = item['phone'];
	id.value = item['id']; 
}
	
function updateRecord() {
	db.transaction(function(tx) {
		tx.executeSql(updateStatement, [firstName.value, lastName.value, phone.value, id.value], showRecords, onError);
	}); 
}
function deleteRecord(id) {
	db.transaction(function(tx) {
		tx.executeSql(deleteStatement, [id], showRecords, onError);
	});
}
function dropTable() {
	db.transaction(function(tx) {
		tx.executeSql(dropStatement, [], showRecords, onError);
	});
}

function onError(tx, error) {
	alert(error.message);
}

function showRecords() {
	results.innerHTML = '';
	db.transaction(function(tx) {
		tx.executeSql(selectAllStatement, [], function(tx, result) {
			dataset = result.rows;
			for (var i = 0, item = null; i < dataset.length; i++) {
				item = dataset.item(i);
				results.innerHTML += '<li>' + item['lastName'] + ' , ' + item['firstName'] + ' <a href="#" onclick="loadRecord('+i+')">edit</a>  ' +  
					 '<a href="#" onclick="deleteRecord('+item['id']+')">delete</a></li>';
			}
		});
	});
}
