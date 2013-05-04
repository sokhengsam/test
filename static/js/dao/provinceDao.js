var ProvinceDao = new Class({
	Extends: SQLiteHelper,
	Implements: Province,
	options: {
		tableName: 'Province',
	},
	jQuery: 'ProvinceDao',
	initialize: function(options) {
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		this.createTable();
	},
	getAll: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Province();
					item.setProvinceId(dataset.item(i)["provinceId"]);
					item.setProvinceCode(dataset.item(i)["provinceCode"]);
					item.setProvinceName(dataset.item(i)["provinceName"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	}
});