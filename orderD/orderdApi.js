var config = require('../database/config');
const sql = require('mssql');

// getOrder Detail();
async function getOrderDetail() {
    try {
        let pool = await sql.connect(config);
        let OrderD = await pool.request().query("select * from orderds");
        return OrderD.recordset;
    }
    catch (e) {
        console.log(e);
    }
}


async function createOrderDetail(orderd) {
    try {
        let pool = await sql.connect(config);
        let insertOrderDetail = await pool.request()
            .input('hid', sql.Int, orderd.hid)
            .input('productid', sql.Int, orderd.productid)
            .input('qty', sql.Real, orderd.qty)
            .input('price', sql.Real, orderd.price)
            .input('total', sql.Real, orderd.total)
            .execute('createorderdetail');
        return insertOrderDetail.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateOrderDetail(orderd) {
    try {
        let pool = await sql.connect(config);
        let updateOrderDetail = await pool.request()
            .input('hid', sql.Int, orderd.hid)
            .input('productid', sql.Int, orderd.productid)
            .input('qty', sql.Real, orderd.qty)
            .input('price', sql.Real, orderd.price)
            .input('total', sql.Real, orderd.total)
            .execute('updateorderdetail');
        return updateOrderDetail.recordsets;
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
    getOrderDetail:getOrderDetail,
    createOrderDetail: createOrderDetail,
    updateOrderDetail: updateOrderDetail,
    deleteCategories: deleteCategories
}