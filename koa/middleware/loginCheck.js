const {ErrModel} = require('../model/resModel')

module.exports = asynv (ctx,next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrModel('未登录')
}
