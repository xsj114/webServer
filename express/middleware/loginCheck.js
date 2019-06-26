const {ErrModel} = require('../model/resModel')

module.exports = (req,res,next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(new ErrModel('未登录'))
}
