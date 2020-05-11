<template>
  <div id="app">
    <NavBar></NavBar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
<script>
import NavBar from "./components/NavBar";
import Services from "./Services/Services";
export default {
  components: {
    NavBar
  },
  created() {
    window.addEventListener("beforeunload", function(e) {
      Services.saveAllData();
    });
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700,800,900&display=swap");
html,
body {
  background: linear-gradient(to left, #8942a8, #3498db);
  width: 100%;
  height: 100vh;
  font-family: "Raleway", sans-serif;
  overflow-x: hidden;
  color: #222;
}

/*GLOBAL ANIMATION SECTION*/
.fadeIn {
  -webkit-animation: fadein 1s;
  -moz-animation: fadein 1s;
  -ms-animation: fadein 1s;
  -o-animation: fadein 1s;
  animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
