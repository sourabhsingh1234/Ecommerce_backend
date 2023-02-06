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

class studentModel {
    savestudentdetails = async(data) => {
        let sql = `INSERT INTO student_registor (student_name, student_email, student_rollnumber, student_mobile, student_branch) VALUES ('${data.student_name}', '${data.student_email}', '${data.student_rollnumber}', ${data.student_mobile}, '${data.student_branch}')`;
        console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result.insertId
    }
}

module.exports = new studentModel