<template>
	<div class="mt-5">
		<b-form inline @submit="GetData">
			<b-input
				v-model="County"
				required
				placeholder="County"
			></b-input>
			<b-input
				class="ml-3"
				v-model="State"
				required
				placeholder="State"
			></b-input>
			<b-button type="submit" variant="primary" class="ml-5">Search</b-button>
		</b-form>

		<div v-if="showChart" class="mt-5">
			<!-- this will only render if showChart is a truthy value -->
			<b-row>
				<DonutChart v-bind:data="chartData" />
			</b-row>
		</div>
	</div>
</template>

<script>
import Services from "../../Services/Services"
import DonutChart from "../../components/DonutChart"

export default {
	name: "AffectedPopulationCounty",
	data() {
		return {
			County: null,
			State: null,
			chartData: null,
			showChart: false,
		}
	},
	methods: {
		async GetData(e) {
			e.preventDefault();
			console.log("In GetData()");
			try {
				const response = await Services.GetAnalyticsData({
					apiEndPoint: "/comparePercentageUS",
					params: {
						State: this.State,
						County: this.County,
					}
				});
				if (response.data.CountyExists) {
					if (!this.showChart) this.showChart = true;
					this.chartData = [
						["Type", "Number of Cases"],
						["Unaffected", response.data.NumOfUnaffected],
						["Death", response.data.NumOfDeath],
						["Confirmed", response.data.NumOfConfirmed],
					];
				}
				else {
					this.erroHandler(
						this.County + " does not exist. Please try a different county"
					);
				}
			}
			catch(error) {
				this.erroHandler("Some error occurred. Please try again later");
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
	}
}
</script>

<style>

</style>