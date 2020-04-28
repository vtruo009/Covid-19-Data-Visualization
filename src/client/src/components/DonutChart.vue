<template>
	<GChart
		type="PieChart"
		:data="this.data"
		:options="chartOptions"
		class="size"
	/>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
	name: 'DonutChart',
	props: {
		data: Array,
	},
	data() {
		return {
			chartOptions: {
				chart: {},
				pieHole: 0.3,
			},
		};
	},
};
</script>

<style>
.size {
	width: 900px;
	height: 500px;
}
</style>
