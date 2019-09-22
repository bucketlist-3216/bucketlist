const listedKeys = require('../../config/settings.json').listedKeys;

const validateRequest = function(req, res, next) {
    let isValid = false;
    let errorCode = 403;
    let errorMessage = 'Invalid API_KEY';

    let challenge = req.get('API_KEY');

    if (!listedKeys.includes(challenge)) {
        let response = {
            'isValid': isValid,
            'error': {
                'code': errorCode,
                'message': errorMessage
            }
        };

        if(response.error) {
            res.statusCode = response.error.code;
            res.end(response.error.message);
        }
    }
    next();
};

module.exports = validateRequest;