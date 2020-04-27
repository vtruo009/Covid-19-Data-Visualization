<template>
	<div class="mt-5">
		<b-form inline @submit="searchCase">
			<b-input
				type="number"
				placeholder="Case Id"
				v-model="caseId"
				:disabled="waitingForResponse"
			></b-input>
			<b-button
				class="ml-3"
				type="submit"
				variant="primary"
				:disabled="waitingForResponse"
				>Search</b-button
			>
			<b-button
				class="ml-3"
				variant="primary"
				@click="showInsertModal"
				:disabled="waitingForResponse"
				>Insert Case</b-button
			>
			<b-spinner class="ml-4" v-if="waitingForResponse"></b-spinner>
		</b-form>

		<Error class="mt-4" v-show="error" v-bind:errorMessage="errorMessage" />

		<div v-show="caseFound" class="blackBackground p-5 mt-5">
			<b-row>
				<h1>Case ID: {{ caseId }}</h1>
			</b-row>
			<b-row>
				<b-form @submit="updateCase">
					<b-row>
						<b-col>
							<b-form-group
								:disabled="waitingForResponse"
								label="Reporting Date"
							>
								<b-form-datepicker
									required
									:min="minDate"
									:max="maxDate"
									v-model="caseInformation.Date"
									:date-format-options="{
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
									}"
								>
								</b-form-datepicker>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Country">
								<b-input
									:disabled="waitingForResponse"
									type="text"
									v-model="caseInformation.Country"
								>
								</b-input> </b-form-group
						></b-col>
						<b-col>
							<b-form-group label="State">
								<b-input
									:disabled="waitingForResponse"
									type="text"
									v-model="caseInformation.State"
								>
								</b-input> </b-form-group
						></b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group label="Age">
								<b-input
									:disabled="waitingForResponse"
									type="number"
									v-model="caseInformation.Age"
								>
								</b-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Gender">
								<b-form-select
									:disabled="waitingForResponse"
									v-model="caseInformation.Gender"
									aria-required=""
								>
									<b-form-select-option value="1">Male</b-form-select-option>
									<b-form-select-option value="2">Female</b-form-select-option>
								</b-form-select>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Type of Case">
								<b-form-select
									:disabled="waitingForResponse"
									v-model="caseInformation.TypeOfCase"
								>
									<b-form-select-option value="1">Dead</b-form-select-option>
									<b-form-select-option value="2"
										>Recovered</b-form-select-option
									>
								</b-form-select>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row class="mt-3">
						<b-button
							class="ml-3"
							type="submit"
							variant="primary"
							:disabled="waitingForResponse"
						>
							Submit Update
						</b-button>
						<b-button
							class="ml-4"
							variant="danger"
							:disabled="waitingForResponse"
							@click="showDeleteModal"
						>
							Delete Case
						</b-button>
						<b-spinner class="ml-4" v-if="waitingForResponse"></b-spinner>
					</b-row>
				</b-form>
			</b-row>
		</div>

		<!-- Delete Modal -->
		<b-modal ref="delete-modal" hide-footer hide-title>
			<b-overlay :show="formIsBusy" rounded="sm">
				<b-form @submit="deleteCase">
					<!-- Access cached data from the body parent component -->
					<div class="mb-4">
						<h3 class="text-danger text-center">WARNING</h3>
						<h4 class="mt-4">Are you sure you want to delete this case?</h4>
					</div>
					<div class="mt-5">
						<b-button
							:disabled="formIsBusy"
							type="submit"
							variant="danger"
							class="float-right"
							>Yes</b-button
						>
						<b-button
							:disabled="formIsBusy"
							variant="secondary"
							class="float-right mr-3"
							@click="hideDeleteModal"
							>No</b-button
						>
					</div>
				</b-form>
			</b-overlay>
		</b-modal>

		<!-- Insert Modal -->
		<b-modal ref="insert-modal" hide-footer hide-title>
			<b-overlay :show="formIsBusy" rounded="sm">
				<b-form @submit="sendInsertRequest">
					<h3 class="mb-4">Please Enter the Information Below</h3>
					<b-row>
						<b-col>
							<b-form-group label="Case ID">
								<b-form-input type="number" v-model="insertCase.ID" required>
								</b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Reporting Date">
								<b-form-datepicker
									required
									:min="minDate"
									:max="maxDate"
									v-model="insertCase.Date"
									:date-format-options="{
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
									}"
								>
								</b-form-datepicker>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col
							><b-form-group label="Country">
								<b-form-input v-model="insertCase.Country" required>
								</b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="State">
								<b-form-input v-model="insertCase.State" required>
								</b-form-input>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group label="Age">
								<b-form-input type="number" v-model="insertCase.Age" required>
								</b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Gender">
								<b-form-select v-model="insertCase.Gender" required>
									<b-form-select-option value="1">Male</b-form-select-option>
									<b-form-select-option value="2">Female</b-form-select-option>
								</b-form-select>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group label="Type of Case">
								<b-form-select v-model="insertCase.TypeOfCase" required>
									<b-form-select-option value="1"
										>Confirmed</b-form-select-option
									>
									<b-form-select-option value="2">Dead</b-form-select-option>
									<b-form-select-option value="3"
										>Recovered</b-form-select-option
									>
								</b-form-select>
							</b-form-group>
						</b-col>
					</b-row>
					<hr />
					<b-button
						variant="secondary"
						:disabled="formIsBusy"
						class="float-right"
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
import Services from '../Services/Services';
import Helpers from '../Services/Helpers';
import Error from '../components/Error';
import { faServer } from '@fortawesome/free-solid-svg-icons';
export default {
	name: 'CasesPage',
	data() {
		return {
			formIsBusy: false,
			// Min and maxx date for the forms
			maxDate: new Date(), // today
			minDate: new Date('01/20/2020'),

			// Error ingformation:
			error: false,
			errorMessage: null,

			caseFound: false,
			caseLoading: false,
			waitingForResponse: false,

			// Used to send  update/delete requests
			cacheCaseId: null,

			// Used to store user inputted IDs
			caseId: 1,

			// Used to store changes by the user
			caseInformation: {
				Date: null,
				State: null,
				Country: null,
				Age: null,
				Gender: null,
				TypeOfCase: null,
			},

			insertCase: {
				ID: null,
				Country: null,
				State: null,
				Date: null,
				Age: null,
				Gender: null,
				TypeOfCase: null,
			},
		};
	},
	methods: {
		async updateCase(e) {
			e.preventDefault();
			// Turn off errors if any
			this.setErrorOff();
			// Start loading spinner
			this.toggleWaitingForResponse();

			try {
				// const response = await Services.insertData({
				// 	apiEndPoint: '/CaseData',
				// 	params: {
				// 		ReportingDate: Helpers.convertDateFromClient(
				// 			this.caseInformation.Date
				// 		),
				// 		State: this.caseInformation.State,
				// 		Country: this.caseInformation.Country,
				// 		Age: this.caseInformation.Age,
				// 		Gender: this.caseInformation.Gender,
				// 		TypeOfCase: this.caseInformation.TypeOfCase,
				//      CaseId:
				// 	},
				// });

				const response = {
					success: true,
				};
				if (response.success) {
					// TO DO: Display update was successful
				} else {
					// Display error message
					this.handleError('Case could not be updated. Please try again');
				}
			} catch (error) {
				console.log(error);
				// Display error occurred
				this.handleError('Some error occurred. Please try again');
			}

			this.caseFound = false;
			this.clearCaseInformation();
			// Stop loading spinner
			this.toggleWaitingForResponse();
		},
		async searchCase(e) {
			e.preventDefault();
			// Turn off errors if any
			this.setErrorOff();
			// Show loading spinner
			this.toggleWaitingForResponse();
			try {
				// const response = await Services.searchData({
				// 	apiEndPoint: '/CaseData',
				// 	params: {
				// 		caseId: this.caseId,
				// 	},
				// });

				const response = {
					data: {
						success: true,
						case: {
							CaseId: 1,
							ReportingDate: '01/20/2020',
							Country: 'wevvwe',
							State: 'Lima',
							Age: 10,
							Gender: 1,
							TypeOfCase: 1,
						},
					},
				};
				if (response.data.success) {
					console.log(response);
					// Decompose response object
					console.log(response.data.case);
					this.caseInformation = {
						// Convert date so that is properly formated
						Date: Helpers.convertDateFromServer(
							response.data.case.ReportingDate
						),
						State: response.data.case.State,
						Country: response.data.case.Country,
						Age: response.data.case.Age,
						Gender: response.data.case.Gender,
						TypeOfCase: response.data.case.TypeOfCase,
					};
					console.log(response);
					this.cacheCaseId = response.data.case.CaseId;
					// Show Case information
					this.caseFound = true;
				} else {
					// Display error message
					this.handleError('Case does not exist. Please enter a valid ID');
				}
			} catch (error) {
				console.log(error);
				this.handleError('Some error occurred. Please try again');
			}

			this.clearCaseInformation();
			this.toggleWaitingForResponse();
		},

		async deleteCase(e) {
			e.preventDefault();
			// Turn off errors if any
			this.setErrorOff();
			// show loading  spinner in modal
			this.toggleFormBussy();
			try {
				// const response = await Services.deleteData({
				// 	apiEndPoint: '/CaseData',
				// 	params: {
				// 		caseId: this.cacheCaseId,
				// 	},
				// });
				const response = {
					success: true,
				};
				if (response.success) {
					// TO DO: Display delete was successful
				} else {
					// Display error message
					this.handleError('Case could not be deleted. Please try again');
				}
			} catch (error) {
				console.log(error);
				this.handleError('Some error occurred. Please try again');
			}

			// stop loading spinner in modal
			this.toggleFormBussy();
			// Hide case from screen
			this.caseFound = false;
			this.clearCaseInformation();
			// Hides delete modal
			this.hideDeleteModal();
		},

		async sendInsertRequest(e) {
			e.preventDefault();
			console.log('HI');
			// To do: Show Laoading
			this.toggleFormBussy();
			try {
				// const response = await Services.insertData({
				// 	apiEndpoint: '/CaseData',
				// 	body: {
				// 		ID: this.insertCase.ID,
				// 		Country: this.insertCase.Country,
				// 		State: this.insertCase.State,
				// 		Date: Helpers.convertDateFromClient(this.insertCase.Date),
				// 		Age: this.insertCase.Age,
				// 		Gender: this.insertCase.Gender,
				// 		TypeOfCase: this.insertCase.TypeOfCase,
				// 	},
				// });

				const response = {
					data: {
						success: true,
					},
				};
				if (response.data.success == true) {
					console.log('Success');
					// TO DO: Display success message
				} else {
					console.log('Error: Case alredy exists OR Location is not valid');
					// TO DO: DIsplay error message
				}
			} catch (error) {
				console.log(error);
				// TO DO: DIsplay error message
			}
			this.toggleFormBussy();
			this.hideInsertModal();
		},
		toggleWaitingForResponse() {
			this.waitingForResponse = !this.waitingForResponse;
		},

		showDeleteModal() {
			this.$refs['delete-modal'].show();
		},

		hideDeleteModal() {
			this.$refs['delete-modal'].hide();
		},
		setErrorOff() {
			this.error = false;
		},
		handleError(errorMessage) {
			// Hide case found
			this.caseFound = false;
			// Show error component
			this.error = true;
			// Set error message
			this.errorMessage = errorMessage;
		},
		showInsertModal() {
			this.$refs['insert-modal'].show();
		},
		hideInsertModal() {
			this.$refs['insert-modal'].hide();
			this.clearInsertData();
		},
		clearInsertData() {
			this.insertCase.Country = null;
			this.insertCase.State = null;
			this.insertCase.Date = null;
			this.insertCase.Age = null;
			this.insertCase.Gender = null;
			this.insertCase.TypeOfCase = null;
			this.insertCase.ID = null;
		},
		clearCaseInformation() {
			this.caseInformation.Country = null;
			this.caseInformation.State = null;
			this.caseInformation.Date = null;
			this.caseInformation.Age = null;
			this.caseInformation.Gender = null;
			this.caseInformation.TypeOfCase = null;
		},
		toggleFormBussy() {
			this.formIsBusy = !this.formIsBusy;
		},
	},
	components: {
		Error,
	},
};
</script>

<style>
.blackBackground {
	background: #343a40;
	align-items: center;
	border-radius: 20px;
	color: white;
}
</style>
