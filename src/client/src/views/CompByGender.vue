<template>
	<div class="mt-5">
		<!-- By default the first search looka for confirmed cases -->
		<b-form inline @submit="initialFormSubmission">
			<b-input v-model="Country" required placeholder="Country"></b-input>
			<b-button type="submit" variant="primary" class="ml-3"> Search </b-button>
		</b-form>

		<div class="mt-5">
			<DonutChart v-bind:data="chartData" />
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
			Country: null,
			chartData: null
		};
	},
	methods: {
		// 1-> confirmed, 2-> dead, 3->recovered
		async initialFormSubmission(e){
			e.preventDefault();
			// For the first search we get confirmed cases
			await this.GetData('1');
			console.log("Form submitted");
		},
		async GetData(TypeOfData) {
			console.log("Getting data...");
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/compareGender',
					params: {
						Country: this.Country,
						TypeOfData: TypeOfData,
					},
				});
				console.log(response);
				console.log(response.data);
				if (response.data.CountryExists) {
					// Set up chartData object to visualize the donut chart
					this.chartData = [
						['Gender', 'Number of Cases'],
						['Male', response.data.MaleNumberOfCases],
						['Female', response.data.FemaleNumberOfCases],
					];
				} else {
					// TO DO: SHOW ERROR: "Country does not exist"
					console.log(this.Country + "does not exist. Please try a different country");
				}
			} catch (error) {
				// TO DO: SHOW ERROR: "Some error occurred. Please try again"
				console.log(error);
			}
		},
	},
	components: {
		DonutChart,
	},
};
</script>

<style></style>
