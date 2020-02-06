const lodash = require("lodash");
const tokenList = require("../../db/refreshTokens");

async function add(token) {
    tokenList.push(token);

    console.log(tokenList);
}

async function remove(value) {
    const token = lodash.find( tokenList, value);

    if (token) {
        lodash.dropWhile(tokenList, token);
    }
}

async function find(value) {
    return lodash.find( tokenList, value);
}

module.exports = {
    add,
    remove,
    find
};
