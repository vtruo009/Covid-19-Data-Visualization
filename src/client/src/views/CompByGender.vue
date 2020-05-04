<template>
	<div class="mt-5">
		<!-- By default the first search looka for confirmed cases -->
		<b-form inline @submit="initialFormSubmission">
			<b-input v-model="Country" required placeholder="Country"></b-input>
			<b-button type="submit" variant="primary" class="ml-3">Search</b-button>
		</b-form>

		<div v-if="showChart" class="mt-5">
			<b-row>
				<b-col>
					<DonutChart v-bind:data="chartData" />
				</b-col>
				<b-col>
					<b-form-select
						@change="requestFromSelect"
						v-model="TypeOfData"
						aria-required
						:options="TypeOfDataOptions"
					></b-form-select>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import Services from '../Services/Services';
import DonutChart from '../components/DonutChart';
export default {
	name: 'CompByGender',
	data() {
		return {
			//Changes according to the input field
			Country: null,
			// Saves country that usser searches for subsequent requests to the server
			CachedCountry: null,
			TypeOfData: null,
			TypeOfDataOptions: [
				{ value: null, text: 'Type of data', disabled: true },
				{ value: '1', text: 'Confirmed' },
				{ value: '2', text: 'Dead' },
				{ value: '3', text: 'Recovered' },
			],
			chartData: null,
			showChart: false,
		};
	},
	methods: {
		// 1-> confirmed, 2-> dead, 3->recovered
		async initialFormSubmission(e) {
			// If chart is not shown, then show it
			//Prevents the page to reload
			e.preventDefault();
			// When an the form is submitted at the beginning, the type of data value is cleaned
			this.TypeOfData = null;
			// Save the country in CachedCountry for future requests
			this.CachedCountry = this.Country;
			// Call helper function that makes request to backend. Note: For the first search we get confirmed cases
			await this.GetData('1');
			console.log('Form submitted');
		},
		async requestFromSelect() {
			await this.GetData(this.TypeOfData);
			console.log('Request from select');
		},
		async GetData(TypeOfData) {
			console.log('Getting data...');
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/compareGender',
					params: {
						Country: this.CachedCountry,
						TypeOfData: TypeOfData,
					},
				});
				console.log(response);
				console.log(response.data);
				if (response.data.CountryExists) {
					if (
						response.data.MaleNumberOfCases == 0 &&
						response.data.FemaleNumberOfCases == 0
					) {
						this.showChart = false;
						this.erroHandler(
							`No ${this.TypeOfDataOptions[this.TypeOfData].text} Cases for ${
								this.Country
							}`
						);
					} else {
						this.showChart = true;
						// Set up chartData object to visualize the donut chart
						this.chartData = [
							['Gender', 'Number of Cases'],
							['Male', response.data.MaleNumberOfCases],
							['Female', response.data.FemaleNumberOfCases],
						];
					}
				} else {
					this.erroHandler(
						this.Country + ' does not exist. Please try a different country'
					);
				}
			} catch (error) {
				// TO DO: SHOW ERROR: "Some error occurred. Please try again"
				this.erroHandler('Some error occurred. Please try again later');
				console.log(error);
			}
		},
		erroHandler(message) {
			// Shows error
			this.$toast.error(message, {
				position: 'bottom-right',
				timeout: 4500,
			});
		},
	},
	components: {
		DonutChart,
	},
};
</script>

<style></style>
