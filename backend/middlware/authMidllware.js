const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    let token

    // CHECKING FOR BEARER TOKEN
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // GETTING TOKEN FROM THE HEADER
            // token being split and gotten from array[1] = token
            token = req.headers.authorization.split(' ')[1]
            // VERIFYING TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // GETTING THE USER FROM (TOKEN)
            req.user = await User.findById(decoded.id).select('-password')

            //ensuring the next piece of middleware is called
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorised')
    }
})

module.exports = { protect }