<template>
	<!-- VAN AND SIYI. PLEASE LOOK AT THE COMMENTS IN THIS FILE REGARDING HOW TO USE A DONUT CHART  -->
	<div class="home fadeIn">
		<div class="margin">
			<b-row class="text-center">
				<b-col lg="12">
					<h1 class="display-2">COVID 19 - DATA</h1>
				</b-col>
				<b-col lg="12">
					<p class="mt-4">
						A website that lets you learn from data of the novel COVID-19
					</p>
				</b-col>
				<b-col lg="12">
					<p>CS 180 - JVMS</p>
				</b-col>
			</b-row>
			<b-row class="justify-content-center">
				<b-col lg="3" xs="6" class="m-2">
					<a
						href="https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset"
						target="_blank"
					>
						<b-button block variant="dark">
							Data
							<font-awesome-icon :icon="['fas', 'database']" />
						</b-button>
					</a>
				</b-col>
				<b-col lg="3" xs="6" class="m-2">
					<a href="https://github.com/johan1505/CS180Project" target="_blank">
						<b-button block variant="dark">
							Github
							<i class="fab fa-github"></i>
						</b-button> </a
				></b-col>
			</b-row>
		</div>
		<TechUsed />
	</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
library.add(faDatabase);
import TechUsed from '../components/TechUsed';

export default {
	name: 'Home',
	data() {
		return {};
	},

	// ADDING THE DONUTCHART TO THE COMPONENTS OBJECT OF HOME
	components: { TechUsed },
};
</script>

<style>
.margin {
	margin-top: 80px;
	margin-bottom: 80px;
}
</style>
