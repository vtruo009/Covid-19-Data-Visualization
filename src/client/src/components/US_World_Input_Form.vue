<template>
  <div id="US_World_Input_Form">
        <b-form @submit="displayData">
            <b-row>
                <b-col>
                    <b-input v-model="firstInput" v-bind:placeholder="this.firstInputName" required></b-input>
                </b-col>
                <b-col>
                    <b-input v-model="secondInput" v-bind:placeholder="this.secondInputName" required></b-input>
                </b-col>
                <b-col>
                    <b-form-select v-model="optionSelected" :options="options" required ></b-form-select>
                </b-col>
                <b-col>
                    <b-button variant="primary" type="submit"><BIconSearch/></b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { BIconSearch } from 'bootstrap-vue'

export default {
    name: 'US_World_Input_Form',
    props: {
        firstInputName: String,
        secondInputName: String,
        apiEndPoint: String
    },
    data() {
        return {
            firstInput: null,
            secondInput: null,
            optionSelected: null,
            options:[
                { value: null, text: 'Please select an option', disabled: true},
                { value: '1', text: 'Confirmed cases per day' },
                { value: '2', text: 'Deaths per day' },
                { value: '3', text: 'Recovered cases per day' }
            ]
        }
    },
    methods:{
        displayData(e) {
            e.preventDefault();
            console.log(this.firstInput, this.secondInput, this.optionSelected);
        }
    },
    components:{
        BIconSearch
    }  
}
</script>

<style>

</style>