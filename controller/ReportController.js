const Repo = require('../repository/ReportRepository');
const {banStore} = require('../repository/StoreRepository');

exports.submitReport = async (req, res) => {
    try {
        await Repo.newReport({
            title: req.body.title,
            desc: req.body.desc,
            email: req.body.email,
            store_id: req.body.store_id,
            user_id: req.body.user_id
        });
        res.status(200).json({msg: "report submitted"});
    } catch (err) {
        console.error(err);
        res.status(500).json({err: err});
    }
}

exports.processReport = async (req, res) => {
    const reportId = req.body.id;
    const storeId = req.body.store_id;
    const type = req.body.type;

    if (!storeId) {
        res.status(400).json({err: "store id not provided"});
        return;
    }

    try {
        if (type === 'accept') {
            let prom = await Repo.acceptReport(reportId);
            if (prom === 'processed') {
                res.status(400).json({err: "report already processed"});
            }
            await banStore(storeId);
            res.status(200).json({msg: "report accepted"});
            return;
        }

        if (type === 'reject') {
            let prom = await Repo.rejectReport(reportId);
            if (prom === 'processed') {
                res.status(400).json({msg: "report already processed"});
            }
            res.status(200).json({err: "report rejected"});
            return;
        }

        console.error("unknown or empty type");
        res.status(400).json({err: "unknown or empty type"});

    } catch (err) {
        console.error(err);
        res.status(500).json({err: err});
    }
}
