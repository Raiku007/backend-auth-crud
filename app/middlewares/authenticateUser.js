const jwt = require('jsonwebtoken')
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers['authorization'] 
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = tokenData.id
        next()
    } catch (e) {
        res.json(e)
    }
}

module.exports = authenticateUser
