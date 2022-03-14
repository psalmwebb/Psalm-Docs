import * as Joi from "joi";


export const UserSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(6).label('Password'),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).label("'Confirm password'")
})