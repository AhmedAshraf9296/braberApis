var config = require('../database/config');
const sql = require('mssql');

// getWorkingHours();
async function getWorkingHours() {
    try {
        let pool = await sql.connect(config);
        let Whours = await pool.request().query("select * from workinghours");
        return Whours.recordset;
    }
    catch (e) {
        console.log(e);
    }
}


async function createWorkingHours(workingHours) {
    try {
        let pool = await sql.connect(config);
        let insertWorkingHours = await pool.request()
            .input('name', sql.NVarChar, workingHours.name)
            .input('disable', sql.Bit, workingHours.disable)
            .execute('createworkinghours');
        return insertWorkingHours.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateWorkingHours(workingHours) {
    try {
        let pool = await sql.connect(config);
        let updateWorkingHours = await pool.request()
            .input('id', sql.Int, workingHours.id)
            .input('name', sql.NVarChar, workingHours.name)
            .input('disable', sql.Bit, workingHours.disable)
            .execute('updateworkinghours');
        return updateWorkingHours.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}



async function deleteWorkingHours(workingHours) {
    try {
        let pool = await sql.connect(config);
        let deleteWorkingHours = await pool.request()
            .input('id', sql.Int, workingHours.id)
            .execute('deleteworkinghours');
        return deleteWorkingHours.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getWorkingHours: getWorkingHours,
    createWorkingHours: createWorkingHours,
    updateWorkingHours: updateWorkingHours,
    deleteWorkingHours: deleteWorkingHours
}