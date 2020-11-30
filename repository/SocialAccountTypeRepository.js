const SocialAccountType = require('./../models/SocialAccountType');

exports.createSocialAccountType = (name, imgLink) => {
    return SocialAccountType.findOne({where: {name}}).then(result => {
        if (result === null) {
            return SocialAccountType.create({name, social_img: imgLink});
        }
        throw Error("Social Type Exist");
    });
}