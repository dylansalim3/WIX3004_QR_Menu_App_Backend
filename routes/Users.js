const express = require('express');
const users = express.Router();
const {REGISTER_USER,LOGIN, COMPLETE_REGISTRATION} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const UserController = require("../controller/UserController");

users.post('/profile/:id', UserController.getUserById);

users.post('/update-profile', UserController.updateUserProfile);

users.post(REGISTER_USER, UserController.registerUser);

users.post(LOGIN, UserController.loginWithRole);

users.get(COMPLETE_REGISTRATION+'/:vh', UserController.completeRegistration);

users.post('/get-user-by-verification-hash', UserController.getUserByVerificationHash);

users.post('/password-recovery', UserController.sendForgetPasswordEmail);

users.post('/reset-password', UserController.resetPassword);


module.exports = users;
