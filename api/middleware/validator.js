const {check, validationResult } = require('express-validator');

exports.loginValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('email').isLength({min:6}).withMessage('Invalid passowrd'),
]

exports.validatorResult = (req,res,next)=>{
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors){
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
    }

    next();
}