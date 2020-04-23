<template>
  <div id="Table">
    <b-table dark striped hover :items="this.data" :fields="fields">
      <template v-slot:cell(date)="row">{{row.value}}</template>
      <template v-slot:cell(number)="row">{{row.value}}</template>
      <template v-slot:cell(actions)="row">
        <b-button class="btn btn-info mr-4" @click="setUpdate(row.item.date, row.item.number)">
          <font-awesome-icon :icon="['fas', 'pen']" />
        </b-button>
        <b-button class="btn btn-danger" @click="remove(row.item.date, row.item.number)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </b-button>
      </template>
    </b-table>

    <!-- Update Modal -->
    <b-modal ref="update-modal" hide-footer title="Update Record">
      <b-form @submit="sendUpdateRequest">
        <!-- Access cached data from the body parent component -->
        <p>
          <b>Location:</b>
          {{this.$parent.cacheFirstInput}}, {{this.$parent.cacheSecondInput}}
        </p>
        <p>
          <b>Type of record:</b>
          {{this.$parent.cacheTypeOFDataString}}
        </p>
        <b-row>
          <b-col>
            <b-form-group label="Date:">
              <b-form-input v-model="updateRecord.date" disabled required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Number:">
              <b-form-input type="number" v-model="updateRecord.number" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <b-button type="submit" variant="primary" class="float-right">Update</b-button>
        <b-button variant="secondary" class="float-right mr-3" @click="hideUpdateModal">Close</b-button>
      </b-form>
    </b-modal>

    <!-- Delete Modal -->
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen);

export default {
  name: "Table",
  props: {
    data: Array
  },
  data() {
    return {
      updateRecord: {
        date: null,
        number: null
      },
      fields: [
        { key: "date", label: "Date" },
        { key: "number", label: "Number" },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    showUpdateModal() {
      this.$refs["update-modal"].show();
    },
    hideUpdateModal() {
      this.$refs["update-modal"].hide();
      // Clears values
      this.updateRecord.date = null;
      this.updateRecord.number = null;
    },

    setUpdate(date, number) {
      this.showUpdateModal();
      console.log(this.$parent.cacheTypeOfData);
      console.log("Update:");
      console.log(date);
      console.log(number);
      this.updateRecord.date = date;
      this.updateRecord.number = number;
      // send information to parent
      //this.$parent.updateRecord(date, number);
    },
    remove(date, number) {
      console.log("Delete:");
      console.log(date);
      console.log(number);
    },

    sendUpdateRequest(e) {
      e.preventDefault();
      this.hideUpdateModal();
      console.log("Sends request");
    }
  },

  computed: {
    getStringTypeOfData: () => {
      // switch (this.$parent.cacheTypeOfData) {
      //   case 1:
      //     return "Confirmed";
      //   case 2:
      //     return "Deaths";
      //   case 3:
      //     return "Recovered";
      //   default:
      //     return "";
      // }
    }
  }
};
</script>

<style></style>
