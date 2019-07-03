const router = require('koa-router')()
router.prefix('/api/user')
router.get('/session-test', async function (ctx, next) {
   if (ctx.session.viewCount == null) {
     ctx.session.viewCount = 0
   }
   ctx.session.viewCount++

   ctx.body ={
     errno: 0,
     viewCount: ctx.session.viewCount
   }
})

module.exports = router
