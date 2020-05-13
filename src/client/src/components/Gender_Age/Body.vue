<template>
	<div id="Body">
		<!-- Input form -->
		<div class="m-5 d-flex justify-content-center">
			<b-form @submit="displayData">
				<b-row>
					<b-col lg="3" class="m-2">
						<b-form-select
							v-model="dynamicOptionSelected"
							:options="dynamicOptions"
							required
						></b-form-select>
					</b-col>
					<b-col lg="5" class="m-2">
						<b-form-select
							v-model="TypeOfDataSelected"
							:options="TypeOfDataoptions"
							required
						></b-form-select>
					</b-col>
					<b-col lg="3" class="m-2">
						<b-button block variant="primary" type="submit">
							<font-awesome-icon :icon="['fas', 'search']" />
						</b-button>
					</b-col>
				</b-row>
			</b-form>
		</div>
		<!-- TABLE DATA-->
		<Table v-show="isDataReady" v-bind:data="tableData"></Table>
	</div>
</template>

<script>
import Services from '../../Services/Services';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';
library.add(faSearch);

export default {
	name: 'Body',
	props: {
		InputName: String,
		dynamicOptions: Array,
		apiEndPoint: String,
	},
	data() {
		return {
			isDataReady: false,
			// Selected by user
			dynamicOptionSelected: null,
			TypeOfDataSelected: null,

			// Options for select
			TypeOfDataoptions: [
				{ value: null, text: 'Please select an option', disabled: true },
				{
					value: '1',
					text: 'Number of confirmed, deaths, and recovered for each country',
				},
				{ value: '2', text: 'Number of cases per day' },
			],
			// Data to used to populate table
			tableData: null,
		};
	},
	methods: {
		displayData(e) {
			// Send search request to backend
			e.preventDefault();
			Services.searchData({
				apiEndPoint: this.apiEndPoint,
				params: {
					[this.InputName]: this.dynamicOptionSelected,
					TypeOfData: this.TypeOfDataSelected,
				},
			})
				.then((response) => {
					console.log(response);
					if (response.status == 200) {
						// Populates tabledata in grandparent component
						this.setTableData(response.data.data);
						this.isDataReady = true;
					} else {
						this.errorHandler();
					}
				})
				.catch((error) => {
					this.errorHandler();
					console.log(error);
				});
		},
		errorHandler() {
			// Display no data
			this.$toast.error('Some error occurred. Please try again later', {
				position: 'bottom-right',
				timeout: 2268,
			});
			this.setTableData(null);
		},
		setTableData(data) {
			this.tableData = data;
		},
	},
	components: { Table },
};
</script>

<style></style>
