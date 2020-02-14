require('dotenv').config();

const dbConfig = {
    connectUrl: process.env.CONNECT_URL,
    connectionOptions: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
};

module.exports = dbConfig;
