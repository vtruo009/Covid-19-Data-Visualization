<template>
	<div id="Table">
		<b-pagination
			v-model="currentPage"
			:total-rows="dataLength"
			:per-page="perPage"
			align="fill"
			pills
			class="m-3"
		></b-pagination>
		<b-table
			dark
			striped
			hover
			ref="table"
			:current-page="currentPage"
			:per-page="perPage"
			:items="returnData"
			:fields="fields"
			:busy="this.isBusy"
		>
			<template v-slot:table-busy>
				<div class="text-center text-danger my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong> Loading...</strong>
				</div>
			</template>
			<template v-slot:cell(date)="row">{{ row.value }}</template>
			<template v-slot:cell(number)="row">{{ row.value }}</template>
			<template v-slot:cell(actions)="row">
				<b-button
					variant="primary"
					class="mr-4"
					@click="setUpdate(row.item.date, row.item.number, row.index)"
				>
					<font-awesome-icon :icon="['fas', 'pen']" />
				</b-button>
				<b-button
					class="btn btn-danger"
					@click="setRemove(row.item.date, row.item.number, row.index)"
				>
					<font-awesome-icon :icon="['fas', 'trash']" />
				</b-button>
			</template>
		</b-table>

		<!-- Update Modal -->
		<b-modal :busy="formIsBusy" ref="update-modal" hide-footer hide-title>
			<b-overlay :show="formIsBusy" rounded="sm">
				<b-form @submit="sendUpdateRequest">
					<h3 class="danger mb-4">
						You are going to edit the following record
					</h3>
					<hr />
					<!-- Access cached data from the body parent component -->
					<p>
						<font-awesome-icon :icon="['fas', 'globe']" />
						<b> Location:</b>
						{{ this.$parent.cacheFirstInput }},
						{{ this.$parent.cacheSecondInput }}
					</p>
					<p>
						<font-awesome-icon :icon="['fas', 'file-medical']" />
						<b> Type of record:</b>
						{{ this.$parent.cacheTypeOFDataString }}
					</p>
					<b-row>
						<b-col>
							<b-form-group label="Date:">
								<b-form-input
									v-model="selectedRecord.date"
									disabled
								></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Number:">
								<b-form-input
									type="number"
									v-model="selectedRecord.number"
									required
								></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>
					<hr />
					<b-button
						type="submit"
						:disabled="formIsBusy"
						variant="primary"
						class="float-right"
						>Update</b-button
					>
					<b-button
						:disabled="formIsBusy"
						variant="secondary"
						class="float-right mr-3"
						@click="hideUpdateModal"
						>Close</b-button
					>
				</b-form>
			</b-overlay>
		</b-modal>

		<!-- Delete Modal -->
		<b-modal ref="delete-modal" hide-footer hide-title>
			<b-overlay :show="formIsBusy" rounded="sm">
				<b-form @submit="sendDeleteRequest">
					<!-- Access cached data from the body parent component -->
					<div class="mb-4">
						<h3 class="text-danger text-center">WARNING</h3>
						<h4>Are you sure you want to delete the following record?</h4>
					</div>
					<hr />
					<p>
						<font-awesome-icon :icon="['fas', 'globe']" />
						<b> Location:</b>
						{{ this.$parent.cacheFirstInput }},
						{{ this.$parent.cacheSecondInput }}
					</p>
					<p>
						<font-awesome-icon :icon="['fas', 'file-medical']" />
						<b> Type of record:</b>
						{{ this.$parent.cacheTypeOFDataString }}
					</p>
					<b-row>
						<b-col>
							<b-form-group label="Date:">
								<b-form-input
									v-bind:value="selectedRecord.date"
									disabled
								></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Number:">
								<b-form-input
									type="number"
									v-bind:value="selectedRecord.number"
									disabled
								></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>
					<hr />
					<b-button
						:disabled="formIsBusy"
						type="submit"
						variant="danger"
						class="float-right"
						>Yes</b-button
					>
					<b-button
						:disabled="formIsBusy"
						variant="secondary"
						class="float-right mr-3"
						@click="hideDeleteModal"
						>No</b-button
					>
				</b-form>
			</b-overlay>
		</b-modal>
	</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faTrash,
	faPen,
	faGlobe,
	faFileMedical,
} from '@fortawesome/free-solid-svg-icons';
import Services from '../../Services/Services';

