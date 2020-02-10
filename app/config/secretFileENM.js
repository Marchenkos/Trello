const MONGO_LOGIN = "marchenkus";
const MONGO_PASSWORD = "qazxcdevbnmk12";
const SECRET_KEY = "VERYSECRETKEY";
const CONNECT_URL = `mongodb+srv://${MONGO_LOGIN}:${MONGO_PASSWORD}@cluster0-ywtyg.mongodb.net/trello`;

module.exports = {
    CONNECT_URL,
    SECRET_KEY
};
