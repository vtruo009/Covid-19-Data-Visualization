<template>
	<div id="app">
		<NavBar></NavBar>
		<b-container class="bv-example-row">
			<router-view />
		</b-container>
	</div>
</template>
<script>
import NavBar from './components/NavBar';

export default {
	components: {
		NavBar,
	},
};
</script>
<style></style>
