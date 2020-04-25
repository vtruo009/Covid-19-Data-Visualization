<template>
	<div id="Body">
		<div class="m-5 text-center">
			<!-- User input form -->
			<b-form @submit="displayData">
				<b-row>
					<b-col>
						<b-input
							v-model="firstInput"
							v-bind:placeholder="this.firstInputName"
							required
						></b-input>
					</b-col>
					<b-col>
						<b-input
							v-model="secondInput"
							v-bind:placeholder="this.secondInputName"
							required
						></b-input>
					</b-col>
					<b-col>
						<b-form-select
							v-model="TypeOfDataSelected"
							:options="TypeOfDataoptions"
							required
						></b-form-select>
					</b-col>
					<b-col>
						<button type="button" class="btn btn-primary" @click="showModal()">
							Insert
						</button>
					</b-col>
					<b-col>
						<b-button variant="primary" type="submit">
							<font-awesome-icon :icon="['fas', 'search']" />
						</b-button>
					</b-col>
				</b-row>
			</b-form>
		</div>
		<!-- TABLE DATA-->
		<Table v-bind:data="tableData" />
		<!-- Errors to display -->
		<Error v-if="error" v-bind:errorMessage="errorMessage" />

		<!-- Implement Insert Modal -->
		<b-modal ref="insert-modal" hide-footer hide-title>
			<h1>hello</h1>
		</b-modal>
	</div>
</template>

<script>
import Services from '../../Services/Services';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';
import Error from '../Error';

library.add(faSearch);

export default {
	name: 'Body',
	props: {
		firstInputName: String,
		secondInputName: String,
		apiEndPoint: String,
	},
	data() {
		return {
			isTableVisible: false,
			// Input values for searching
			firstInput: null,
			secondInput: null,
			TypeOfDataSelected: null,

			// Select options
			TypeOfDataoptions: [
				{ value: null, text: 'Please select an option', disabled: true },
				{ value: '1', text: 'Confirmed cases per day' },
				{ value: '2', text: 'Deaths per day' },
				{ value: '3', text: 'Recovered cases per day' },
			],

			// Data to used to populate table
			tableData: null,
			tableBusy: false,

			// Booleans used to display errors if any
			error: false,
			errorMessage: null,

			// cached inputted values for updating/deleting
			cacheFirstInput: null,
			cacheSecondInput: null,
			cacheTypeOfData: null,
			cacheTypeOFDataString: null,
		};
	},
	methods: {
		displayData(e) {
			e.preventDefault();
			this.showTable();
			// Hide errors
			this.setErrorOff();
			// Send search request to backend
			this.toggleTableBusy();
			Services.searchData({
				apiEndPoint: this.apiEndPoint,
				params: {
					[this.firstInputName]: this.firstInput,
					[this.secondInputName]: this.secondInput,
					TypeOfData: this.TypeOfDataSelected,
				},
			})
				.then((response) => {
					if (response.data.data == undefined) {
						this.errorHandler(
							`No data available for ${this.firstInput}, ${this.secondInput}.`
						);
					} else {
						this.setTableData(response.data.data);
					}
					this.cacheInputtedData();
					this.toggleTableBusy();
				})
				.catch((error) => {
					this.errorHandler('Some error occurred. Please try again');
					console.log(error);
					this.toggleTableBusy();
				});
		},

		// Helper methods
		errorHandler(errorMessage) {
			this.setErrorOn();
			this.errorMessage = errorMessage;
			// clear the data
			this.setTableData(null);
			// If there are errors then hide table
			this.hideTable();
		},
		setTableData(data) {
			this.tableData = data;
		},
		setErrorOff() {
			this.error = false;
		},
		setErrorOn() {
			this.error = true;
		},

		cacheInputtedData() {
			this.cacheFirstInput = this.firstInput;
			this.cacheSecondInput = this.secondInput;
			this.cacheTypeOfData = this.TypeOfDataSelected;
			// Get the string version of the type of data selected
			switch (this.cacheTypeOfData) {
				case '1':
					this.cacheTypeOFDataString = 'Confirmed';
					break;
				case '2':
					this.cacheTypeOFDataString = 'Deaths';
					break;
				case '3':
					this.cacheTypeOFDataString = 'Recovered';
					break;
				default:
					this.cacheTypeOFDataString = '';
					break;
			}
		},

		// Toggle the state of the table
		toggleTableBusy() {
			this.tableBusy = !this.tableBusy;
		},

		showTable() {
			this.isTableVisible = true;
		},

		hideTable() {
			this.isTableVisible = false;
		},
		showModal() {
			this.$refs['insert-modal'].show();
		},
	},
	components: { Table, Error },
};
</script>

<style></style>
