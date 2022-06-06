import initSqlJs from "@/assets/sql.js";
const SQL = await initSqlJs();

class DatabaseHandler {
	/**
	 *
	 * @param {Uint8Array} databaseData a Uint8Array containing the data of the SQLite database. Optional Parameter
	 */
	constructor(databaseData) {
		if (databaseData !== undefined) {
			this.db = new SQL.Database(databaseData);
		} else {
			this.db = new SQL.Database();
		}
		//if there is no database data submitted, create a new empty database.
	}


/**
 * 
 * @param {String} statement the statement to execute on the database
 */
	runRawStatement(statement){
		const stmt = this.db.run(statement);
	}


	runRawQuery(statement){
		const stmt = this.db.exec(statement);
		return stmt;
	}


	getAllTables(){
		let res = [];
		// const stmt = this.db.exec("SELECT NAME FROM sqlite_master WHERE type='table'ORDER BY name");
		// return stmt;
		const stmt = this.db.prepare("SELECT NAME FROM sqlite_master WHERE type='table'ORDER BY name");
		while(stmt.step()){
			res.push(stmt.get()[0]);
			// console.log(stmt.get());
		}
return res;
	}



}

export { DatabaseHandler };
