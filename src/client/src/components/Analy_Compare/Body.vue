<template>
    <div id="Body">
        <!-- User Insert Compare Area -->
        <div class>
         <b-form @submit="displayData">
            <b-row>
					<b-col>
						<b-input
							v-model="firstInput"
                            :placeholder="this.firstInputName"
							required
						></b-input>
					</b-col>
                    <b-col>
						<b-input
							v-model="secondInput"
                            :placeholder="this.secondInputName"
							required
						></b-input>
					</b-col>
                    <b-col>
						<b-input
							v-model="thirdInput"
                            :placeholder="this.thirdInputName"
							required
						></b-input>
					</b-col>
                    <b-col>
						<b-input
							v-model="fourthInput"
                            :placeholder="this.fourthInputName"
							required
						></b-input>
					</b-col>
                    <b-col>
						<b-button variant="primary" type="submit">
							<font-awesome-icon :icon="['fas', 'search']" />
						</b-button>
					</b-col>
            </b-row>
            </b-form>
        </div>
    </div>
</template>

<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Services from "../../Services/Services";

library.add(faSearch);

export default {
    name: 'Body',
    data(){
        return {
        firstInput: null,
        secondInput: null,
        thirdInput: null,
        fourthInput: null,
        };
    },
    methods: {
    //  async displayData(e) {
	// 		e.preventDefault();
	// 		this.showTable();
	// 		// Hide Messages
	// 		this.setErrorOff();
	// 		this.setSuccessOff();

	// 		// Send search request to backend
	// 		this.toggleTableBusy();
	// 		try {
	// 			const response = await Services.searchData({
	// 				apiEndPoint: this.apiEndPoint,
	// 				params: {
	// 					[this.firstInputName]: this.firstInput,
	// 					[this.secondInputName]: this.secondInput,
    //                     [this.thirdInputName]: this.thirdInput,
	// 					[this.fourthInputName]: this.fourthInput,
	// 				},
	// 			});
	// 			console.log(response);
	// 			if (response.data.data == undefined) {
	// 				this.errorHandler(
	// 					`No data available for ${this.firstInput}, ${this.secondInput}.`
	// 				);
	// 			} else {
	// 				this.setTableData(response.data.data);
	// 			}
	// 			// Save data for future requests
	// 			this.cacheInputtedData();
	// 		} catch (error) {
	// 			this.errorHandler('Some error occurred. Please try again');
	// 			console.log(error);
	// 		}
	// 		//  Sets loading spinner off
	// 		this.toggleTableBusy();
	// 	},
    }
};
</script>

<style></style>