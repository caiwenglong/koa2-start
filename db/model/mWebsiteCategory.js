/**
 * @author cwl
 * @description 用户数据模型
 */
const { DataTypes, NUMBER } = require("sequelize"); // 导入内置数据类型
const seq = require('../seq')
const {
    STRING,
    DECIMAL,
    TEXT,
    INTEGER
} = require('../dataTypes')

const WebsiteCategory = seq.define('website_category', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
    },
    name: {
        type: STRING,
        allowNull: false,
        unique: true, // 唯一性
        comment: '网站分类名称'
    },
    parentID: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: '网站父级分类'
    },
    order: {
        type: INTEGER,
        allowNull: true,
        comment: '排序号'
    },
    
})

module.exports = WebsiteCategory