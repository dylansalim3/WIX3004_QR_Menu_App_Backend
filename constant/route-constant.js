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

//Report
exports.SUBMIT_REPORT = '/submit-report';
exports.PROCESS_REPORT = '/process-report';

//Notifiaction
exports.READ_NOTIFICATION = '/read-notification';
exports.GET_ALL_NOTIFICATIONS = '/get-all-notifications';
exports.DELETE_NOTIFICATION = '/delete-notification';
exports.DELETE_ALL_NOTIFICATIONS = 'delete-all-notifications';
exports.UPDATE_ITEM = '/update-item';

//rating
exports.CREATE_RATING = '/create-rating';
exports.GET_ALL_RATING_BY_STORE_ID = '/get-all-rating-by-store-id';
