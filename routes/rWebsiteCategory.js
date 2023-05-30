const Router = require('@koa/router')

const router = new Router()

const { cGetAllWebsiteCategory, cAddCategory } = require('../controllers/cWebsiteCategory')
router.prefix('/category')

/**
 * 获取所有网站信息
 */
router.get('/all', async (ctx, next) => {
    console.log(1)
    let result = await cGetAllWebsiteCategory();
    ctx.body = result
})


/**
 * 获取所有网站信息
 */
router.post('/add', async (ctx, next) => {
    const { name, parentID } = ctx.request.body

    // controller
	const res = await cAddCategory({
		name,
		parentID,
	})
	ctx.body = res

    console.log(name, parentID)
})


module.exports = router