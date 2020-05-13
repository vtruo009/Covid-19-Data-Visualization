<template>
	<div id="Table">
		<b-pagination
			v-model="currentPage"
			:total-rows="dataLength"
			:per-page="perPage"
			align="fill"
			pills
			class="m-3"
		></b-pagination>
		<b-table
			:current-page="currentPage"
			:per-page="perPage"
			dark
			striped
			hover
			:items="this.data"
		></b-table>
	</div>
</template>

<script>
export default {
	name: 'Table',
	props: {
		data: Array,
	},
	computed: {
		dataLength() {
			return this.data ? this.data.length : 0;
		},
	},
	data() {
		return {
			currentPage: 1,
			perPage: 10,
		};
	},
};
</script>

<style></style>