library.add(faGlobe, faTrash, faPen, faFileMedical);

export default {
	name: 'Table',
	props: {
		data: Array,
		isBusy: Boolean,
	},
	computed: {
		returnData() {
			return this.data;
		},
		dataLength() {
			return this.data ? this.data.length : 0;
		},
	},
	data() {
		return {
			currentPage: 1,
			perPage: 10,

			formIsBusy: false,

			selectedRecord: {
				date: null,
				number: null,
				index: null,
			},

			fields: [
				{ key: 'date', label: 'Date' },
				{ key: 'number', label: 'Number' },
				{ key: 'actions', label: 'Actions' },
			],
		};
	},
	methods: {
		// Update Modal methods
		showUpdateModal() {
			this.$refs['update-modal'].show();
		},

		hideUpdateModal() {
			this.$refs['update-modal'].hide();
			// Clears values
			this.clearFields();
		},

		// Delete Modal methods
		showDeleteModal() {
			this.$refs['delete-modal'].show();
		},

		hideDeleteModal() {
			this.$refs['delete-modal'].hide();
			// Clears values
			this.clearFields();
		},

		// Helper methods:
		clearFields() {
			this.selectedRecord.date = null;
			this.selectedRecord.number = null;
			this.selectedRecord.index = null;
		},

		setUpdate(date, number, rowIndex) {
			this.showUpdateModal();
			this.selectedRecord.date = date;
			this.selectedRecord.number = number;
			this.selectedRecord.index = rowIndex;
		},

		setRemove(date, number, rowIndex) {
			this.showDeleteModal();
			this.selectedRecord.date = date;
			this.selectedRecord.number = number;
			this.selectedRecord.index = rowIndex;
		},

		// Sends update request to the backend
		async sendUpdateRequest(e) {
			e.preventDefault();
			this.toggleFormBussy();
			try {
				const response = await Services.updateData({
					apiEndPoint: this.$parent.apiEndPoint,
					body: {
						[this.$parent.firstInputName]: this.$parent.cacheFirstInput,
						[this.$parent.secondInputName]: this.$parent.cacheSecondInput,
						TypeOfData: this.$parent.cacheTypeOfData,
						Date: this.selectedRecord.date,
						Number: this.selectedRecord.number,
					},
				});
				// Update the selected row on the table
				this.data[
					this.getTableIndex(this.selectedRecord.index)
				].number = this.selectedRecord.number;
				this.successHandler('Record successfully updated');
			} catch (error) {
				this.errorHandler('Some error occurred. Please try again later');
				console.log(error);
			}
			// Hides the udpate modal
			this.toggleFormBussy();
			this.hideUpdateModal();
		},

		// Sends delete request to the server
		async sendDeleteRequest(e) {
			e.preventDefault();
			this.toggleFormBussy();
			try {
				const response = await Services.deleteData({
					apiEndPoint: this.$parent.apiEndPoint,
					body: {
						[this.$parent.firstInputName]: this.$parent.cacheFirstInput,
						[this.$parent.secondInputName]: this.$parent.cacheSecondInput,
						TypeOfData: this.$parent.cacheTypeOfData,
						Date: this.selectedRecord.date,
					},
				});
				this.successHandler('Record successfully deleted');
				// Delete the selected row on the table
				this.data.splice(this.getTableIndex(this.selectedRecord.index), 1);
				this.$refs.table.refresh();
			} catch (error) {
				this.errorHandler('Some error occurred. Please try again later');
				console.log(error);
			}
			// Hides the delete modal
			this.toggleFormBussy();
			this.hideDeleteModal();
		},
		// Gets the appropiate table index for a selected record
		getTableIndex(index) {
			return index + 10 * (this.currentPage - 1);
		},
		toggleFormBussy() {
			this.formIsBusy = !this.formIsBusy;
		},
		errorHandler(message) {
			this.$toast.error(message, {
				position: 'bottom-right',
				timeout: 2268,
			});
		},
		successHandler(message) {
			this.$toast.success(message, {
				position: 'bottom-right',
				timeout: 2268,
			});
		},
	},
};
</script>

<style></style>
