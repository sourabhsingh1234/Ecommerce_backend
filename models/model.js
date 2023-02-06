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

class userModel {
    getUserDetails = async (email) => {
        let sql = `SELECT * FROM users where email = '${email}'`;
        // console.log(sql, '2335');
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    
    saveUserDetails = async (data) => {
        let sql = `INSERT INTO users (first_name, last_name, email, password, address_1, address_2) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.password}', '${data.address_1}', '${data.address_2}')`;
        // console.log(sql, "sql1111");
        const [result, fields] = await promisePool.query(sql)
        return result.insertId;
    }
    
    updateuseraddress = async(data) => {
        let sql = `UPDATE users set address_1 = '${data.address_1}', address_2 = '${data.address_2}' WHERE id = ${data.user_id}`;
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result
    }

}
module.exports = new userModel;