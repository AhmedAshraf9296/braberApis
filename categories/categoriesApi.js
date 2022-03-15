var config = require('../database/config');
const sql = require('mssql');

// getCategories();
async function getCategories() {
    try {
        let pool = await sql.connect(config);
        let Categories = await pool.request().query("select * from categories");
        return Categories.recordset;
    }
    catch (e) {
        console.log(e);
    }
}


async function createCategories(Category) {
    try {
        let pool = await sql.connect(config);
        let insertCategories = await pool.request()
            .input('name', sql.NVarChar, Category.name)
            .input('disable', sql.Bit, Category.disable)
            .execute('createcategories');
        return insertCategories.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateCategories(Category) {
    try {
        let pool = await sql.connect(config);
        let updateCategory = await pool.request()
            .input('id', sql.Int, Category.id)
            .input('name', sql.NVarChar, Category.name)
            .input('disable', sql.Bit, Category.disable)
            .execute('updatecategories');
        return updateCategory.recordsets;
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
    getCategories: getCategories,
    createCategories: createCategories,
    updateCategories: updateCategories,
    deleteCategories: deleteCategories
}