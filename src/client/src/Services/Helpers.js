import palette from 'google-palette';

const convertDateFromServer = (inputDate) => {
	let dateValues = inputDate.split('/');
	let month = parseInt(dateValues[0]);
	let date = parseInt(dateValues[1]);
	let year = parseInt(dateValues[2]);
	return year + '-' + month + '-' + date;
};

const convertDateFromClient = (inputDate) => {
	let dateValues = inputDate.split('-');
	let year = parseInt(dateValues[0]);
	let month = parseInt(dateValues[1]);
	let date = parseInt(dateValues[2]);
	return month + '/' + date + '/' + year;
};

const getHexColors = (data) => {
	return palette(['tol', 'qualitative'], data.length).map((hex) => '#' + hex);
};

export default { convertDateFromServer, convertDateFromClient, getHexColors };
