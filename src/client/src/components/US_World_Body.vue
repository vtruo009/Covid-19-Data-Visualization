<template>
  <div id="US_World_Input_Form">
    <div class="m-5 text-center">
      <!-- User input form -->
      <b-form @submit="displayData">
        <b-row>
          <b-col>
            <b-input v-model="firstInput" v-bind:placeholder="this.firstInputName" required></b-input>
          </b-col>
          <b-col>
            <b-input v-model="secondInput" v-bind:placeholder="this.secondInputName" required></b-input>
          </b-col>
          <b-col>
            <b-form-select v-model="TypeOfDataSelected" :options="TypeOfDataoptions" required></b-form-select>
          </b-col>
          <b-col>
            <b-button variant="primary" type="submit">
              <font-awesome-icon :icon="['fas', 'search']" />
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
    <!-- TABLE DATA-->
    <Table v-bind:data="tableData" />
    <!-- Errors to display -->
    <div v-if="error">"Some error occurred :C"</div>
  </div>
</template>

<script>
import Services from "../Services/Services";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "../components/GlobalTable";

library.add(faSearch);

export default {
  name: "US_World_Input_Form",
  props: {
    firstInputName: String,
    secondInputName: String,
    apiEndPoint: String
  },
  data() {
    return {
      firstInput: null,
      secondInput: null,
      TypeOfDataSelected: null,
      TypeOfDataoptions: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "1", text: "Confirmed cases per day" },
        { value: "2", text: "Deaths per day" },
        { value: "3", text: "Recovered cases per day" }
      ],

      tableData: null,
      show: false,
      error: false
    };
  },
  methods: {
    displayData(e) {
      e.preventDefault();
      // Send search request to backend
      Services.searchData({
        apiEndPoint: this.apiEndPoint,
        params: {
          [this.firstInputName]: this.firstInput,
          [this.secondInputName]: this.secondInput,
          TypeOfData: this.TypeOfDataSelected
        }
      })
        .then(response => {
          if (response.status == 200) {
            this.setTableData(response.data.data);
            this.setErrorOff();
          } else {
            this.errorHandler();
            console.log("Error occurred");
          }
        })
        .catch(error => {
          this.errorHandler();
          console.log(error);
        });
    },
    errorHandler() {
      this.setErrorOn();
      // Display no data
      this.setTableData(null);
    },
    setTableData(data) {
      this.tableData = data;
    },
    setErrorOff() {
      this.error = false;
    },
    setErrorOn() {
      this.error = true;
    }
  },
  components: { Table }
};
</script>

<style></style>
