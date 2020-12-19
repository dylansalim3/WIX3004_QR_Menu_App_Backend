const multer = require('multer');
const path = require("path");

const storeItemImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/store-item-images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(' ', '-'));
    }
})

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/*') {
        cb(null, true);
    } else {
        //rejects storing a file
        cb(null, false);
    }
}

exports.uploadStoreItemImage = multer({
    storage: storeItemImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: imageFileFilter
});

const profilePictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profile-picture/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname.replace(' ', '-'));
    }
})

exports.uploadProfilePicture = multer({
    storage: profilePictureStorage,
    limits: {fileSize: 1024 * 1024 * 10},
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        if (file.mimetype !== 'image/jpeg' || extension !== '.jpeg') {
            req.multer_error = "only jpeg is allowed";
            return callback(new Error());
        }
        callback(null, true);
    }
});

const SQLStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './migrations/')
    },
    filename: function (req, file, cb) {
        cb(null, 'dump.sql');
    }
});

const SQLMimeTypes = ['application/x-sql','application/sql' ,'text/sql', 'text/x-sql', 'text/plain'];

const SQLFilter = (req, file, cb) => {
    if (SQLMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        //rejects storing a file
        cb(null, false);
    }
}

exports.uploadSQLFile = multer({
    storage: SQLStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    // fileFilter: SQLFilter
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const CsvFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        //rejects storing a file
        cb(null, false);
    }
}

exports.uploadCsvFile = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: CsvFilter
});