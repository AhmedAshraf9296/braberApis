var config = require('../database/config');
const sql = require('mssql');

// getUsers();
async function getUsers(){
  try
  {
      let pool = await sql.connect(config);
      let users = await pool.request().query("select * from userss");
      return users.recordset;
  }
  catch (e){
      console.log(e);
  }
}


async function createUser(user) {
  try {
      let pool = await sql.connect(config);
      let insertUser = await pool.request()
          .input('name', sql.NVarChar, user.name)
          .input('userName', sql.NVarChar, user.userName)
          .input('userPass', sql.NVarChar, user.userPass)
          .input('phone', sql.NVarChar, user.phone)
          .input('email', sql.NVarChar, user.email)
          .input('disable', sql.Bit,user.disable) 
          .execute('createuser');
      return insertUser.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

async function updateUser(user) {
  try {
      let pool = await sql.connect(config);
      let updateUser = await pool.request()
          .input('id', sql.Int, user.id)
          .input('name', sql.NVarChar, user.name)
          .input('userName', sql.NVarChar, user.userName)
          .input('userPass', sql.NVarChar, user.userPass)
          .input('phone', sql.NVarChar, user.phone)
          .input('email', sql.NVarChar, user.email)
          .input('disable', sql.Bit,user.disable) 
          .execute('updateUser');
      return updateUser.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}



async function deleteUser(user) {
  try {
      let pool = await sql.connect(config);
      let deleteUser = await pool.request()
          .input('id', sql.Int,user.id) 
          .execute('deleteuser');
      return deleteUser.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

module.exports = {
  getUsers : getUsers,
  createUser : createUser,
  updateUser : updateUser,
  deleteUser : deleteUser
}