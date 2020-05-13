<script>
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
	extends: Doughnut,
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					labels: {
						fontColor: 'black',
						fontSize: 18,
					},
				},
			},
		};
	},
	mixins: [reactiveProp],
	mounted() {
		this.renderChart(this.chartData, this.options);
	},
};
</script>

<style></style>
