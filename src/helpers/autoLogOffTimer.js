// logs user off after certain time.
export const logoutUser = () => {
    localStorage.removeItem('token'); //removes authenticationtoken out storage.
    window.location.href = '/login'; //moves user back to the login page
};
