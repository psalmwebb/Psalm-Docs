"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var Joi = require("joi");
exports.UserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).label('Password'),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).label("'Confirm password'")
});
//# sourceMappingURL=user.schema.js.map