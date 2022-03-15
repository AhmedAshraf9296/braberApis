var config = require('../database/config');
const sql = require('mssql');

// getUsers();
async function getBranches(){
  try
  {
      let pool = await sql.connect(config);
      let branches = await pool.request().query("select * from branchess");
      return branches.recordset;
  }
  catch (e){
      console.log(e);
  }
}


async function createBranch(branch) {
  try {
      let pool = await sql.connect(config);
      let insertBranch = await pool.request()
          .input('name', sql.NVarChar, branch.name)
          .input('itemimg', sql.NVarChar, branch.itemimg)
          .input('disable', sql.Bit,branch.disable) 
          .execute('createbranch');
      return insertBranch.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

async function updateBranch(branch) {
  try {
      let pool = await sql.connect(config);
      let updateBranch = await pool.request()
          .input('id', sql.Int, branch.id) 
          .input('name', sql.NVarChar, branch.name)
          .input('itemimg', sql.NVarChar, branch.itemimg)
          .input('disable', sql.Bit,branch.disable)  
          .execute('updatebranch');
      return updateBranch.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}



async function deleteBranch(branch) {
  try {
      let pool = await sql.connect(config);
      let deleteBranch = await pool.request()
          .input('id', sql.Int,branch.id) 
          .execute('deletebranch');
      return deleteBranch.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

module.exports = {
 getBranches : getBranches,
  createBranch : createBranch,
  updateBranch : updateBranch,
  deleteBranch : deleteBranch
}