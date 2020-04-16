<template>
  <div class="m-5 text-center"  id="Gender_Age_Input_Form">
        <b-form @submit="displayData">
            <b-row>
                <b-col>
                    <b-form-select v-model="dynamicOptionSelected" :options="dynamicOptions" required ></b-form-select>
                </b-col>
                <b-col>
                    <b-form-select v-model="TypeOfDataSelected" :options="TypeOfDataoptions" required ></b-form-select>
                </b-col>
                <b-col>
                    <b-button style="margin-right:160px" variant="primary" type="submit"><BIconSearch/></b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { BIconSearch, componentsPlugin } from 'bootstrap-vue';
import Services from '../Services/Services';

export default {
    name: 'Gender_Age_Input_Form',
    props: {
        InputName: String,
        dynamicOptions: Array,
        apiEndPoint: String
    },
    data() {
        return {
            // Selected by user
            dynamicOptionSelected: null,
            TypeOfDataSelected: null,

            // Options for select
            TypeOfDataoptions:[
                { value: null, text: 'Please select an option', disabled: true},
                { value: '1', text: 'Number of confirmed, deaths, and recovered for each country' },
                { value: '2', text: 'Number of cases per day' },
            ]
        }
    },
    methods:{
        async displayData(e) {
            // Turns on loading spinner
            this.$parent.$parent.show = true;
            // Send search request to backend
            e.preventDefault();
            Services.searchData({
                apiEndPoint: this.apiEndPoint,
                params: {
                    [this.InputName] : this.dynamicOptionSelected,
                    TypeOfData: this.TypeOfDataSelected
                }
            })
            .then((response) => {
                console.log(response);
                if (response.status == 200){
                    // Populates tabledata in grandparent component
                    this.$parent.$parent.tableData = response.data.data;
                }
                else {
                    console.log("Error occurred");
                }
            })
            .catch(error => console.log(error));      
             // Turns off loading spinner   
            this.$parent.$parent.show = false;      
        }
    },
    components:{
        BIconSearch
    }  
}
</script>

<style>

</style>