<template>
	<div class="mt-5 fadeIn">
		<b-form @submit="initialFormSubmission">
			<b-row class="d-flex justify-content-center">
				<b-col lg="2" xs="8" class="m-2">
					<b-input
						v-model="County1"
						required
						placeholder="First County"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2"
					><b-input
						v-model="State1"
						required
						placeholder="First State"
					></b-input>
				</b-col>
				<b-col lg="2" xs="8" class="m-2">
					<b-input
						v-model="County2"
						required
						placeholder="Second County"
					></b-input
				></b-col>
				<b-col lg="2" xs="8" class="m-2"
					><b-input
						v-model="State2"
						required
						placeholder="Second State"
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
	name: 'Comp2Counties',
	data() {
		return {
			//Changes according to the input field (user inputs)
			State1: null,
			County1: null,
			State2: null,
			County2: null,
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
			await this.GetData('1'); //first submit gets confirmed as default
		},
		async requestFromSelect() {
			await this.GetData(this.TypeOfData); //whatever user chooses
		},
		async GetData(TypeOfData) {
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/compareCounties',
					params: {
						State1: this.State1,
						County1: this.County1,
						State2: this.State2,
						County2: this.County2,
						TypeOfData: TypeOfData,
					},
				});
				if (response.data.County1Exists && response.data.County2Exists) {
					if (
						response.data.County1NumberOfCases == 0 &&
						response.data.County2NumberOfCases == 0
					) {
						this.showChart = false;
						this.erroHandler(
							`No ${this.TypeOfDataOptions[this.TypeOfData].text} Cases for ${
								this.County1
							}, ${this.State1}`
						);
						this.erroHandler(
							`No ${this.TypeOfDataOptions[this.TypeOfData].text} Cases for ${
								this.County2
							}, ${this.State2}`
						);
					} else {
						this.showChart = true;
						this.chartData = {
							labels: [this.County1, this.County2],
							datasets: [
								{
									label: 'Number of Cases for each County',
									data: [
										response.data.County1NumberOfCases,
										response.data.County2NumberOfCases,
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
					if (!response.data.County1Exists) {
						this.erroHandler(
							this.County1 +
								', ' +
								this.State1 +
								' does not exist. Please try a different province & county'
						);
					}
					if (!response.data.County2Exists) {
						this.erroHandler(
							this.County2 +
								', ' +
								this.State2 +
								' does not exist. Please try a different province & county'
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
