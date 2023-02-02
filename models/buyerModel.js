const config = require('../config');
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: config.mysqlHost,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.mysqlPort
});
const promisePool = pool.promise();

class buyerModel {
    savebuyerdetails = async(data) => {
        let sql = `INSERT INTO purchase (user_id, product_id, quantity) VALUES (${data.user_id}, ${data.product_id}, ${data.quantity})`;
        // console.log(sql);
        const[result, fields] = await promisePool.query(sql);
        return result.insertId;
    }
}

module.exports = new buyerModel