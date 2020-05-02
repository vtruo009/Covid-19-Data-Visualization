<template>
  <div class="Comp2Provinces fadeIn">
    <Body firstInputName="State/Province" secondInputName="Country" thirdInputName="State/Province" fourthInputName="Country" apiEndpoint="/compareProvinces" />
  </div>
</template>

<script>
import Body from "../components/County_Province/Body";

export default {
    name: "Comp2Provinces",
    data() {
      return {};
    },
    methods: {},
    components: { Body }
};
</script>

<style>

</style>