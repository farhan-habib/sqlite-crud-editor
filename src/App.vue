<script setup></script>

<template>
	<div style="margin: 10%; border: 5px solid #1c6ea4">
		<Suspense>
			<router-view />
		</Suspense>
	</div>
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>
