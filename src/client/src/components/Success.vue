<template>
	<div id="Success">
		<div class="alert alert-success text-center" role="success ">
			{{ this.successMessage }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'Success',
	props: {
		successMessage: String,
	},
};
</script>

<style></style>
