const _ = require("lodash");
const Joi = require("joi");

const schemas = require("./validateSchemas");
const logger = require("./logger");

class Validator {
    constructor() {
        this.supportedMethods = ["post", "put"];
        this.validationOptions = {
            abortEarly : true,
            stripUnknown: true
        };
    }

    validateMiddlewares(req, res, next) {
        const route = req.url;
        const method = req.method.toLowerCase();

        if (_.includes(this.supportedMethods, method) && _.has(schemas, route)) {
            const specialSchema = _.get(schemas, route);

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

                        // logger.error(`422 - message: ${err.message} - ${req.url} - ${req.method} - ${req.ip}`);
                        logger.error({
                            level: 'error',
                            message: err.message
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
