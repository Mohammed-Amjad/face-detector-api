const responses = require('../constants/responseConstant');

const handleRegistration = (req, res, pgDatabase, bcrypt) => {

    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json(responses.emptyUserNameResponse);
    } else if (!email) {
        return res.status(400).json(responses.emptyEmailResponse);
    } else if (!password) {
        return res.status(400).json(responses.emptyPasswordResponse);
    }

    try {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                pgDatabase.transaction(trx => {
                    trx('login')
                        .returning('email')
                        .insert({
                            email: email,
                            secret: hash
                        })
                        .then(function (emailData) {
                            trx('users').insert({
                                email: emailData[0],
                                name: name,
                                joined: new Date()
                            })
                                .returning('*')
                                .then(function (data) {
                                    responses.createdResponse.data = data[0];
                                    return res.status(200).json(responses.createdResponse);
                                })
                                .then(trx.commit)
                                .catch((err) => {
                                    trx.rollback();
                                    if (err.code == '23505') {
                                        return res.status(409).json(responses.duplicateResponse)
                                    } else {
                                        return res.status(500).json({ error: err.code });
                                    }
                                })
                        })
                        .catch((err) => {
                            trx.rollback();
                            if (err.code == '23505') {
                                return res.status(409).json(responses.duplicateResponse)
                            } else {
                                return res.status(500).json({ error: err.code });
                            }
                        })
                })
            });
        });
    } catch (err) {
        res.status(500).json('Internal error');
    }
}

module.exports = {
    handleRegistration: handleRegistration
};