export default {
	convertDateFromServer(inputDate) {
		let dateValues = inputDate.split('/');
		let month = parseInt(dateValues[0]);
		let date = parseInt(dateValues[1]);
		let year = parseInt(dateValues[2]);
		return year + '-' + month + '-' + date;
	},

	convertDateFromClient(inputDate) {
		let dateValues = inputDate.split('-');
		let year = parseInt(dateValues[0]);
		let month = parseInt(dateValues[1]);
		let date = parseInt(dateValues[2]);
		return month + '/' + date + '/' + year;
	},
};
