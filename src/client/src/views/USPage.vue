<template>
	<div class="USPage">
		<b-overlay v-bind:show="show" rounded="sm">
			<InputForm
				firstInputName="County"
				secondInputName="State"
				apiEndPoint="/USData"
			/>
			<Table v-bind:data="tableData" />
		</b-overlay>
	</div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form';
import Table from '../components/GlobalTable';

export default {
	name: 'USPage',
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
