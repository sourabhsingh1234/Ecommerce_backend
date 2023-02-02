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

class productModel {

    saveProductsDetails = async (data) => {
        let sql = `INSERT INTO company (sub_category_id, company_name, company_description) VALUES (${data.sub_category_id},'${data.company_name}', '${data.company_description}')`;
        // console.log(sql, "sql1111");
        const [result, fields] = await promisePool.query(sql)
        return result.insertId;
    }
}

module.exports = new productModel;