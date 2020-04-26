import API from './API';

export default {
	// calls search endpoint of any of the routes in the backend server
	searchData(payload) {
		// return API()
		// 	.get(`${payload.apiEndPoint}/search`, {
		// 		params: payload.params,
		// 	})
		// 	.then((response) => response)
		// 	.catch((error) => error.status);
		console.log(payload);
		return {
			success: false,
			ReportingDate: '01/20/20',
			Country: 'Peru',
			State: 'Lima',
			Age: 10,
			Gender: 1,
			TypeOfCase: 1,
		};
	},
	// calls insert endpoint of any of the routes in the backend server
	insertData(payload) {
		console.log(payload);
		return {
			success: true,
			ReportingDate: '01/20/20',
			Country: 'Peru',
			State: 'Lima',
			Age: 10,
			Gender: 1,
			TypeOfCase: 1,
		};
		// return API()
		// 	.post(`${payload.apiEndPoint}/insert`, payload.body)
		// 	.then((response) => response)
		// 	.catch((error) => error.status);
	},
	// calls update endpoint of any of the routes in the backend server
	updateData(payload) {
		console.log(payload);
		// Implements create request to server
		return API()
			.post(`${payload.apiEndPoint}/update`, payload.body)
			.then((response) => response)
			.catch((error) => error.status);
	},
	// calls delete endpoint of any of the routes in the backend server
	deleteData(payload) {
		console.log(payload);
		// return {
		// 	success: true,
		// };
		// Implements create request to server
		// return API()
		// 	.post(`${payload.apiEndPoint}/delete`, payload.body)
		// 	.then((response) => response)
		// 	.catch((error) => error.status);
	},
};
