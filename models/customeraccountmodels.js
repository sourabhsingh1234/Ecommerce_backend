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

class customeraccountModel {
    savecustomeraccountdetails = async(data) => {
        let sql = `INSERT INTO customeraccount (customer_id, account_no, account_type, acc_activation_date, total_balance) VALUES (${data.customer_id}, ${data.account_no}, '${data.account_type}', '${data.acc_activation_date}', ${data.total_balance})`;
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result.insertId;
    }

    savetransactioninfodetails = async(data) => {
        let sql = `INSERT INTO transactioninfo (customer_id, account_type, amount_withdrawn, withdrawn_time) VALUES (${data.customer_id}, '${data.account_type}', ${data.amount_withdrawn}, '${data.withdrawn_time}')`;
        const[result, fields] = await promisePool.query(sql)
        return result.insertId
    }

    getcustomerbankdetails = async() => {
        let sql = `SELECT * FROM clients INNER JOIN customeraccount on customeraccount.customer_id = clients.id INNER JOIN transactioninfo ON transactioninfo.customer_id = clients.id`;
        const[result, fields] = await promisePool.query(sql);
        return result
    }
}

module.exports = new customeraccountModel