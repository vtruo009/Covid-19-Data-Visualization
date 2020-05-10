<template>
  	<div class="mt-5">
		<b-form inline @submit="FormSubmission">
			<b-input v-model="Country" required placeholder="Country"></b-input>
			<b-input
				class="ml-3"
				v-model="Province"
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
			//Changes according to the input field (user inputs)
			Country: null,
			Province: null,
			chartData: null,
			showChart: false,
		};
	},
	methods:{
    async FormSubmission(e) {
			e.preventDefault();
			await this.GetData('1'); //first submit gets confirmed as default
			console.log('Information Submitted!');
    },
      
    async GetData(e) {
			console.log('IN GETDATA()');
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: '/comparePercentageWorld',
					params: {
						Country: this.Country,
						Province: this.Province,
					},
				});
				if (response.data.ProvinceExists) {
					if (!this.showChart) this.showChart = true;
					this.chartData = [
						['Type of Data', 'Number of Cases'],
						['Confirmed', response.data.NumOfConfirmed],
						['Death', response.data.NumOfDeath], 
						['Recovered', response.data.NumOfRecovered],


					];
				} else {
					if (!response.data.ProvinceExists) {
						this.erroHandler(
              			this.Province +
              			', '+ this.Country +	' does not exist. Please try a different province & country'
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

<style>

</style>