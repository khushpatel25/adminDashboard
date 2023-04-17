const mongoose = require('mongoose');

const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getAdmins = async (req, res) => {

    try {

        const admins = await User.find({ role: 'admin' }).select('-password');

        res.status(200).json({
            success: true,
            admins
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}

const getPerformance = async (req, res) => {

    try {

        const { id } = req.params;

        const userWithStats = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                }
            }, {
                $lookup: {
                    from: 'affiliatestats',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'affiliateStats'
                }
            }, {
                $unwind: '$affiliateStats'
            }
        ]);

        const salesTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            }
            ))

        const filteredTransactions = salesTransactions.filter(transaction => transaction !== null);

        res.status(200).json({
            success: true,
            user: userWithStats[0],
            sales: filteredTransactions
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = { getAdmins, getPerformance }