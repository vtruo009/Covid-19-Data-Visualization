<template>
  <div class="WorldPge fadeIn">
    <Body firstInputName="State" secondInputName="Country" apiEndPoint="/WorldData" />
  </div>
</template>

<script>
import Body from "../components/US_World/Body";

export default {
  name: "WorldPage",
  data() {
    return {};
  },
  methods: {},
  components: { Body }
};
</script>

<style></style>
