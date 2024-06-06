const massageErrors = (validationError) => {
    let errorMsg = [];

    validationError.forEach(error => {
        errorMsg.push(error.message.replace(/\"/g, "'"));
    });

    return errorMsg.join(', ');
};

const removeInvalidData = (data, fields) => {
    let obj = {};
    for (let d in data) {
        if (fields.includes(d)) {
            obj[d] = data[d];
        }
    }
    return obj;
}

module.exports = {
    massageErrors,
    removeInvalidData
}