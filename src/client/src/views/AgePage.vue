<template>
	<div class="AgePage fadeIn">
		<Body
			InputName="AgeRange"
			v-bind:dynamicOptions="ageOptions"
			apiEndPoint="/AgeData"
		/>
	</div>
</template>

<script>
import Body from '../components/Gender_Age/Body';
export default {
	name: 'AgePage',
	components: {
		Body,
	},
	data() {
		return {
			ageOptions: [
				{ value: null, text: 'Age Range', disabled: true },
				{ value: '1', text: '80+' },
				{ value: '2', text: '60 - 80' },
				{ value: '3', text: '40 - 60' },
				{ value: '4', text: '20 - 40' },
				{ value: '5', text: '0 - 20' },
			],
		};
	},
};
</script>

<style></style>
