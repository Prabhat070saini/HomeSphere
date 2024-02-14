


exports.errorshandler = (message, statuscode) => {
    const error = new Error();
    error.statuscode = statuscode;
    error.message = message;
    return error;
}
// export default errorshandler;