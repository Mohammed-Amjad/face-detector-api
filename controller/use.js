const responses = require('../constants/responseConstant');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7a4027fc12d2444097d3ff07dfdd6cae'
});

const handleUsage = (req, res, pgDatabase) => {
    const { id, imageUrl } = req.body;

    if (!id) {
        return res.status(400).json(responses.emptyIdResponse);
    }
    if (!imageUrl) {
        return res.status(400).json(responses.emptyImageResponse);
    }

    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            imageUrl
        ).then((response) => {

            pgDatabase('users')
                .where('id', '=', id)
                .increment('entries', 1)
                .returning('*')
                .then(data => {
                    if (data.length > 0) {
                        data[0].apiResponse = response;
                        responses.updatedResponse.data = data[0];
                        return res.status(200).json(responses.updatedResponse);
                    } else {
                        return res.status(404).json(responses.notFoundResponse);
                    }
                })
                .catch(err => {
                    return res.status(500).json({ error: err.code });
                })
        })
        .catch((err) => {
            console.log('Clarifai api error', err);
            return res.status(500).json(responses.apiServerDownResponse);
        });
}

module.exports = {
    handleUsage: handleUsage
};