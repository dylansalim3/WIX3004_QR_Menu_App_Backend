exports.UPLOADS = '/uploads';
exports.USERS = '/users';
exports.ROLES = '/roles';
exports.STORES = '/stores';
exports.ITEM_CATEGORIES = '/item-categories';
exports.ITEMS = '/items';
exports.FAVORITE = '/favorite';
exports.REPORTS = '/report';
exports.NOTIFICATIONS = '/notification';
exports.RATINGS = '/rating';


// User
exports.REGISTER_USER = '/register-user';
exports.LOGIN = '/login';
exports.COMPLETE_REGISTRATION = '/complete-registration';
exports.UPDATE_PROFILE = '/update-profile';
exports.UPDATE_FCM = '/update-fcm';
exports.UPDATE_ROLE = '/update-role';
exports.UPDATE_PICTURE = '/update-picture';
exports.GET_PICTURE = '/get-picture';

// Role
exports.GET_ALL_ROLES = '/get-all-roles';

//Store
exports.CREATE_STORE = '/create-store';
exports.GET_STORE_BY_USER_ID = '/get-store-by-user-id';
exports.GET_STORE_BY_STORE_ID = '/get-store-by-store-id';
exports.GET_GENERATED_QR_CODE = '/get-generated-qr-code';
exports.UPDATE_STORE = '/update-store';

//Item Category
exports.GET_ITEM_CATEGORY_BY_STORE_ID = '/get-item-category-by-store-id';
exports.GET_LAST_POSITION_BY_STORE_ID = '/get-last-position-by-store-id';
exports.CREATE_ITEM_CATEGORY = '/create-item-category';
exports.DELETE_ITEM_CATEGORY = '/delete-item-category';

//Item
exports.CREATE_ITEM = '/create-item';
exports.GET_ALL_ITEMS_BY_STORE_ID = '/get-all-items-by-store-id';
exports.GET_ITEM_BY_ID = '/get-item-by-id';
exports.UPDATE_RECOMMENDED_STATUS = '/update-recommendation-status';
exports.UPDATE_HIDDEN_STATUS = '/update-hidden-status';
exports.DELETE_ITEM = '/delete-item';
exports.UPDATE_ITEM = '/update-item';

//Report
exports.SUBMIT_REPORT = '/submit-report';
exports.PROCESS_REPORT = '/process-report';

//Notification
exports.READ_NOTIFICATION = '/read-notification';
exports.GET_ALL_NOTIFICATIONS = '/get-all-notifications';
exports.DELETE_ALL_NOTIFICATIONS = 'delete-all-notifications';

//rating
exports.CREATE_RATING = '/create-rating';
exports.GET_ALL_RATING_BY_STORE_ID = '/get-all-rating-by-store-id';
exports.GET_AVERAGE_RATING_BY_STORE_ID = '/get-average-rating-by-store-id';

//favorite & recently viewed
exports.GET_FAV_LIST = "/favorite-list";
exports.GET_RECENTLY_VIEWED_LIST = "/recently-store-list";
exports.ADD_TO_FAV = "/add-to-favorite";
exports.REMOVE_FAV = "/remove-favorite";
exports.ADD_TO_RECENTLY_VIEWED = "/add-to-recently-viewed";
