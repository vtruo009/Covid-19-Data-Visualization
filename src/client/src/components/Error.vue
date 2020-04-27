<template>
	<div id="Error">
		<div class="alert alert-danger text-center" role="alert">
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

<style></style>
