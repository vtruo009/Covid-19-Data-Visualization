<template>
	<div class="mt-5 fadeIn">
		<!-- By default the first search looka for confirmed cases -->
		<b-form @submit="initialFormSubmission">
			<b-row class="d-flex justify-content-center">
				<b-col lg="4" sm="8">
					<b-input
						v-model="Country"
						required
						placeholder="Country"
						class="m-2"
					></b-input>
				</b-col>
				<b-col lg="4" sm="4">
					<b-button block type="submit" variant="primary" class="m-2"
						>Search</b-button
					>
				</b-col>
			</b-row>
		</b-form>

		<div
			v-if="showChart"
			style="margin-top:90px"
			class="d-flex justify-content-center"
		>
			<b-row>
				<b-col>
					<DonutChart :chart-data="chartData" />
				</b-col>
				<div></div>
				<b-col class="m-5">
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
import Services from '../../Services/Services';
import DonutChart from '../../components/DonutChart';
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
			// When an the form is submitted at the beginning, the type of data value is set to confirmed
			this.TypeOfData = 1;
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
						this.erroHandler(
							`No ${this.TypeOfDataOptions[this.TypeOfData].text} Cases for ${
								this.Country
							}`
						);
					} else {
						this.showChart = true;
						// Set up chartData object to visualize the donut chart
						this.chartData = {
							labels: ['Male', 'Female'],
							datasets: [
								{
									label: 'Male vs Female Cases',
									data: [
										response.data.MaleNumberOfCases,
										response.data.FemaleNumberOfCases,
									],
									backgroundColor: [
										'rgba(214, 48, 49, 1)',
										'rgba(9, 132, 227, 1)',
									],
								},
							],
						};
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
