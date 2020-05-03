<template>
  <div id="Body">
    <div class="m-5 text-center">
        <b-row>
            <b-col> <!-- can optimize later on with 2 inputs since theyreboth state & country -->
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
                <b-input
                    v-model="thirdInput"
                    v-bind:placeholder="this.thirdInputName"
                    required
                ></b-input>
            </b-col>
            <b-col>
                <b-input
                    v-model="fourthInput"
                    v-bind:placeholder="this.fourthInputName"
                    required
                ></b-input>
            </b-col>
            <b-col>
                <b-button variant="primary" type="submit">
                    <font-awesome-icon :icon="['fas', 'search']" />
                </b-button>
            </b-col>
        </b-row>

        <b-row class="mt-5">
            <DonutChart v-bind:data="testData"/>
        </b-row>
    </div>
  </div>
</template>

<script>
import DonutChart from "../DonutChart";

export default {
    name: "Body",
    props: {
        firstInputName: String,
        secondInputName: String,
        thirdInputName: String,
        fourthInputName: String,
        apiEndpoint: String,
    },
    data() {
        return {
            chartData: [
                
            ]
        }
    },
    components: {Body, DonutChart},
}
</script>

<style>

</style>