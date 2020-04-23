<template>
  <div>
    <b-table dark striped hover :items="this.data" :fields="fields">
      <template v-slot:cell(date)="row">{{row.value}}</template>
      <template v-slot:cell(number)="row">{{row.value}}</template>
      <template v-slot:cell(actions)="row">
        <b-button class="btn btn-info mr-4" @click="update(row.item.date, row.item.number)">
          <font-awesome-icon :icon="['fas', 'pen']" />
        </b-button>
        <b-button class="btn btn-danger" @click="remove(row.item.date, row.item.number)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen);

export default {
  name: "GlobalTable",
  props: {
    data: Array
  },
  data() {
    return {
      fields: [
        { key: "date", label: "Date" },
        { key: "number", label: "Number" },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  methods: {
    update(date, number) {
      console.log("Update:");
      console.log(date);
      console.log(number);
      // send information to parent
      this.$parent.updateRecord(date, number);
    },
    remove(date, number) {
      console.log("Delete:");
      console.log(date);
      console.log(number);
    }
  }
};
</script>

<style></style>
