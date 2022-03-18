import { Sequelize } from 'sequelize'

const dbName = `newsDb`
const dbUser = `root`
const dbPassword = `root`
const dbHost = `localhost`


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
})

export default sequelize
