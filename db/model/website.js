/**
 * @author cwl
 * @description 用户数据模型
 */
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const seq = require('../seq')
const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER
} = require('../dataTypes')

const Website = seq.define('website', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
    },
    websiteName: {
        type: STRING,
        allowNull: false,
        unique: false, // 唯一性
        comment: '网站名称'
    },
    introduction: {
        type: STRING,
        allowNull: false,
        unique: false, // 唯一性
        comment: '简介'
    },
    details: {
        type: STRING,
        allowNull: false,
        unique: false, // 唯一性
        comment: '详情'
    },
    websiteLink: {
        type: STRING,
        allowNull: false,
        unique: false, // 唯一性
        comment: '网站链接'
    },
    category: {
        type: STRING,
        allowNull: false,
        unique: false, // 唯一性
        comment: '分类'
    },
    categoryID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false, // 唯一性
        comment: '分类ID'
    },
})

module.exports = Website