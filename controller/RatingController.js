const RatingRepository = require('./../repository/RatingRepository');

exports.createRating = (req, res) => {
    const { store_id, rating, desc, user_id } = req.body;

    const ratingData = { store_id, rating, desc, user_id };

    RatingRepository.createRating(ratingData).then(ratingResult => {
        res.json({ msg: "Rating have been added", data: ratingResult });
    }).catch(err => {
        res.status(500).json({ msg: "Error in adding rating" });
    })
}

exports.getAllRatingByStoreId = (req, res) => {
    const { store_id } = req.body;
    RatingRepository.getRatingsByStoreId(store_id).then(ratingResults => {
        const data = ratingResults.map(ratingResult => {
            const { id, store_id, rating, desc, user_id, created } = ratingResult;
            const result = { id, store_id, rating, desc, user_id, created };
            if (ratingResult.user != undefined) {
                console.log(ratingResult.user.id);
                result['username'] = ratingResult.user.first_name;
            }
            return result;
        });
        res.json({ msg: "success", data });
    }).catch(err => {
        console.log(err.toString());
        res.status(500).json({ msg: "Error in retreiving rating" });
    })
}