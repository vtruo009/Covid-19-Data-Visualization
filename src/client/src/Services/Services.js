import API from './API'

export default{
    // calls search endpoint of any of the routes in the backend server
    searchData(payload){
        return API().get(   
            `${payload.apiEndPoint}/search`,
            {
                params : payload.params
            }
        )
        .then(response => response)
        .catch(error => error.status);
    },
}