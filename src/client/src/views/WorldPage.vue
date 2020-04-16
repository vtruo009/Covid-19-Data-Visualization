<template>
	<div class="WorldPge">
		<b-overlay v-bind:show="show" rounded="sm">
			<InputForm
				firstInputName="State"
				secondInputName="Country"
				apiEndPoint="/WorldData"
			/>
			<Table v-bind:data="tableData" />
		</b-overlay>
	</div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form';
import Table from '../components/GlobalTable';

export default {
	name: 'WorldPage',
	data() {
		return {
			tableData: null,
			show: false,
		};
	},
	methods: {},
	components: {
		InputForm,
		Table,
	},
};
</script>

<style></style>
