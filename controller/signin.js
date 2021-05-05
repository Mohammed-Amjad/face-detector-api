const responses = require('../constants/responseConstant');
const CryptoJS = require("crypto-js");

const handleSigningIn = (req, res, pgDatabase, bcrypt) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json(responses.emptyEmailResponse);
    } else if (!password) {
        return res.status(400).json(responses.emptyPasswordResponse);
    }

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(password, 'secretKey');
    var secret = bytes.toString(CryptoJS.enc.Utf8);

    try {
        pgDatabase
            .select('*')
            .from('login')
            .where({ email: email })
            .then(data => {
                if (data.length > 0) {
                    bcrypt.compare(secret, data[0].secret, function (err, result) {
                        if (result) {
                            responses.successResponse.data = { email: data[0].email };
                            return res.status(200).json(responses.successResponse);
                        } else {
                            return res.status(401).json(responses.unAuthorisedResponse);
                        }
                    });
                } else {
                    return res.status(404).json(responses.notFoundResponse);
                }
            })
            .catch(err => {
                return res.status(500).json({ error: err.code });
            });
    } catch (error) {
        res.status(500).json('Internal error');
    }
}

module.exports = {
    handleSigningIn: handleSigningIn
};