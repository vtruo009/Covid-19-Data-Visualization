<template>
  <div class="Comp2Countries fadeIn">
    <div>
      <h3>Please Enter The Information Below</h3>
    </div>
    <Body firstInputName="Country1" secondInputName="State1" thirdInputName="Country2" fourthInputName="State2" apiEndPoint="/Comp2Countries" />
  </div>
</template>

<script>
import Body from "../components/Analy_Compare/Body";
export default {
    name: "Comp2Counties",
    components: {
      Body
    },
};
</script>

<style>

</style>