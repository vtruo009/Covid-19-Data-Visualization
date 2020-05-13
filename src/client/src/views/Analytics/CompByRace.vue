<template>
	<div class="mt-5 fadeIn">
		<b-form @submit="GetData">
			<b-row class="d-flex justify-content-center">
				<b-col lg="4" sm="8">
					<b-form-select
						required
						v-model="OptionSelected"
						aria-required
						:options="DataOptions"
						class="m-2"
					></b-form-select>
				</b-col>
				<b-col lg="4" sm="4">
					<b-button block type="submit" variant="primary" class="m-2"
						>Search</b-button
					>
				</b-col>
			</b-row>
		</b-form>

		<div v-if="showChart" class="mt-5 d-flex justify-content-center">
			<DonutChart :chart-data="chartData" />
		</div>
	</div>
</template>

<script>
import Services from '../../Services/Services';
import DonutChart from '../../components/DonutChart';
// import palette from 'google-palette';
import Helpers from '../../Services/Helpers';
export default {
	name: 'CompByRace',
	data() {
		return {
			OptionSelected: null,
			DataOptions: [
				{ value: null, text: 'Type of data', disabled: true },
				{ value: '1', text: 'All population' },
				{ value: '2', text: 'Female' },
				{ value: '3', text: 'Male' },
				{ value: '4', text: '80+' },
				{ value: '5', text: '60 - 80' },
				{ value: '6', text: '40 - 60' },
				{ value: '7', text: '20 - 40' },
				{ value: '8', text: '0 - 20' },
			],
			chartData: null,
			showChart: false,
		};
	},
	methods: {
		async GetData(e) {
			e.preventDefault();
			console.log('Getting data...');
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/compareRace',
					params: {
						Option: this.OptionSelected,
					},
				});
				const CountryNumberDict = response.data.CountryNumberDict;
				let labelsToDisplay = [];
				let dataToDisplay = [];
				let noData = true;
				let counter = 0;
				for (let key in CountryNumberDict) {
					if (CountryNumberDict[key] != 0) noData = false;
					counter++;
					labelsToDisplay.push(key);
					dataToDisplay.push([CountryNumberDict[key]]);
				}
				if (noData) {
					this.erroHandler('No data available for the option selected');
				} else {
					this.chartData = {
						labels: labelsToDisplay,
						datasets: [
							{
								label: 'Race comparison',
								data: dataToDisplay,
								backgroundColor: Helpers.getHexColors(dataToDisplay),
							},
						],
					};
					this.showChart = true;
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
