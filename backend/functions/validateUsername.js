const cleanUsernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

function validateUsername(username) {

    if(!username) {
        throw `Username is required.`
    }

    if(typeof username !== "string") {
        throw `Username must be a string.`
    
    }

    return cleanUsernameRegex.test(username)
}

module.exports = validateUsername;