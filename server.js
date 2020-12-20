const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));
app.use(bodyParser.urlencoded({ extended: false }));


if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

// Routes
const { UPLOADS, USERS, ROLES, STORES, ITEM_CATEGORIES, ITEMS, FAVORITE, REPORTS, NOTIFICATIONS, RATINGS } = require('./constant/route-constant');
const Users = require('./routes/Users');
const Roles = require('./routes/Roles');
const Stores = require('./routes/Stores');
const ItemCategories = require('./routes/ItemCategories');
const Items = require('./routes/Items');
const Favorite = require('./routes/Favorite');
const Reports = require('./routes/Reports');
const Notifications = require('./routes/Notifications');
const Ratings = require('./routes/Ratings');

app.use(UPLOADS, express.static('uploads'));
app.use(USERS, Users);
app.use(ROLES, Roles);
app.use(STORES, Stores);
app.use(ITEM_CATEGORIES, ItemCategories);
app.use(ITEMS, Items);
app.use(FAVORITE, Favorite);
app.use(REPORTS, Reports);
app.use(NOTIFICATIONS, Notifications);
app.use(RATINGS, Ratings);


// Model Associations
const user = require('./models/User');
const role = require('./models/Role');
const report = require('./models/Report');
const notification = require('./models/Notification');
const favoriteMerchant = require('./models/FavoriteMerchant');
const recentlyViewedMerchant = require('./models/RecentlyViewedMerchant');
const store = require('./models/Store');
const storeCategory = require('./models/StoreCategory');
const socialAccount = require('./models/SocialAccount');
const socialAccountType = require('./models/SocialAccountType');
const itemCategory = require('./models/ItemCategory');
const item = require('./models/Item');
const promotion = require('./models/Promotion');
const rating = require('./models/Rating');
const db = require('./database/db');

user.belongsTo(role, { foreignKey: 'role_id' });
role.hasOne(user, { foreignKey: 'role_id' });

user.hasMany(report, { foreignKey: 'user_id' });
report.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(notification, { foreignKey: 'user_id'});
notification.belongsTo(user, { foreignKey: 'user_id'});

user.hasMany(favoriteMerchant, { as: 'customer', foreignKey: 'user_id' });
favoriteMerchant.belongsTo(user, { as: 'customer', foreignKey: 'user_id' });

user.hasMany(favoriteMerchant, { as: 'merchant', foreignKey: 'merchant_id' });
favoriteMerchant.belongsTo(user, { as: 'merchant', foreignKey: 'merchant_id' });

user.hasMany(recentlyViewedMerchant, { as: 'viewed_customer', foreignKey: 'user_id' });
recentlyViewedMerchant.belongsTo(user, { as: 'viewed_customer', foreignKey: 'user_id' });

user.hasMany(recentlyViewedMerchant, { as: 'viewed_merchant', foreignKey: 'merchant_id' });
recentlyViewedMerchant.belongsTo(user, { as: 'viewed_merchant', foreignKey: 'merchant_id' });

user.hasOne(store, { foreignKey: 'user_id' });
store.belongsTo(user, { foreignKey: 'user_id' });

store.hasOne(storeCategory, { foreignKey: 'store_id' });
storeCategory.belongsTo(store, { foreignKey: 'store_id' });

store.hasMany(socialAccount, { foreignKey: 'store_id' });
socialAccount.belongsTo(store, { foreignKey: 'store_id' });

socialAccount.belongsTo(socialAccountType, { foreignKey: 'social_account_type_id' });
socialAccountType.hasOne(socialAccount, { foreignKey: 'social_account_type_id' });

store.hasMany(itemCategory, { foreignKey: 'store_id' });
itemCategory.belongsTo(store, { foreignKey: 'store_id' });

itemCategory.hasMany(item, { foreignKey: 'item_category_id', onDelete: 'CASCADE' });
item.belongsTo(itemCategory, { foreignKey: 'item_category_id' });

store.hasMany(promotion, { foreignKey: 'store_id' });
promotion.belongsTo(store, { foreignKey: 'store_id' });

item.hasOne(promotion, { foreignKey: 'item_id' });
promotion.belongsTo(item, { foreignKey: 'item_id' });

store.hasMany(rating, { foreignKey: 'store_id' });
rating.belongsTo(store, { foreignKey: 'store_id' });

user.hasMany(rating, { foreignKey: "user_id" });
rating.belongsTo(user, { foreignKey: "user_id" });

const RoleRepository = require('./repository/RoleRepository');
const SocialAccountTypeRepository = require('./repository/SocialAccountTypeRepository');
const { ALL_ROLES } = require('./constant/constant');
const { DEFAULT_ICONS } = require('./constant/social-icon-constant');


db.sequelize.sync({ logging: false })
    // .then(_=>{
    //
    // })
    .then((_) => {
        return ALL_ROLES.map(role => {
            return RoleRepository.insertRole(role).catch(err => {
                console.log(err.toString());
                return 'OK';
            });
        });
    }).then(_ => {
        return DEFAULT_ICONS.map(icon => {
            return SocialAccountTypeRepository.createSocialAccountType(icon.name, icon.imgLink).catch(err => {
                console.log(err.toString());
                return 'OK';
            })
        })
    });

const server = app.listen(port, () => {
    console.log("Server is running on part: " + port)
});

const { startSocketServer } = require('./utils/socket.util');
startSocketServer(server);
