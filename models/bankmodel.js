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

class bankModel {
    getbankuserdetails = async(clients_email) => {
        let sql = `SELECT * FROM clients where clients_email = '${clients_email}'`;
        const [result, fields] = await promisePool.query(sql)
        return result 
    }

    savebankuserdetails = async(data) => {
        let sql = `INSERT INTO clients (first_name, last_name, clients_email, password, clients_address, mobile_no) VALUES ('${data.first_name}', '${data.last_name}', '${data.clients_email}', '${data.password}' ,'${data.clients_address}', ${data.mobile_no})`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId
    }

    insertactivity = async(activityData) => {
        let sql = `INSERT INTO activity (user_id, activity_type, ip) VALUES (${activityData.user_id}, '${activityData.activity_type}', '${activityData.ip}')`;
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result.insertId
    }
}

module.exports = new bankModel