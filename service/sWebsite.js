const { Website } = require('../db/model/index')

const getAllWebsite = async () => {
    const websiets = await Website.findAll();
    return websiets ? websiets : []
}

module.exports = {
    getAllWebsite
}