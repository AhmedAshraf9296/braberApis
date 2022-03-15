var config = require('../database/config');
const sql = require('mssql');

// getUsers();
async function getProducts(){
  try
  {
      let pool = await sql.connect(config);
      let products = await pool.request().query("select * from productss");
      return products.recordset;
  }
  catch (e){
      console.log(e);
  }
}


async function createProduct(product) {
  try {
      let pool = await sql.connect(config);
      let insertProduct = await pool.request()
          .input('name', sql.NVarChar, product.name)
          .input('description', sql.NVarChar, product.description)
          .input('categoryid', sql.Int, product.categoryid)
          .input('isservice', sql.Bit, product.isservice)
          .input('itemimg', sql.NVarChar, product.itemimg)
          .input('price', sql.Real,product.price)
          .input('qtystock', sql.Real,product.qtystock)
          .input('disable', sql.Bit,product.disable) 
          .execute('createproduct');
      return insertProduct.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

async function updateProduct(product) {
  try {
      let pool = await sql.connect(config);
      let updateProduct = await pool.request()
          .input('id', sql.Int, product.id)
          .input('name', sql.NVarChar, product.name)
          .input('description', sql.NVarChar, product.description)
          .input('categoryid', sql.Int, product.categoryid)
          .input('isservice', sql.Bit, product.isservice)
          .input('itemimg', sql.NVarChar, product.itemimg)
          .input('price', sql.Real,product.price)
          .input('qtystock', sql.Real,product.qtystock)
          .input('disable', sql.Bit,product.disable) 
          .execute('updateproduct');
      return updateProduct.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}



async function deleteProduct(product) {
  try {
      let pool = await sql.connect(config);
      let deleteProduct = await pool.request()
          .input('id', sql.Int,product.id) 
          .execute('deleteproduct');
      return deleteProduct.recordsets;
  }
  catch (err) {
      console.log(err);
  }
}

module.exports = {
    getProducts : getProducts,
    createProduct : createProduct,
    updateProduct : updateProduct,
    deleteProduct : deleteProduct
}