<template>
  <div id="TechUsed">
    <b-container class="mt-3" fluid>
      <b-row class="text-center">
        <b-col>
          <h1 class="display-4">Technologies Used</h1>
        </b-col>
      </b-row>
    </b-container>
    <hr />
    <b-container fluid>
      <b-row class="text-center">
        <b-col class="techUsed" cols="12" sm="6" md="4">
          <i class="fab fa-bootstrap bootstrap-icon"></i>
          <h3>Bootstrap</h3>
          <p>Styled with Bootstrap</p>
        </b-col>
        <b-col class="techUsed" cols="12" sm="6" md="4">
          <i class="fab fa-vuejs vue-icon"></i>
          <h3>Vue.js</h3>
          <p>Front-end built with Vue.js</p>
        </b-col>
        <b-col class="techUsed" sm="12" md="4">
          <i class="fab fa-node node-icon"></i>
          <h3>Node.js</h3>
          <p>Back-end built with Node.js</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExpr } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "TechUsed"
};
</script>

<style>
hr {
  width: 70%;
}
.techUsed {
  padding: 50px;
}

p {
  font-size: 20px;
  color: #2c3e50;
}

.vue-icon {
  color: #16a085;
}

.bootstrap-icon {
  color: #8e44ad;
}

.node-icon {
  color: #2f3542;
}

.bootstrap-icon,
.node-icon,
.vue-icon {
  font-size: 100px;
}
</style>
