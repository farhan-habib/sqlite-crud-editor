import { useFileSystemAccess } from "@vueuse/core";


const FileSystemAccessHelper = {
	
		res: useFileSystemAccess({
			dataType: "ArrayBuffer", // Text, ArrayBuffer, Blob
			types: [
				{
					description: "SQLite Database",
					accept: {
						"application/x-sqlite3": [".sqlite"],
					},
				},
			],
			excludeAcceptAllOption: true,
		}),

	openFileChooser: function() {
		this.res.open();
	},
	getData: function(){
		return new Uint8Array(this.res.data.value);
	},
	saveAsNew: function(){
		this.res.saveAs({suggestedName: `UPDATED_${this.res.fileName.value}`});
	},
	updateLocal: async function(){
		await this.res.save();
	}


//res.open() // opens file picker to choose a new file
// res.save() // saves the current file
// res.saveAs() // saves the current file as a new file
}

export { FileSystemAccessHelper };
