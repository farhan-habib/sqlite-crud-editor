<script setup>
//https://vuejsexamples.com/a-easy-to-use-data-table-component-made-with-vue-js-3-x
const headers = [
	{ text: "Name", value: "name" },
	{ text: "Height (cm)", value: "height", sortable: true },
	{ text: "Weight (kg)", value: "weight", sortable: true },
	{ text: "Age", value: "age", sortable: true }
];

const items = [
	{ "name": "Curry", "height": 178, "weight": 77, "age": 20 },
	{ "name": "James", "height": 180, "weight": 75, "age": 21 },
	{ "name": "Jordan", "height": 181, "weight": 73, "age": 22 }
];
</script>

<template>
	<EasyDataTable :headers="headers" :items="items" />
	<!-- <splitpanes class="default-theme" horizontal style="width:100%; height:20em">
		<pane size="65">
			<span>1</span>
		</pane>
		<pane size="10">
			<span>2</span>
		</pane>
		<pane size="25">
			<span>3</span>
		</pane>
	</splitpanes> -->
</template>

<style lang="scss">
</style>
