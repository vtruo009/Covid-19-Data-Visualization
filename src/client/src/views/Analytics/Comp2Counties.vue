<template>
	<div class="mt-5">
		<b-form inline @submit="initialFormSubmission">
			<b-input v-model="County1" required placeholder="County"></b-input>
			<b-input
				class="ml-3"
				v-model="State1"
				required
				placeholder="Province/State"
			></b-input>
			<b-input
				class="ml-5"
				v-model="County2"
				required
				placeholder="County"
			></b-input>
			<b-input
				class="ml-3"
				v-model="State2"
				required
				placeholder="Province/State"
			></b-input>
			<b-button type="submit" variant="primary" class="ml-5">Search</b-button>
		</b-form>

		<div v-if="showChart" class="mt-5">
			<!-- this will only render if showChart is a truthy value -->
			<b-row>
				<!-- row contains donut chart & selection -->
				<b-col>
					<DonutChart v-bind:data="chartData" />
					<!-- will display whatever bind to it -->
				</b-col>
				<b-col>
					<!-- at chagne, calls requestFromSelect func
              displays typeofdataoptions listed in data()  -->
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
			this.TypeOfData = null;
			await this.GetData('1'); //first submit gets confirmed as default
			console.log('Information Submitted!');
		},
		async requestFromSelect() {
			await this.GetData(this.TypeOfData); //whatever user chooses
			console.log('getting what user selected');
		},
		async GetData(TypeOfData) {
			console.log('IN GETDATA()');
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
				console.log(response);
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
						this.chartData = [
							['County', 'Number of Cases'],
							[this.County1, response.data.County1NumberOfCases],
							[this.County2, response.data.County2NumberOfCases],
						];
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
