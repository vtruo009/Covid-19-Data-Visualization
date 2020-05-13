<template>
	<div class="mt-5 fadeIn">
		<b-form @submit="initialFormSubmission">
			<b-row class="d-flex justify-content-center">
				<b-col lg="2" xs="8" class="m-2">
					<b-input
						v-model="Province1"
						required
						placeholder="First Province"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2"
					><b-input
						v-model="Country1"
						required
						placeholder="First Country"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2">
					<b-input
						v-model="Province2"
						required
						placeholder="Second Province"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2"
					><b-input
						v-model="Country2"
						required
						placeholder="Second Country"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2">
					<b-button block type="submit" variant="primary">Search</b-button>
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
				<b-col class="m-5">
					<b-form-select
						@change="requestFromSelect"
						v-model="TypeOfData"
						required
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
	name: 'Comp2Provinces',
	data() {
		return {
			//Changes according to the input field (user inputs)
			Country1: null,
			Province1: null,
			Country2: null,
			Province2: null,
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
			e.preventDefault();
			this.TypeOfData = '1';
			//do i need to cache the inputs also?
			await this.GetData('1'); //first submit gets confirmed as default
		},

		async requestFromSelect() {
			await this.GetData(this.TypeOfData); //whatever user chooses
		},

		async GetData(TypeOfData) {
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/compareProvinces',
					params: {
						Country1: this.Country1,
						Province1: this.Province1,
						Country2: this.Country2,
						Province2: this.Province2,
						TypeOfData: TypeOfData,
					},
				});
				if (response.data.Province1Exists && response.data.Province2Exists) {
					if (!this.showChart) this.showChart = true;
					this.chartData = {
						labels: [this.Province1, this.Province2],
						datasets: [
							{
								label: 'Number of Cases for each province',
								data: [
									response.data.Province1NumberOfCases,
									response.data.Province2NumberOfCases,
								],
								backgroundColor: [
									'rgba(214, 48, 49, 1)',
									'rgba(9, 132, 227, 1)',
								],
							},
						],
					};
				} else {
					if (!response.data.Province1Exists) {
						this.erroHandler(
							this.Province1 +
								', ' +
								this.Country1 +
								' does not exist. Please try a different province & country'
						);
					}
					if (!response.data.Province2Exists) {
						this.erroHandler(
							this.Province2 +
								', ' +
								this.Country2 +
								' does not exist. Please try a different province & country'
						);
					}
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
