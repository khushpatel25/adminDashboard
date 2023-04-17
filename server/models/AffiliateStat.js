const mongoose = require('mongoose');

const affiliateStatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: 'Transaction'
    }
});

const AffiliateStat = mongoose.model('AffiliateStat',affiliateStatSchema);

module.exports = AffiliateStat;