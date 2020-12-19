const express = require('express');
const users = express.Router();
const {REGISTER_USER,LOGIN, COMPLETE_REGISTRATION} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const UserController = require("../controller/UserController");
const {verifyToken} = require("../utils/verify.util");

users.post('/profile/:id', UserController.getUserById);

users.post('/update-profile', verifyToken, UserController.updateUserProfile);

users.post(REGISTER_USER, UserController.registerUser);

users.post(LOGIN, UserController.login);

users.get(COMPLETE_REGISTRATION+'/:vh', UserController.completeRegistration);

users.post('/get-user-by-verification-hash', UserController.getUserByVerificationHash);

users.post('/password-recovery', UserController.sendForgetPasswordEmail);

users.post('/reset-password', UserController.resetPassword);

users.post('/update-fcm', UserController.updateFCM); //TODO: add verify token

users.post('/update-role', verifyToken, UserController.updateRole);

users.post('/update-picture', verifyToken, Mutler.uploadProfilePicture.single('img'), UserController.updatePicture);
users.use('/update-picture', UserController.updatePictureError);

users.post('/get-picture', UserController.getPictureUrl);

module.exports = users;
