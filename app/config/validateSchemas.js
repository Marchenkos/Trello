const Joi = require("joi");

const name = Joi.string().min(3).insensitive().required();
const description = Joi.string().insensitive().default("Not described");
const login = Joi.string().min(3).required();

const boardSchema = Joi.object().keys({
    name,
    description,
    color: Joi.string().default("white"),
    createAt: login
});

const cardSchema = Joi.object().keys({
    name,
    description,
    estimate: Joi.number().max(3).default(1),
    dueDate: Joi.date().min("now").required(),
    labels: Joi.array().items(Joi.string(), Joi.number()).max(10),
    status: Joi.boolean().truthy("Yes").falsy("No").default(false),
    createAt: login
});

const userSchama = Joi.object().keys({
    login,
    password: Joi.string().alphanum().min(8).required()
});

module.exports = {
    "/board": boardSchema,
    "/card": cardSchema,
    "/registration": userSchama,
    "/login": userSchama
};
