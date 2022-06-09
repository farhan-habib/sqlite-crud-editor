<script setup>
import { useFileSystemAccess } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { FileSystemAccessHelper } from "@/scripts/FileSystemAccessHelper";
import { DatabaseHandler } from '@/scripts/DatabaseHandler';
let DbHandler;

const allTables = ref([]); //the list of all tables in the database
const userSQLQuery = ref(""); //the SQL query that the user wants to run on the database

let userTableDisplay = ref({ columns: [], rows: [] });
const content = FileSystemAccessHelper.res.data //content of the actual file





function newTableSelected(m) {
	userSQLQuery.value = `SELECT * FROM '${allTables.value[m.target.value]}'`
}

function executeUserQuery(e) {
	// if (userSQLQuery.value.length > 0) {
	// 	userTableDisplay.value = (JSON.stringify(DbHandler.runRawQuery(userSQLQuery.value)));
	// }
	const dbOutput = DbHandler.runRawQuery(userSQLQuery.value)[0];
	let output = [];
	userTableDisplay.value.columns = dbOutput.columns.map(m => { return { text: m, value: m, sortable: true } },);

	for (let i = 0; i < dbOutput.values.length; i++) {
		let row = {};
		for (let j = 0; j < dbOutput.columns.length; j++) {
			row[dbOutput.columns[j]] = dbOutput.values[i][j];
		}

		output.push(row);
	}


	userTableDisplay.value.rows = output;
	console.log(userTableDisplay.value)
}


const str = (reactive({
	isSupported: FileSystemAccessHelper.res.isSupported,
	file: FileSystemAccessHelper.res.file,
	fileName: FileSystemAccessHelper.res.fileName,
	fileMIME: FileSystemAccessHelper.res.fileMIME,
	fileSize: FileSystemAccessHelper.res.fileSize,
	fileLastModified: FileSystemAccessHelper.res.fileLastModified,
}))

async function newDatabase() {
	await FileSystemAccessHelper.openFileChooser();


	DbHandler = new DatabaseHandler((new Uint8Array(FileSystemAccessHelper.getData().value)));
	allTables.value = DbHandler.getAllTables();
}

</script>

<template>
	<div id="buttonFlex">
		<div class="flex flex-row justify-between">
			<div id="fileUpDwn" class="inline-flex rounded-md shadow-sm" role="group">
				<button type="button" @click="newDatabase"
					class=" inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 ">

					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" />
					</svg>
					Open
				</button>
				<button type="button" @click="FileSystemAccessHelper.saveAsNew" :disabled="content == undefined"
					class=" inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 ">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
					Download
				</button>
			</div>

			<div id="dbManipulation" class="inline-flex rounded-md shadow-sm" role="group">
				<button type="button" @click="executeUserQuery" :disabled="content == undefined"
					class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd" />
					</svg>
					Run Command
				</button>
			</div>

			<div id="fileSaveLocal" class="inline-flex rounded-md shadow-sm" role="group">
				<button type="button" @click="FileSystemAccessHelper.updateLocal" :disabled="content == undefined"
					class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
					</svg>
					Update Local File
				</button>
			</div>
		</div>
	</div>

	<splitpanes id="contentPane" class="splitPaneTheme" horizontal>

		<pane>
			<div class="w-full">
				<select :disabled="allTables.length == 0" @input="newTableSelected"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
					<option selected disabled class="hidden" value="null">Choose a Table</option>
					<option v-for="(tableName, tableNameIndex) in allTables" :value="tableNameIndex">{{ tableName }}
					</option>
				</select>

				<div>
					<input type="text" v-model="userSQLQuery" :disabled="content == undefined"
						placeholder="Input Your Query Here"
						class="w-8/12 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
					<!-- <button type="button" @click="executeUserQuery" :disabled="content == undefined"
						class="py-2.5 px-5 text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
						Execute Query</button> -->
				</div>


			</div>
		</pane>
		<pane>
			<div class="w-full">
				<!-- {{ userTableDisplay }} -->
				<EasyDataTable :headers="userTableDisplay.columns" :items="userTableDisplay.rows" />
			</div>
		</pane>
	</splitpanes>


</template>
<style lang="postcss">
#contentPane {
	@apply h-auto
}

:disabled {
	@apply border-solid border-2 border-sky-500
}
</style>