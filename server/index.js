const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const clientRoutes = require('./routes/client');
const generalRoutes = require('./routes/general');
const managementRoutes = require('./routes/management');
const salesRoutes = require('./routes/sales');

const {dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat} = require('./data/index');
const User = require('./models/User');
const Product = require('./models/Product');
const ProductStat = require('./models/ProductStat');
const Transaction = require('./models/Transaction');
const OverallStat = require('./models/OverallStat');
const AffiliateStat = require('./models/AffiliateStat');

const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({}));

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/sales', salesRoutes);
app.use('/management', managementRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Admin Dashboard web</h1>")
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT || 9000, () => console.log(`Listening on port ${process.env.PORT}...`))
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
})
    .catch((e) => console.log(`Error: ${e}`))


