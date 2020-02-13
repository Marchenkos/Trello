const _ = require("lodash");
const Joi = require("joi");

const schemas = require("./validateSchemas");
const logger = require("./logger");

class Validator {
    constructor(app) {
        this.app = app;
        this.supportedMethods = ["post", "put", "delete"];
        this.validationOptions = {
            abortEarly : true,
            stripUnknown: true
        };
    }

    getValidateSchema(req, res, next) {
        const route = req.url;
        const method = req.method.toLowerCase();

        if (_.includes(this.supportedMethods, method)) {
            schemas.forEach((value, key, map) => {
                if (route.match(key)) {
                    return Joi.validate(req.body, value, this.validationOptions, (err, data) => {
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
                    });
                }
            })
        }

        next();
    }
}

module.exports = Validator;
