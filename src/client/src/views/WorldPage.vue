<template>
  <div class="WorldPge fadeIn">
    <WorldBody firstInputName="State" secondInputName="Country" apiEndPoint="/WorldData" />
  </div>
</template>

<script>
import WorldBody from "../components/US_World_Body";

export default {
  name: "WorldPage",
  data() {
    return {};
  },
  methods: {},
  components: { WorldBody }
};
</script>

<style></style>
