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

class ecommerceModel {
    savecategoryDetails = async(data) => {
        let sql = `INSERT INTO category (category_name) VALUES ('${data.category_name}')`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    savesubcategoryDetails = async(data) => {
        let sql = `INSERT INTO sub_category (category_id, sub_category_name) VALUES (${data.category_id}, '${data.sub_category_name}')`;
        const[result, fields] = await promisePool.query(sql)
        return result.insertId;
    }

    saveproductlistDetails = async(data) => {
        let sql = `INSERT INTO product (product_name, product_description, product_expirydate, product_mfg, company_id, sub_category_id) VALUES ('${data.product_name}', '${data.product_description}', '${data.product_expirydate}', '${data.product_mfg}', ${data.company_id}, ${data.sub_category_id})`;
        const[result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    getorderpurchase = async() => {
        let sql = `SELECT users.email, users.address_1, pu.user_id, pu.product_id, pu.quantity, pr.product_name, pr.product_description, pr.product_expirydate, pr.product_mfg, co.company_name, co.company_description FROM users INNER JOIN purchase AS pu ON users.id = pu.user_id INNER JOIN product AS pr ON pr.id = pu.product_id INNER JOIN company AS co on co.id = pr.company_id`;
        const[result, fields] = await promisePool.query(sql);
        return result
    }
}

module.exports = new ecommerceModel