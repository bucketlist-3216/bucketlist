const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3')
const Compute = require('../../compute');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js');
const {
    UserQueryModel,
    TripFriendQueryModel
} = require('../query-models')
const AWS = require('aws-sdk');

const userQueryModel = new UserQueryModel();
const tripFriendQueryModel = new TripFriendQueryModel();

// User API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

//AWS configuration
AWS.config.update({
    accessKeyId: settings.aws.accessKeyId,
    secretAccessKey: settings.aws.secretAccessKey,
    region: 'ap-southeast-1'
});
const s3 = new AWS.S3();
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'place-image',
      acl: 'public-read',
      key: function (req, file, cb) {
        let userId = req.params.userId;
        let keyName = userId.toString() + '_' + file.fieldname.split('-')[0];
        console.log("Using key: " + keyName);
        cb(null, keyName);
      }
    })
  });

/**************** User end points ****************/

router.post('/', addUserHandler);
router.get('/:userId', getUserHandler);
router.put('/:userId', upload.fields([{ name: 'cover-pic-file', maxCount: 1 }, { name: 'profile-pic-file', maxCount: 1 }]), updateUserHandler);
router.delete('/:userId', deleteUserHandler);

/*********** Implement Request Handlers **********/

function addUserHandler(req, res) {
    const insertion = userQueryModel.addUser(req.body.user);

    insertion.then(function (insertionResponse) {
        res.end(JSON.stringify({"insertedId": insertionResponse}));
    });
}

function getUserHandler(req, res) {
    const userProfile = userQueryModel.getUser({user_id: req.params.userId});

    userProfile
        .then(function (response) {
            res.json(response);
        })
        .catch(function (err) {
            res.status(500).end(`Could not get user because of the following error: ${err.message}`);
            console.log(err);
        });
}

// TODO: Implement this operation
function updateUserHandler(req, res) {
    let textFields = req.body;
    let fileFields = req.files;
    console.log(textFields);
    console.log(fileFields);
    let updatedData = textFields;
    if ('profile-pic-file' in fileFields) {
        updatedData['profile_photo'] = fileFields['profile-pic-file'][0]['location'];
    }
    if ('cover-pic-file' in fileFields) {
        updatedData['cover_photo'] = fileFields['cover-pic-file'][0]['location'];
    }
    return userQueryModel.updateUser({user_id: req.params.userId}, updatedData).then(() => res.end())
                                                                               .catch((err) =>{
                                                                                    console.log(err);
                                                                                    res.status(500).end("Could not update user");
                                                                               });
}

// TODO: Implement this operation
function deleteUserHandler(req, res) {
    res.end();
}

module.exports = router;
