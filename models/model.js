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
        let sql = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.password}')`;
        // console.log(sql, "sql1111");
        const [result, fields] = await promisePool.query(sql)
        return result.insertId;
    }

    getUsertodoDetails = async (user_id) => {
        let sql = `SELECT * FROM todolist where user_id = '${user_id}'`;
        // console.log(sql);
        const [result, fields] = await promisePool.query(sql)
        return result;
    }

    inserttodo = async (data) => {
        let sql = `INSERT INTO todolist (user_id, todo_detail) VALUES ('${data.user_id}', '${data.todo_detail}')`;
        // console.log(sql, "234");
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    findtodoid = async (id) => {
        let sql = `SELECT * FROM todolist WHERE id = ${id}`
        // console.log(sql, '2323');
        const[result, fields] = await promisePool.query(sql);
        return result;
    }

    deleteusertododetails = async (id) => {
        let sql = `DELETE from todolist WHERE id = '${id}'`;
        // console.log(sql, '2');
        const[result, fields] = await promisePool.query(sql);
        return result;
    }
    
    getuserbyid = async (id) => {
        let sql = `SELECT id from users = ${id}`
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    gettodoinfo = async (data) => {
        let sql = `SELECT * FROM todolist WHERE user_id = ${data.user_id}`
        // console.log(sql, '11111');
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    updatedtodoinfo = async (data) => {
        let sql = `UPDATE todolist SET todo_detail = '${data.todo_detail}' WHERE user_id = ${data.user_id}`
        // console.log(sql, '111');
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
}
module.exports = new userModel;