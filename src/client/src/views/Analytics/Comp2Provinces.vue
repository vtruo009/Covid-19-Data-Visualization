<template>
	<div class="mt-5">
		<b-form inline @submit="initialFormSubmission">
			<b-input v-model="Country1" required placeholder="Country"></b-input>
			<b-input
				class="ml-3"
				v-model="Province1"
				required
				placeholder="State/Provinces"
			></b-input>
			<b-input
				class="ml-5"
				v-model="Country2"
				required
				placeholder="Country"
			></b-input>
			<b-input
				class="ml-3"
				v-model="Province2"
				required
				placeholder="State/Provinces"
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
			this.TypeOfData = null;
			//do i need to cache the inputs also?
			await this.GetData('1'); //first submit gets confirmed as default
			console.log('First form submitted!!!!');
		},

		async requestFromSelect() {
			await this.GetData(this.TypeOfData); //whatever user chooses
			console.log('getting what user selected');
		},

		async GetData(TypeOfData) {
			console.log('IN GETDATA()');
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
					this.chartData = [
						['Province', 'Number of Cases'],
						[this.Province1, response.data.Province1NumberOfCases],
						[this.Province2, response.data.Province2NumberOfCases],
					];
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
