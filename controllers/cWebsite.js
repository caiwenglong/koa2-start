const { getAllWebsite } = require("../service/sWebsite")
const {
  SuccessModel,
  FailedModel
} = require('../model/ResModel')

const cGetAllWebsite = async () => {
    try {
        const websiteList = await getAllWebsite();
        return new SuccessModel({ 
            message: '网站获取成功',
            data: websiteList
        })
    } catch (error) {
        return new FailedModel({
            message: '网站获取失败'
        })
    }
}

module.exports = {
    cGetAllWebsite
}