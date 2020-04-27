<template>
	<div id="Body">
		<div class="m-5 text-center">
			<!-- User input form -->
			<b-form @submit="displayData" inline>
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
						<b-button variant="primary" type="submit">
							<font-awesome-icon :icon="['fas', 'search']" />
						</b-button>
					</b-col>
					<b-col>
						<button
							type="button"
							class="btn btn-primary"
							@click="showInsertModal()"
						>
							Insert
						</button>
					</b-col>
				</b-row>
			</b-form>
		</div>
		<!-- TABLE DATA-->
		<Table v-show="table.isVisible" :data="table.data" :isBusy="table.Busy" />
		<!-- Errors to display -->
		<Error v-if="error" v-bind:errorMessage="errorMessage" />
		<Success v-if="success" v-bind:successMessage="successMessage" />

		<!-- Implement Insert Modal -->
		<b-modal ref="insert-modal" hide-footer hide-title>
			<b-overlay :show="formIsBusy" rounded="sm">
				<b-form @submit="sendInsertRequest">
					<h3 class="mb-4">Please Enter the Information Below</h3>
					<b-col>
						<b-form-group :label="firstInputName">
							<b-form-input v-model="insertData.FirstInput" required>
							</b-form-input>
						</b-form-group>
						<b-form-group :label="secondInputName">
							<b-form-input v-model="insertData.SecondInput" required>
							</b-form-input>
						</b-form-group>
						<b-form-group label="Date">
							<b-form-datepicker
								required
								:min="minDate"
								:max="maxDate"
								v-model="insertData.Date"
								:date-format-options="{
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
								}"
							>
							</b-form-datepicker>
						</b-form-group>
						<b-form-group label="Number of Cases">
							<b-input v-model="insertData.Number" type="number" required>
							</b-input>
						</b-form-group>
						<b-form-group label="Option">
							<b-form-select
								v-model="insertData.TypeOfData"
								:options="TypeOfDataoptions"
								required
							>
							</b-form-select>
						</b-form-group>
					</b-col>
					<hr />
					<b-button
						variant="secondary"
						class="float-right"
						:disabled="formIsBusy"
						@click="hideInsertModal"
						>Cancel
					</b-button>
					<b-button
						:disabled="formIsBusy"
						type="submit"
						variant="primary"
						class="float-right mr-3"
					>
						Submit
					</b-button>
				</b-form>
			</b-overlay>
		</b-modal>
	</div>
</template>

<script>
import Services from '../../Services/Services';
import Helpers from '../../Services/Helpers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';
import Error from '../Error';
import Success from '../Success';

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
			formIsBusy: null,
			// Min and maxx date for the forms
			maxDate: new Date(), // today
			minDate: new Date('01/20/2020'),

			// Input values for searching
			firstInput: null,
			secondInput: null,
			TypeOfDataSelected: null,

			// Insert US/World data
			insertData: {
				FirstInput: null,
				SecondInput: null,
				Number: null,
				Date: null,
				TypeOfData: null,
			},
			// Select options
			TypeOfDataoptions: [
				{ value: null, text: 'Please select an option', disabled: true },
				{ value: '1', text: 'Confirmed cases per day' },
				{ value: '2', text: 'Deaths per day' },
				{ value: '3', text: 'Recovered cases per day' },
			],

			// Data to used to populate table
			table: {
				Data: null,
				Busy: false,
				isVisible: false,
			},

			// Booleans used to display errors if any
			error: false,
			errorMessage: null,

			// Data to display success
			success: false,
			successMessage: null,

			// cached inputted values for updating/deleting
			cacheFirstInput: null,
			cacheSecondInput: null,
			cacheTypeOfData: null,
			cacheTypeOFDataString: null,
		};
	},
	methods: {
		async displayData(e) {
			e.preventDefault();
			this.showTable();
			// Hide Messages
			this.setErrorOff();
			this.setSuccessOff();

			// Send search request to backend
			this.toggleTableBusy();
			try {
				const response = await Services.searchData({
					apiEndPoint: this.apiEndPoint,
					params: {
						[this.firstInputName]: this.firstInput,
						[this.secondInputName]: this.secondInput,
						TypeOfData: this.TypeOfDataSelected,
					},
				});
				console.log(response);
				if (response.data.data == undefined) {
					this.errorHandler(
						`No data available for ${this.firstInput}, ${this.secondInput}.`
					);
				} else {
					this.setTableData(response.data.data);
				}
				// Save data for future requests
				this.cacheInputtedData();
			} catch (error) {
				this.errorHandler('Some error occurred. Please try again');
				console.log(error);
			}
			//  Sets loading spinner off
			this.toggleTableBusy();
		},

		async sendInsertRequest(e) {
			e.preventDefault();
			// Hide Messages
			this.setErrorOff();
			this.setSuccessOff();
			this.toggleFormBussy();
			// Send search request to backend
			try {
				const response = await Services.insertData({
					apiEndPoint: this.apiEndPoint,
					body: {
						[this.firstInputName]: this.insertData.FirstInput,
						[this.secondInputName]: this.insertData.SecondInput,
						Number: this.insertData.Number,
						Date: Helpers.convertDateFromClient(this.insertData.Date),
						TypeOfData: this.insertData.TypeOfData,
					},
				});
				console.log(response);
				if (response.data.success == true) {
					console.log('Success');
					this.successHandler('Data successfully saved');
				} else {
					this.errorHandler(response.data.message);
				}
				// Save data for future requests
			} catch (error) {
				this.errorHandler('Some error occurred. Please try again');
				console.log(error);
			}
			//  Hider insert modal
			this.hideInsertModal();
			this.toggleFormBussy();
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
		successHandler(successMessage) {
			this.setSuccessOn();
			this.successMessage = successMessage;
			// clear the data
			this.setTableData(null);
			// If there are errors then hide table
			this.hideTable();
		},
		setTableData(data) {
			this.table.data = data;
		},
		setErrorOff() {
			this.error = false;
		},
		setErrorOn() {
			this.error = true;
		},
		setSuccessOff() {
			this.success = false;
		},
		setSuccessOn() {
			this.success = true;
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
			this.table.Busy = !this.table.Busy;
		},

		showTable() {
			this.table.isVisible = true;
		},

		hideTable() {
			this.table.isVisible = false;
		},
		showInsertModal() {
			this.$refs['insert-modal'].show();
		},
		hideInsertModal() {
			this.$refs['insert-modal'].hide();
			this.clearInserDataFields();
		},
		toggleFormBussy() {
			this.formIsBusy = !this.formIsBusy;
		},
		clearInserDataFields() {
			this.insertData.FirstInput = null;
			this.insertData.SecondInput = null;
			this.insertData.Number = null;
			this.insertData.Date = null;
			this.insertData.TypeOfData = null;
		},
	},
	components: { Table, Error, Success },
};
</script>

<style></style>
