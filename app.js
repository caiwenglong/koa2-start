const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const { REDIS_CONF } = require('./conf/db')


const userApiRouter = require('./routes/user')
const websiteApiRouter = require('./routes/rWebsite')
const websiteCategoryApiRouter = require('./routes/rWebsiteCategory')

// error handler
onerror(app)

// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text'],
	})
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
	views(__dirname + '/views', {
		extension: 'ejs',
	})
)

// 配置 session
app.keys = [SESSION_SECRET_KEY]
app.use(
	session({
		key: 'ppwq.work.sid', // cookie name, 默认 koa.sid
		prefix: 'ppwq.work.sess:', // redis key 前缀 默认 koa.sess
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 3600000 * 24 * 7, // 一星期过期
		},
		store: redisStore({
			all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
		}),
	})
)

// routes

app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(websiteApiRouter.routes(), websiteApiRouter.allowedMethods())
app.use(websiteCategoryApiRouter.routes(), websiteCategoryApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app