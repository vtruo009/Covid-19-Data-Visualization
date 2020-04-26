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
									v-model="caseInformation.ReportingDate"
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
			<b-form @submit="deleteCase">
				<!-- Access cached data from the body parent component -->
				<div class="mb-4">
					<h3 class="text-danger text-center">WARNING</h3>
					<h4 class="mt-4">Are you sure you want to delete this case?</h4>
				</div>
				<div class="mt-5">
					<b-button type="submit" variant="danger" class="float-right"
						>Yes</b-button
					>
					<b-button
						variant="secondary"
						class="float-right mr-3"
						@click="hideDeleteModal"
						>No</b-button
					>
				</div>
			</b-form>
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
				ReportingDate: null,
				State: null,
				Country: null,
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
				// 			this.caseInformation.ReportingDate
				// 		),
				// 		State: this.caseInformation.State,
				// 		Country: this.caseInformation.Country,
				// 		Age: this.caseInformation.Age,
				// 		Gender: this.caseInformation.Gender,
				// 		TypeOfCase: this.caseInformation.TypeOfCase,
				// 	},
				// });

				const response = {
					success: true,
				};
				if (response.success) {
					// Display update was successful
				} else {
					// Display error message
					this.handleError('Case could not be updated. Please try again');
				}
				this.caseFound = false;
			} catch (error) {
				console.log(error);
				// Display error occurred
				this.handleError('Some error occurred. Please try again');
			}

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
					success: true,
					ReportingDate: '01/20/2020',
					Country: 'Peru',
					State: 'Lima',
					Age: 10,
					Gender: 1,
					TypeOfCase: 1,
				};
				if (response.success) {
					// Decompose response object
					this.caseInformation = {
						// Convert date so that is properly formated
						ReportingDate: Helpers.convertDateFromServer(
							response.ReportingDate
						),
						State: response.State,
						Country: response.Country,
						Age: response.Age,
						Gender: response.Gender,
						TypeOfCase: response.TypeOfCase,
					};
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
			this.toggleWaitingForResponse();
		},

		async deleteCase(e) {
			e.preventDefault();
			// Turn off errors if any
			this.setErrorOff();
			// show loading bar in modal
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

					// Hide case from screen
					this.caseFound = false;
				} else {
					// Display error message
					this.handleError('Case could not be deleted. Please try again');
				}
			} catch (error) {
				console.log(error);
				this.handleError('Some error occurred. Please try again');
			}
			// Hides delete modal
			this.hideDeleteModal();
			// stop loading bar in modal
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
