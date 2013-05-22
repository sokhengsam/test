var SQLiteHelper =  new Class({
	db: '',
	Implements: [Options, Fields],
	options: {
		dbName: 'casi',
		dbDescription: "CASI Schema",
		size: 2 * 1024 * 1024,
		tableName: '',
		db:'',
	},
	fields: {},//fields of the tables, will be provided in the child class
	jQuery: "SQLiteHelper",
	initialize: function(options, fields){
		this.setOptions(options); // inherited from Options like jQuery.extend();
		this.setFields(fields);
		if(this.options.db == '') {
			this.options.db = openDatabase(this.options.dbName, "1.0", this.options.dbDescription, this.options.size);
		}
	},
	createTable: function() {
		var self = this;
		this.options.db.transaction(function(tx) {
			tx.executeSql(self.getCreateTableStatement(), [], function(){console.log("create table done!");}, function(tx, error){console.log("create tale fail!!! " + error.message);});
		});
	},
	persist: function(domain,processCompleteCallback) {
		var primaryKeyFieldName;
		for(var n in domain.fields) {
			if(domain.fields[n].isPrimaryKey === true) {
				primaryKeyFieldName = domain.fields[n].name;
				break;
			}
		}
		//if(domain.options[primaryKeyFieldName] !== '') {
			//this.update(domain);
		//}
		//else {
			var self = this;
			var d = [];
			var p = this.findPrimaryKeyName();
			if(!domain.fields.primaryKey.isAutoIncrease) {
				d.push(domain.options[p]);
			}
			for(var n in domain.options) {
				//skip the value if the primary key is integer cos it's already autoincrease
				if(!(p == n)) {
					d.push(domain.options[n]);
				}
			}
			self.getDB().transaction(function(tx) {
				tx.executeSql(self.getInsertStatement(), d, function(transaction, resultSet){
					console.log("persist " + self.options.tableName);
					if(typeof(processCompleteCallback) !== "undefined"){
						//insertId is for autoincrease primary key
						processCompleteCallback(resultSet.insertId);
					}
				}, 
				function(tx, error){
					if(typeof(processCompleteCallback) !== "undefined"){
						processCompleteCallback();
					}
				});
			});
		//}
	},
	clear: function(primaryKey, successCallBack, failCallBack) {
		var clearStatement = "DELETE FROM " + this.options.tableName;
		if(typeof primaryKey !== 'undefined') {
			clearStatement += " WHERE " + this.findPrimaryKeyName() + "=" + primaryKey; 
		}
		this.options.db.transaction(function(tx) {
			tx.executeSql(clearStatement, [], 
			function(){
				if(typeof successCallBack === 'function') {
					successCallBack();
				}
			}, 
			function(tx, error){
				if(typeof failCallBack === 'function') {
					failCallBack();
				}
			});
		});
	},
	
	update: function(domain,processCompleteCallback) {
		var self = this;
		var d = [];
		var p = this.findPrimaryKeyName();
		for(var n in domain.options) {
			//skip the value if the primary key is integer cos it's already autoincrease
			if(!(p == n)) {
				d.push(domain.options[n]);
			}
		}
		d.push(this.getPrimaryKey(domain));
		this.options.db.transaction(function(tx) {
			tx.executeSql(self.getUpdateStatement(), d, 
					function(){
						if(typeof(processCompleteCallback) != "undefined"){
							processCompleteCallback();							
						}
						console.log("Update succed");
					},
					function(tx, error){
						if(typeof(processCompleteCallback) != "undefined"){
							processCompleteCallback();							
						}
						console.log("Update fail " + error.message);
				});
		});
		
	},
	remove: function(id) {
		var self = this;
		this.options.db.transaction(function(tx) {
			tx.executeSql(self.getUpdateStatement(), [id], function(){alert("Delete record succed");}, function(tx, error){alert("Update fail " + error.message);});
		});
	},
	getPrimaryKey: function(domain) {
		var p = '';
		for(var n in this.fields) {
			if(this.fields[n].isPrimaryKey === true) {
				p = this.fields[n].name;
				break;
			}
		}
		return domain.options[p];
	},
	findPrimaryKeyName: function() {
		var p = "";
		for(var n in this.fields) {
			if(this.fields[n].isPrimaryKey === true && this.fields[n].dataType ==='INTEGER') {
				p = this.fields[n].name;
				break;
			}
		}
		return p;
	},
	getFindByPrimaryKeyStatement: function(id) {
		var findByPrimaryKeyStatement = "SELECT * FROM " + this.options.tableName + " WHERE " + this.findPrimaryKeyName() + " = " + id;
		return findByPrimaryKeyStatement;
	},
	getCreateTableStatement: function() {
		var createStatement = "CREATE TABLE IF NOT EXISTS " + this.options.tableName;
		var tFields = " (";
		for(var n in this.fields) {
			var f = this.fields[n];
			tFields = tFields + f.name + " "+ f.dataType;
			if(f.isPrimaryKey === true) {
				tFields += " PRIMARY KEY";
				if(this.fields[n].dataType === 'INTEGER') {
					tFields += " AUTOINCREMENT"; 
				}
			}
			tFields +=", ";
		}
		//remove the last ", " and concat with the ")"
		tFields = tFields.substring(0, tFields.length -2) + ")";
		createStatement += tFields;
		return createStatement;
	},
	
	getSelectAllStatement: function(){
		var selectAllStatement= "SELECT * FROM " + this.options.tableName;
		return selectAllStatement;
	},
	getInsertStatement: function(){
		var insertStatement = "INSERT INTO " + this.options.tableName;
		var tFields = " (",
			value = " VALUES (";
		for(var n in this.fields) {
			var f = this.fields[n];
			if(!(f.isAutoIncrease === true)) {
				tFields += f.name + ", ";
				value += "?, "; 
			}
		}
		//remove the last ", " and concat with the ")"
		tFields = tFields.substring(0, tFields.length -2) + ")";
		value = value.substring(0, value.length -2) + ")";
		insertStatement += tFields + value;
		return insertStatement;
	},
	getUpdateStatement: function(){
		var pk = '';
		var updateStatement = "UPDATE "+this.options.tableName+" SET ";
		var p = '';
		for(var n in this.fields) {
			var f = this.fields[n];
			if(f.isPrimaryKey === true) {
				pk = f.name;
			}
			else {
				p += f.name  + " = ?, ";
			}
		}
		p = p.substring(0, p.length -2);
		updateStatement += p + " WHERE " + pk + " = ?";
		return updateStatement;
	},
	getDeleteStatement: function(){
		var deleteStatement= "DELETE FROM "+this.options.tableName+" WHERE id=?";
		return deleteStatement;
	},
	getDropStatement: function(){
		//dropStatement: "DROP TABLE Contacts";
		
	},
	dropTable: function(callback) {
		var self = this;
		var dropStatement = "DROP TABLE IF EXISTS " + this.options.tableName;
		this.options.db.transaction(function(tx) {
			tx.executeSql(dropStatement, [], function() {console.log("Drop table "+self.options.tableName+" complete");callback();}, function(tx, error){console.log("Drop table "+self.options.tableName+" problem " + error.message);});
		});
	},
	getLastRecord: function(primaryKeyField) {
		var selectLast = "SELECT * FROM "+this.options.tableName;
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(selectLast, [], function(tx, result) {
				dataset = result.rows;
				//for (var i = 0, item = null; i < dataset.length; i++) {
				if(dataset.length > 0) {
					item = dataset.item(dataset.length -1);
				}
				//}
			});
		});
		return item;
	},
	remove: function(id) {
		
	},
	queryAllQuestionaires: function() {
		
	},
	queryById: function(id) {
		
	},
	queryByLatestSurvays: function() {
		
	},
	getDB: function() {
		return this.options.db;
	}
});