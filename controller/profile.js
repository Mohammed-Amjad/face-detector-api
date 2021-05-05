const responses = require('../constants/responseConstant');

const handleProfile = (req, res, pgDatabase) => {
    const { email } = req.params;
    console.log("profile email", email);

    if (!email) {
        return res.status(400).json(responses.emptyEmailResponse);
    }

    pgDatabase.select('*').from('users').where({
        email: email
    })
        .then(data => {
            if (data.length > 0) {
                responses.successResponse.data = data[0];
                return res.status(200).json(responses.successResponse);
            } else {
                return res.status(404).json(responses.notFoundResponse);
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err.code });
        })
}

module.exports = {
    handleProfile : handleProfile
}