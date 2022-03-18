import { DataTypes } from 'sequelize'
import {
    NewsInstance,
    TokenInstance,
    UserInstance
} from './interfaces'
import sequelize from '../utils/db'


export const Token = sequelize.define<TokenInstance>("token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
})


export const User = sequelize.define<UserInstance>("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
        allowNull: false
    },
})

export const News = sequelize.define<NewsInstance>("news", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})


User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(News)
News.belongsTo(User)

