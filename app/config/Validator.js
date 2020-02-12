const _ = require("lodash");
const Joi = require("joi");

const schemas = require("./validateSchemas");
const logger = require("./logger");

class Validator {
    constructor() {
        this.supportedMethods = ["post", "put", "delete"];
        this.validationOptions = {
            abortEarly : true,
            stripUnknown: true
        };
    }

    validateMiddlewares(req, res, next) {
        const route = req.url;
        const method = req.method.toLowerCase();

        console.log(route, schemas.has(route));

        if (_.includes(this.supportedMethods, method) && schemas.has(route)) {
            const specialSchema = schemas.get(route);
            console.log("Hi");

            if (specialSchema) {
                return Joi.validate(req.body, specialSchema, this.validationOptions, (err, data) => {
                    if (err) {
                        const errorMessage = {
                            status: 'failed',
                            error: {
                                original: err._object,
            
                                details: _.map(err.details, ({message, type}) => ({
                                    message: message.replace(/['"]/g, ''),
                                    type
                                }))
                            }
                        };

                        logger.error(err.message, {
                            method: req.method,
                            ip: req.ip,
                            url: req.url
                        });
                        res.status(422).json(errorMessage);
                    }

                    req.body = data;
                    next();
                })

            }
        }

        next();
    };
}

module.exports = Validator;
