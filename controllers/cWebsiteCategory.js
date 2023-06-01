const { getFirstWebsiteCategory, sGetSingleWebsiteCategory, serviceAddCategory, sBulkAddCategory } = require("../service/sWebsiteCategory")
const {
  SuccessModel,
  FailedModel
} = require('../model/ResModel')

const _ = require('lodash');

/**
* @description 判断用户名是否存在
* @param { String } userName
*/
const isExist = async categoryName => {
  if (!categoryName) {
    return new FailedModel(paramsError)
  }
  // 调用 service 层获取数据
  const categoryInfo = await sGetSingleWebsiteCategory(categoryName)
  if (categoryInfo) {
    // 已存在
    return new SuccessModel({
      data: {
        categoryName: categoryInfo.categoryName
      },
      message: '用户名已存在'
    })
  } else {
    // 不存在
    return new FailedModel(userNameNotExist)
  }
  // 统一返回格式
}

const cAddCategory = async (newCategory) => {
  const category = await sGetSingleWebsiteCategory(newCategory.name);
  if (category) {
    // 用户名已存在
    return new FailedModel({
      errno: 40001,
      message: '分类名已存在'
    })
  }
  try {
    const category = await serviceAddCategory(newCategory)
    if (!category) {
        return new FailedModel({
        errno: 40002,
        message: '分类创建失败'
      })
    }
    return new SuccessModel({ data: category, message: '分类创建成功' })
  } catch(ex) {
   return new FailedModel({
      errno: ex.parent?.errno,
      message: ex.message
    })
  }
}

const cBulkddCategory = async (categories) => {
  try {
    categories = _.uniqBy(categories, 'name')
    const length = await sBulkAddCategory(categories)
    return new SuccessModel({ message: '分类批量添加成功，总条数为：' + length })
  } catch(ex) {
   return new FailedModel({
      errno: ex.parent?.errno,
      message: ex.message
    })
  }
}

const cGetFirstWebsiteCategory = async () => {
    try {
        const websiteCategoryList = await getFirstWebsiteCategory();
        return new SuccessModel({ 
            message: '网站获取成功',
            data: websiteCategoryList
        })
    } catch (error) {
        return new FailedModel({
            message: '网站获取失败'
        })
    }
}

module.exports = {
    cGetFirstWebsiteCategory,
    isExist,
    cAddCategory,
    cBulkddCategory
}