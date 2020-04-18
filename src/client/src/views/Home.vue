<template>
  <div class="home fadeIn">
    <div class="padding text-center">
      <h1 class="display-2">COVID 19 - DATA</h1>
      <p class="mt-4">A website that lets you learn from data of the novel COVID-19</p>
      <p>CS 180 - JVMS</p>
      <hr />

      <a href="https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset">
        <button type="button" class="m-3 btn btn-dark">
          Data
          <font-awesome-icon :icon="['fas', 'database']" />
        </button>
      </a>
      <a href="https://github.com/johan1505/CS180Project">
        <button type="button" class="m-3 btn btn-dark">
          Github
          <i class="fab fa-github"></i>
        </button>
      </a>
    </div>
    <TechUsed />
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
library.add(faDatabase);
import TechUsed from "../components/TechUsed";
export default {
  name: "Home",
  components: { TechUsed }
};
</script>

<style>
.padding {
  margin: 180px;
}
</style>
