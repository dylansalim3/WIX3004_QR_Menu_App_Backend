const path = require('path');
const {FACEBOOK, INSTAGRAM, WHATSAPP} = require('./constant');

exports.ICON_PATH = path.join(path.dirname(require.main.filename || process.main.filename), 'uploads', 'social_icons');

exports.FACEBOOK_ICON = path.join(this.ICON_PATH, 'facebook.svg');

exports.INSTAGRAM_ICON = path.join(this.ICON_PATH, 'instagram.svg');

exports.WHATSAPP_ICON = path.join(this.ICON_PATH, 'whatsapp.svg');

exports.DEFAULT_ICONS = [
    {name: FACEBOOK, imgLink: this.FACEBOOK_ICON},
    {name: INSTAGRAM, imgLink: this.INSTAGRAM_ICON},
    {name: WHATSAPP, imgLink: this.WHATSAPP_ICON},
];