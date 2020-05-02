import API from './API';

export default {
	// calls search endpoint of any of the routes in the backend server
	searchData(payload) {
		console.log(payload);
		return API()
			.get(`${payload.apiEndPoint}/search`, {
				params: payload.params,
			})
			.then((response) => response)
			.catch((error) => error.status);
	},
	// calls insert endpoint of any of the routes in the backend server
	insertData(payload) {
		console.log(payload);
		return API()
			.post(`${payload.apiEndPoint}/insert`, payload.body)
			.then((response) => response)
			.catch((error) => error.status);
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
		//Implements create request to server
		return API()
			.post(`${payload.apiEndPoint}/delete`, payload.body)
			.then((response) => response)
			.catch((error) => error.status);
	},

	// Sends any request to the Analytics router in the backend.
	// Caller of the function must provide the API endpoint in the payload parameter object
	// EX for the Compare By Gender feature:
	//  payload : {
	//		apiEndPoint: '/compareGender',
	//		params: {
	//			Country: 'United States',
	//			TypeOfData: '1'
	//		}
	//	}

	// Please look at the artifacts document, specifically at the Backend Todo List section, to see the naming conventions
	// for the variables that the backend is expecting that client to sent for your features

	// Note: this function returns a promise, so the caller of this function must be asynchronous.
	GetAnalyticsData(payload) {
		return API()
			.get(`AnalyticsData${payload.apiEndPoint}`, {
				params: payload.params,
			})
			.then((response) => response)
			.catch((error) => error.status);
	},
};
