<template>
  <div>
    <b-table dark striped hover :items="this.data" :fields="fields">
      <template v-slot:cell(date)="row">{{row.value}}</template>
      <template v-slot:cell(number)="row">{{row.value}}</template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click class="mr-1">Info modal</b-button>
        <b-button size="sm" @click>Details</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "GlobalTable",
  props: {
    data: Array
  },
  data() {
    return {
      fields: [
        { key: "date", label: "Date" },
        { key: "numberOfConfirmed", label: "Number" },
        { key: "actions", label: "Actions" }
      ],
      items: [
        {
          text: "booo",
          noo: "booo",
          x: "booo",
          c: "booo",
          nx: "booo",
          update: "<button> PENCIL </button>",
          delete: "<button> TRASH CAN </button>"
        }
      ]
    };
  }
};
</script>

<style></style>
