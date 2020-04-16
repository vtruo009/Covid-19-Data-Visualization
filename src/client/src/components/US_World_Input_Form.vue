<template>
	<div class="m-5 text-center" id="US_World_Input_Form">
		<b-form @submit="displayData">
			<b-row>
				<b-col>
					<b-input
						v-model="firstInput"
						v-bind:placeholder="this.firstInputName"
						required
					></b-input>
				</b-col>
				<b-col>
					<b-input
						v-model="secondInput"
						v-bind:placeholder="this.secondInputName"
						required
					></b-input>
				</b-col>
				<b-col>
					<b-form-select
						v-model="TypeOfDataSelected"
						:options="TypeOfDataoptions"
						required
					></b-form-select>
				</b-col>
				<b-col>
					<b-button variant="primary" type="submit">
						<font-awesome-icon :icon="['fas', 'search']" />
					</b-button>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
import Services from '../Services/Services';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

export default {
	name: 'US_World_Input_Form',
	props: {
		firstInputName: String,
		secondInputName: String,
		apiEndPoint: String,
	},
	data() {
		return {
			firstInput: null,
			secondInput: null,
			TypeOfDataSelected: null,
			TypeOfDataoptions: [
				{ value: null, text: 'Please select an option', disabled: true },
				{ value: '1', text: 'Confirmed cases per day' },
				{ value: '2', text: 'Deaths per day' },
				{ value: '3', text: 'Recovered cases per day' },
			],
		};
	},
	methods: {
		displayData(e) {
			e.preventDefault();
			// Turns on loading spinner
			this.$parent.$parent.show = true;
			// Send search request to backend
			Services.searchData({
				apiEndPoint: this.apiEndPoint,
				params: {
					[this.firstInputName]: this.firstInput,
					[this.secondInputName]: this.secondInput,
					TypeOfData: this.TypeOfDataSelected,
				},
			})
				.then((response) => {
					if (response.status == 200) {
						// Populates tabledata in grandparent component
						this.$parent.$parent.tableData = response.data.data;
					} else {
						console.log('Error occurred');
					}
				})
				.catch((error) => console.log(error));
			// Turns off loading spinner
			this.$parent.$parent.show = false;
		},
	},
	components: {},
};
</script>

<style></style>
