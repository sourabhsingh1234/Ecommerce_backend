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
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result.insertId
    }
    insertactivity = async(activityData) => {
        let sql = `INSERT INTO activity (user_id, activity_type, ip) VALUES (${activityData.user_id}, '${activityData.activity_type}', '${activityData.ip}')`;
        console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result.insertId
    }
    
    insertfees = async(data) => {
        let sql = `INSERT INTO fees (user_id, amount_paid, amount_left) VALUES (${data.user_id}, ${data.amount_paid}, ${data.amount_left})`
        const [result, fields] = await promisePool.query(sql);
        return result.insertId; 
    }
   
    getstudentfeesdetails = async() => {
        let sql = `SELECT * from student_registor INNER JOIN fees on student_registor.id = fees.user_id`;
        // console.log(sql);
        const[result, fields] = await promisePool.query(sql)
        return result
    }
}

module.exports = new studentModel