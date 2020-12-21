const express = require('express');
const users = express.Router();
const {REGISTER_USER, LOGIN, COMPLETE_REGISTRATION, UPDATE_PROFILE, UPDATE_FCM, UPDATE_ROLE, UPDATE_PICTURE, GET_PICTURE} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const UserController = require("../controller/UserController");
const {verifyToken} = require("../utils/verify.util");

users.post('/profile/:id', UserController.getUserById);

users.post(UPDATE_PROFILE, verifyToken, UserController.updateUserProfile);

users.post(REGISTER_USER, UserController.registerUser);

users.post(LOGIN, UserController.login);

users.get(COMPLETE_REGISTRATION+'/:vh', UserController.completeRegistration);

users.post('/get-user-by-verification-hash', UserController.getUserByVerificationHash);

users.post('/password-recovery', UserController.sendForgetPasswordEmail);

users.post('/reset-password', UserController.resetPassword);

users.post(UPDATE_FCM, UserController.updateFCM); //TODO: add verify token

users.post(UPDATE_ROLE, verifyToken, UserController.updateRole);

users.post(UPDATE_PICTURE, verifyToken, Mutler.uploadProfilePicture.single('img'), UserController.updatePicture);

users.use(UPDATE_PICTURE, UserController.updatePictureError);

users.post(GET_PICTURE, UserController.getPictureUrl);

module.exports = users;
