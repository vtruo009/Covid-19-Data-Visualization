<template>
	<div id="NavBar">
		<b-navbar toggleable="md" type="light" variant="light" sticky>
			<b-navbar-brand to="/"
				>COVID 19 - DATA <font-awesome-icon :icon="['fas', 'virus']"
			/></b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item class="mr-3" to="/US"
						>U.S. <font-awesome-icon :icon="['fas', 'flag-usa']"
					/></b-nav-item>
					<b-nav-item class="mr-3" to="/World"
						>World <font-awesome-icon :icon="['fas', 'globe-americas']"
					/></b-nav-item>
					<b-nav-item class="mr-3" to="/Gender"
						>By Gender <font-awesome-icon :icon="['fas', 'venus-mars']"
					/></b-nav-item>
					<b-nav-item class="mr-3" to="/Age"
						>By Age <font-awesome-icon :icon="['fas', 'user-friends']"
					/></b-nav-item>
					<b-nav-item-dropdown text="Analytics">
						<b-dropdown-item href="">Analytic 1</b-dropdown-item>
						<b-dropdown-item href="">Analytic 2</b-dropdown-item>
						<b-dropdown-item href="">Analytic 3</b-dropdown-item>
						<b-dropdown-item href="">Analytic 4</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faVirus,
	faGlobeAmericas,
	faFlagUsa,
	faVenusMars,
	faUserFriends,
	faChartBar,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faVirus,
	faGlobeAmericas,
	faFlagUsa,
	faVenusMars,
	faUserFriends,
	faChartBar
);
export default { name: 'NavBar' };
</script>

<style></style>
