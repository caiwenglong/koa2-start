const Router = require('@koa/router')

const router = new Router()

const { cGetFirstWebsiteCategory, cAddCategory, cBulkddCategory } = require('../controllers/cWebsiteCategory')
router.prefix('/website/category')

/**
 * 获取所有网站信息
 */
router.get('/first', async (ctx, next) => {
    console.log(1)
    let result = await cGetFirstWebsiteCategory();
    ctx.body = result
})


/**
 * 添加网站分类
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

/**
 * 批量添加网站分类
 */
router.post('/batch-add', async (ctx, next) => {
    const { categories } = ctx.request.body

    const res = await cBulkddCategory(JSON.parse(categories));
    ctx.body = res
})





module.exports = router