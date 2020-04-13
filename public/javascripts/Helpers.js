// clean URL before submitting a form ... not best practices
function cleanURL(){
    window.history.pushState({}, document.title, '/');
}