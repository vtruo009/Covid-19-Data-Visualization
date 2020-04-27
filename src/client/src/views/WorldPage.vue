<template>
  <div class="WorldPge fadeIn">
    <Body firstInputName="State" secondInputName="Country" v-bind:TypeOfDataoptions="worldOptions" apiEndPoint="/WorldData" />
  </div>
</template>

<script>
import Body from "../components/US_World/Body";

export default {
  name: "WorldPage",
  data() {
    return {
      worldOptions: [
        { value: null, text: 'Please select an option', disabled: true },
				{ value: '1', text: 'Confirmed cases per day' },
				{ value: '2', text: 'Deaths per day' },
				{ value: '3', text: 'Recovered cases per day' },
      ]
    };
  },
  methods: {},
  components: { Body }
};
</script>

<style></style>
