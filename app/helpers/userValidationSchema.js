// userSchema - username, email, password

const usersnameSchema = {
    notEmpty: {
        errorMessage: 'username is required'
    },
    isLength: {
        options: { min: 3 },
        errorMessage: 'username should be minimum 3 characters'
    }
}

const emailSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: 'email format is invalid'
    }
}

const passwordSchema = {
    notEmpty: {
        errorMessage: 'password is required'
    },
    isLength: {
        options: { min: 8, max: 128 },
        errorMessage: 'password should be between 8 - 128 characters long'
    }
}

const userRegistrationSchema = {
    username: usersnameSchema,
    email: emailSchema,
    password: passwordSchema
}

const userLoginSchema = {
    email: emailSchema,
    password: passwordSchema
}

// const userRegistrationSchema = {
//     username: {
//         isLength: {
//             options: { min: 3 },
//             errorMessage: 'username should be minimum 3 characters'
//         }
//     },
//     email: {
//         isEmail: {
//             errorMessage: 'email format is invalid'
//         }
//     },
//     password: {
//         isLength: {
//             options: { min: 8, max: 128 },
//             errorMessage: 'password should be between 8 - 128 characters long'
//         }
//     }
// }

// const userLoginSchema = {
//     email: {
//         isEmail: {
//             errorMessage: 'email format is invalid'
//         }
//     },
//     password: {
//         isLength: {
//             options: { min: 8, max: 128 },
//             errorMessage: 'password should be between 8 - 128 characters long'
//         }
//     }
// }
module.exports = { userRegistrationSchema, userLoginSchema }