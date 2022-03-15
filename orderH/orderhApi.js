var config = require('../database/config');
const sql = require('mssql');

// getCategories();
async function getOrderHeader() {
    try {
        let pool = await sql.connect(config);
        let OrderH = await pool.request().query("select * from orderhs");
        return OrderH.recordset;
    }
    catch (e) {
        console.log(e);
    }
}


async function createOrderHeader(orderh) {
    try {
        let pool = await sql.connect(config);
        let insertOrderHeader = await pool.request()
            .input('categoryId', sql.Int, orderh.categoryId)
            .input('whId', sql.Int, orderh.whId)
            .input('transactionDate', sql.DateTime, orderh.transactionDate)
            .input('total', sql.Real, orderh.total)
            .execute('createorderheader');
        return insertOrderHeader.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateOrderHeader(orderh) {
    try {
        let pool = await sql.connect(config);
        let updateOrderHeader = await pool.request()
            .input('id', sql.Int, orderh.id)
            .input('categoryid', sql.Int, orderh.categoryid)
            .input('whid', sql.Int, orderh.whid)
            .input('transactiondate', sql.DateTime, orderh.transactiondate)
            .input('total', sql.Real, orderh.total)
            .execute('updateorderheader');
        return updateOrderHeader.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}



async function deleteCategories(Category) {
    try {
        let pool = await sql.connect(config);
        let deleteCategory = await pool.request()
            .input('id', sql.Int, Category.id)
            .execute('deletecategories');
        return deleteCategory.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getOrderHeader:getOrderHeader,
    createOrderHeader: createOrderHeader,
    updateOrderHeader: updateOrderHeader,
    deleteCategories: deleteCategories
}