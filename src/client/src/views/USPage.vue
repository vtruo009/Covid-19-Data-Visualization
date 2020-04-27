<template>
  <div class="USPage fadeIn">
    <Body firstInputName="County" secondInputName="State" v-bind:TypeOfDataoptions="usOptions" apiEndPoint="/USData" />
  </div>
  
</template>

<script>
import Body from "../components/US_World/Body";

export default {
  name: "USPage",
  data() {
    return {
      usOptions: [
        { value: null, text: 'Please select an option', disabled: true },
				{ value: '1', text: 'Confirmed cases per day' },
				{ value: '2', text: 'Deaths per day' },
      ]
    };
  },
  methods: {},
  components: {
    Body
  }
};
</script>

<style></style>
