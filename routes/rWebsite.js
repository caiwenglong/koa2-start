const Router = require('@koa/router')

const router = new Router()

const { cGetAllWebsite } = require('../controllers/cWebsite')
router.prefix('/website')

/**
 * 获取所有网站信息
 */
router.get('/all', async (ctx, next) => {
    console.log(1)
    let result = await cGetAllWebsite();
    ctx.body = result
})

module.exports = router