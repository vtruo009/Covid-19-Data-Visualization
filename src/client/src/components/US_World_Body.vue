<template>
  <div id="US_World_Body">
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
            <button type="button" class="btn btn-primary" @click="showModal()" > Insert </button>
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
    <Error v-if="error" v-bind:errorMessage="errorMessage" />
    <!-- Modal -->
    <b-modal ref="insert-modal" hide-footer hide-title>
      <h1>hello</h1>
    </b-modal>
  </div>
   <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Please Enter the Information Below</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            Hello World!
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
     -->

</template>

<script>
import Services from "../Services/Services";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "../components/GlobalTable";
import Error from "../components/Error";
import exampleModal from './exampleModal.vue';

library.add(faSearch);

export default {
  name: "US_World_Body",
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
      // Data to used to populate table
      tableData: null,
      // Boolean used to display errors if any
      error: false,
      errorMessage: null
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
          if (response.data.data == undefined) {
            this.errorHandler(
              `No data available for ${this.firstInput}, ${this.secondInput}.`
            );
          } else {
            this.setTableData(response.data.data);
            this.setErrorOff();
          }
        })
        .catch(error => {
          this.errorHandler("Some error occurred. Please try again");
          console.log(error);
        });
    },
    errorHandler(errorMessage) {
      this.setErrorOn();
      this.errorMessage = errorMessage;
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
    },
    showModal() {
      // let element = this.$refs.modal.$el;
      // $(element).modal('show');
      console.log("hi");
      this.$refs["insert-modal"].show();

    }
  },
  components: { Table, Error, exampleModal }
};
</script>

<style></style>
