const OverallStat = require('../models/OverallStat');

const getOverView = async (req, res) => {

    try {

        const overallStats = await OverallStat.find();

        res.status(200).json({
            success: true,  
            overallStats: overallStats[0]
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = { getOverView };