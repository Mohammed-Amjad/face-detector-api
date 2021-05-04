const successResponse = {
    responseCode: '00',
    responseMessage: 'success',
    data: {}
}

const createdResponse = {
    responseCode: '01',
    responseMessage: 'user created',
    data: {}
}

const notFoundResponse = {
    responseCode: '02',
    responseMessage: 'user does not exist'
}

const unAuthorisedResponse = {
    responseCode: '03',
    responseMessage: 'wrong password'
}

const updatedResponse = {
    responseCode: '04',
    responseMessage: 'user updated',
    data: {}
}

const duplicateResponse = {
    responseCode: '05',
    responseMessage: 'user already exist'
}

const emptyUserNameResponse = {
    responseCode: '06',
    responseMessage: 'user name cannot be empty'
}

const emptyEmailResponse = {
    responseCode: '07',
    responseMessage: 'email cannot be empty'
}

const emptyPasswordResponse = {
    responseCode: '08',
    responseMessage: 'password cannot be empty'
}

const emptyIdResponse = {
    responseCode: '09',
    responseMessage: 'id cannot be empty'
}

const emptyImageResponse = {
    responseCode: '10',
    responseMessage: 'image cannot be empty'
}

const apiServerDownResponse = {
    responseCode: '11',
    responseMessage: 'api server down'
}

module.exports = {
    successResponse: successResponse,
    createdResponse: createdResponse,
    notFoundResponse: notFoundResponse,
    unAuthorisedResponse: unAuthorisedResponse,
    updatedResponse: updatedResponse,
    duplicateResponse: duplicateResponse,
    emptyUserNameResponse: emptyUserNameResponse,
    emptyEmailResponse: emptyEmailResponse,
    emptyPasswordResponse: emptyPasswordResponse,
    emptyIdResponse: emptyIdResponse,
    emptyImageResponse: emptyImageResponse,
    apiServerDownResponse: apiServerDownResponse
}