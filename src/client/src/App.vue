<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/">COVID 19 - DATA</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/US">U.S.</b-nav-item>
            <b-nav-item to="/World"> World</b-nav-item>
            <b-nav-item to="/Gender"> By Gender</b-nav-item>
            <b-nav-item to="/Age"> By Age </b-nav-item>
            <b-nav-item-dropdown text="Analytics" >
              <b-dropdown-item href="">Analytic 1</b-dropdown-item>
              <b-dropdown-item href="">Analytic 2</b-dropdown-item>
              <b-dropdown-item href="">Analytic 3</b-dropdown-item>
              <b-dropdown-item href="">Analytic 4</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <b-container class="bv-example-row">
      <router-view/>
    </b-container>
  </div>
</template>

<style>

</style>
