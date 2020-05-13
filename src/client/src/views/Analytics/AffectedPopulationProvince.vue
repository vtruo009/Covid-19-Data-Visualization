<template>
	<div class="mt-5 fadeIn">
		<b-form @submit="FormSubmission">
			<b-row class="d-flex justify-content-center">
				<b-col lg="3" sm="8">
					<b-input
						v-model="Province"
						class="m-2"
						required
						placeholder="Province"
					></b-input>
				</b-col>
				<b-col lg="3" sm="8">
					<b-input
						class="m-2"
						v-model="Country"
						required
						placeholder="Country"
					></b-input>
				</b-col>
				<b-col lg="3" sm="8">
					<b-button block class="m-2" type="submit" variant="primary"
						>Search</b-button
					>
				</b-col>
			</b-row>
		</b-form>

		<div v-if="showChart" class="mt-5">
			<b-row class="d-flex justify-content-center">
				<b-col>
					<DonutChart :chart-data="chartData" />
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import Services from '../../Services/Services';
import DonutChart from '../../components/DonutChart';

export default {
	name: 'AffectedPopulationProvince',
	data() {
		return {
			Country: null,
			Province: null,
			chartData: null,
			showChart: false,
		};
	},
	methods: {
		async FormSubmission(e) {
			e.preventDefault();
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/comparePercentageWorld',
					params: {
						Country: this.Country,
						Province: this.Province,
					},
				});
				if (response.data.ProvinceExists) {
					this.showChart = true;
					this.chartData = {
						labels: ['Confirmed', 'Death', 'Recovered'],
						datasets: [
							{
								label: 'Number of Cases',
								data: [
									response.data.NumOfConfirmed,
									response.data.NumOfDeath,
									response.data.NumOfRecovered,
								],
								backgroundColor: [
									'rgba(214, 48, 49, 1)',
									'rgba(9, 132, 227, 1)',
									'rgba(0, 184, 148, 1)',
								],
							},
						],
					};
				} else {
					this.erroHandler(
						this.Province +
							', ' +
							this.Country +
							' does not exist. Please try a different province & country'
					);
				}
			} catch (error) {
				this.erroHandler('Some error occurred. Please try again later');
				console.log(error);
			} //first submit gets confirmed as default
			console.log('Information Submitted!');
		},

		erroHandler(message) {
			this.$toast.error(message, {
				position: 'bottom-right',
				timeout: 3500,
			});
		},
	},
	components: {
		DonutChart,
	},
};
</script>

<style></style>
