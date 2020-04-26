<template>
	<div id="Error">
		<div class="alert alert-danger width" role="alert">
			{{ this.errorMessage }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'Error',
	props: {
		errorMessage: String,
	},
};
</script>

<style>
.width {
	display: inline-block;
  
}
</style>
