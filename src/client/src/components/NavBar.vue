<template>
  <div id="NavBar">
    <b-navbar class="navbar" sticky toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/">
        COVID 19 - DATA
        <font-awesome-icon :icon="['fas', 'virus']" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="navBar-font" to="/US">
            U.S.
            <font-awesome-icon :icon="['fas', 'flag-usa']" />
          </b-nav-item>
          <b-nav-item class="navBar-font" to="/World">
            World
            <font-awesome-icon :icon="['fas', 'globe-americas']" />
          </b-nav-item>
          <b-nav-item class="navBar-font" to="/Gender">
            By Gender
            <font-awesome-icon :icon="['fas', 'venus-mars']" />
          </b-nav-item>
          <b-nav-item class="navBar-font" to="/Age">
            By Age
            <font-awesome-icon :icon="['fas', 'user-friends']" />
          </b-nav-item>
          <b-nav-item class="navBar-font" to="/Cases">Cases</b-nav-item>
          <b-nav-item-dropdown class="navBar-font" text="Analytics">
            <b-dropdown-item to="/CompByGender">Compare by Gender</b-dropdown-item>
            <b-dropdown-item to="/CompByRace">Compare by Race</b-dropdown-item>
            <b-dropdown-item to="/Comp2Provinces">Compare 2 Regions</b-dropdown-item>
            <b-dropdown-item to="/Comp2Counties">Compare 2 Counties</b-dropdown-item>
            <b-dropdown-item to="/AffectedPopulationCounty">Affected Population by County</b-dropdown-item>
            <b-dropdown-item to="/AffectedPopulationProvince">Affected Population by Province</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVirus,
  faGlobeAmericas,
  faFlagUsa,
  faVenusMars,
  faUserFriends,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faVirus,
  faGlobeAmericas,
  faFlagUsa,
  faVenusMars,
  faUserFriends,
  faChartBar
);
export default { name: "NavBar" };
</script>

<style>
.navbar {
  padding: 0.8rem;
}

.navBar-font {
  font-size: 1.1em !important;
  padding-left: 30px;
}
</style>
