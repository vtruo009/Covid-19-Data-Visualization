<template>
	<!-- VAN AND SIYI. PLEASE LOOK AT THE COMMENTS IN THIS FILE REGARDING HOW TO USE A DONUT CHART  -->
	<div class="home fadeIn">
		<div class="padding text-center">
			<h1 class="display-2">COVID 19 - DATA</h1>
			<p class="mt-4">
				A website that lets you learn from data of the novel COVID-19
			</p>
			<p>CS 180 - JVMS</p>
			<hr />

			<a
				href="https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset"
			>
				<button type="button" class="m-3 btn btn-dark">
					Data
					<font-awesome-icon :icon="['fas', 'database']" />
				</button>
			</a>
			<a href="https://github.com/johan1505/CS180Project">
				<button type="button" class="m-3 btn btn-dark">
					Github
					<i class="fab fa-github"></i>
				</button>
			</a>
		</div>
		<!-- Using the donut chart component to display the donut chart. 
    Note I am passing the chartData object to the DonutChart component using the v-bind property
    Without this, the DonutChart component will not know what data to display
     -->
		<DonutChart v-bind:data="chartData" />
		<TechUsed />
	</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
library.add(faDatabase);
import TechUsed from '../components/TechUsed';

// IMPORTING DONUT CHART
import DonutChart from '../components/DonutChart';

export default {
	name: 'Home',
	data() {
		return {
			// The data in this Array will be used by the DonutChart commponent
			chartData: [
				['Task', 'Hours per Day'],
				['Work', 11],
				['Eat', 2],
				['Commute', 2],
				['Watch TV', 2],
				['Sleep', 7],
			],
		};
	},

	// ADDING THE DONUTCHART TO THE COMPONENTS OBJECT OF HOME
	components: { TechUsed, DonutChart },
};
</script>

<style>
.padding {
	margin: 180px;
}
</style>
