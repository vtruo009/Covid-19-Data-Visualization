<template>
	<div class="mt-5 fadeIn">
		<b-form @submit="GetData">
			<b-row class="d-flex justify-content-center">
				<b-col lg="3" sm="8">
					<b-input
						v-model="County"
						class="m-2"
						required
						placeholder="County"
					></b-input>
				</b-col>
				<b-col lg="3" sm="8">
					<b-input
						class="m-2"
						v-model="State"
						required
						placeholder="State"
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
	name: 'AffectedPopulationCounty',
	data() {
		return {
			County: null,
			State: null,
			chartData: null,
			showChart: false,
		};
	},
	methods: {
		async GetData(e) {
			e.preventDefault();
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/comparePercentageUS',
					params: {
						State: this.State,
						County: this.County,
					},
				});
				if (response.data.CountyExists) {
					this.showChart = true;
					this.chartData = {
						labels: ['Unaffected', 'Death', 'Confirmed'],
						datasets: [
							{
								label: 'Number of Cases',
								data: [
									response.data.NumOfUnaffected,
									response.data.NumOfDeath,
									response.data.NumOfConfirmed,
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
						this.County +
							', ' +
							this.State +
							' does not exist. Please try a different county'
					);
				}
			} catch (error) {
				this.erroHandler('Some error occurred. Please try again later');
				console.log(error);
			}
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
