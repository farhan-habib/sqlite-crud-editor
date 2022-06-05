<script setup>
import { useFileSystemAccess } from '@vueuse/core'
import { reactive, ref } from 'vue'



// const res = useFileSystemAccess({
// 	dataType: 'Blob', // Text, ArrayBuffer, Blob
// 	types: [{
// 		description: 'SQLite Database',
// 		accept: {
// 			'application/x-sqlite3': [".sqlite"],
// 		},
// 	}],
// 	excludeAcceptAllOption: true,
// })
const res = useFileSystemAccess({
	dataType: 'Text',
	types: [{
		description: 'text',
		accept: {
			'text/plain': ['.txt', '.html'],
		},
	}],
	excludeAcceptAllOption: true,
})


const content = res.data //content of the actual file
const str = (reactive({
	isSupported: res.isSupported,
	file: res.file,
	fileName: res.fileName,
	fileMIME: res.fileMIME,
	fileSize: res.fileSize,
	fileLastModified: res.fileLastModified,
}))
async function onSave() {
	await res.save()
}

//res.open() // opens file picker to choose a new file
// res.save() // saves the current file
// res.saveAs() // saves the current file as a new file


</script>

<template>
	<pre class="code-block" lang="yaml">{{ res }}</pre>
	<br />
	<hr /><br />

	<div class="flex flex-row justify-between">
		<div class="inline-flex rounded-md shadow-sm" role="group">
			<button type="button" @click="res.open()"
				class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 ">

				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
						d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" />
				</svg>
				Open
			</button>
			<button type="button" @click="res.saveAs"
				class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 ">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd" />
				</svg>
				Download
			</button>
		</div>

		<div class="inline-flex rounded-md shadow-sm" role="group">
			<button type="button" @click="onSave"
				class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
				</svg>
				Update Local File
			</button>
		</div>
	</div>


	<div v-if="res.file.value">
		Content
		<textarea v-if="typeof content === 'string'" v-model="content" w-full />
		<span v-else>{{ content }}</span>
	</div>


</template>
<style lang="scss">
</style>