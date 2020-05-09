<template>
  <div class="mt-5">
    <b-form inline @submit="GetData">
      <b-form-select v-model="OptionSelected" aria-required :options="DataOptions"></b-form-select>
      <b-button type="submit" variant="primary" class="ml-3">Search</b-button>
    </b-form>

    <div v-if="showChart" class="mt-5 d-flex justify-content-end">
      <b-row>
        <b-col>
          <DonutChart v-bind:data="chartData" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Services from "../../Services/Services";
import DonutChart from "../../components/DonutChart";
export default {
  name: "CompByRace",
  data() {
    return {
      OptionSelected: null,
      DataOptions: [
        { value: null, text: "Type of data", disabled: true },
        { value: "1", text: "All population" },
        { value: "2", text: "Female" },
        { value: "3", text: "Male" },
        { value: "4", text: "80+" },
        { value: "5", text: "60 - 80" },
        { value: "6", text: "40 - 60" },
        { value: "7", text: "20 - 40" },
        { value: "8", text: "0 - 20" }
      ],
      chartData: null,
      showChart: false
    };
  },
  methods: {
    async GetData(e) {
      e.preventDefault();
      console.log("Getting data...");
      try {
        const response = await Services.GetAnalyticsData({
          apiEndPoint: "/compareRace",
          params: {
            Option: this.OptionSelected
          }
        });
        const CountryNumberDict = response.data.CountryNumberDict;
        let dataToDisplay = [["Country", "Number of Cases"]];
        let noData = true;
        for (let key in CountryNumberDict) {
          if (CountryNumberDict[key] != 0) noData = false;
          dataToDisplay.push([key, CountryNumberDict[key]]);
        }
        if (noData) {
          this.erroHandler("No data available for the option selected");
        } else {
          this.chartData = dataToDisplay;
          this.showChart = true;
        }
      } catch (error) {
        // TO DO: SHOW ERROR: "Some error occurred. Please try again"
        this.erroHandler("Some error occurred. Please try again later");
        console.log(error);
      }
    },
    erroHandler(message) {
      // Shows error
      this.$toast.error(message, {
        position: "bottom-right",
        timeout: 4500
      });
    }
  },
  components: {
    DonutChart
  }
};
</script>

<style></style>
