const express = require('express');
const router = express.Router();
const joi = require('joi');
const productsOperations = require('../products/productsApi');

//PRODUCTS GET ROUTE API
router.get('/', async (req, res) => {
    await productsOperations.getProducts().then(result => {
        res.send(result);
    })
});

//PRODUCT GET ROUTE BY ID API
router.get('/:Id', async (req, res) => {
    await productsOperations.getProducts().then(result => {
        const findProduct = result.find(element => element.Id == req.params.Id);
        if (!findProduct) {
            res.send('These Product Not Found');
        }
        res.send(findProduct);
    });
});

//PRODUCT POST ROUTE API
router.post('/', async (req, res) => {
    const { error } =  productPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const product = {
        name: req.body.name,
        description: req.body.description,
        categoryid: req.body.categoryid,
        isservice: req.body.isservice,
        itemimg: req.body.itemimg,
        price: req.body.price,
        qtystock: req.body.qtystock,
        disable: req.body.disable,
    };

    await productsOperations.createProduct(product).then(result => {
        const createProduct = result;
        if (!createProduct) {
            return res.send('Product Cannot Inserted');
        }
        res.send(product);
    });
});

//USER PUT ROUTE API
router.put('/:id', async (req, res) => {
    const product = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        categoryid: req.body.categoryid,
        isservice: req.body.isservice,
        itemimg: req.body.itemimg,
        price: req.body.price,
        qtystock: req.body.qtystock,
        disable: req.body.disable
    };
    const { error } = productPutValidation(req.body);
    if (error) {
        return res.send(error.message);
    }
    await productsOperations.updateProduct(product).then(result => {
        res.send(product);
    });
});

router.delete('/:id', async (req, res) => {
    const productid = {
        id: req.params.id
    };
    await productsOperations.getProducts().then(result => {
        const findProduct = result.find(element => element.Id == req.params.id);
        if (!findProduct) {
            return res.send('These Product Not Found');
        }
        productsOperations.deleteProduct(productid).then(result => {
            res.send(findProduct);
        });
    });
});

//PRODUCT POST VALIDATION FUNCTION
function productPostValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required(),
                description: joi.string().required(),
                categoryid: joi.number().integer().required(),
                isservice: joi.boolean().required(),
                itemimg: joi.string().required(),
                disable: joi.boolean().required(),
                price: joi.number().required(),
                qtystock: joi.number().required(),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
};

//PRODUCT PUT VALIDATION FUNCTION
function productPutValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required(),
                description: joi.string().required(),
                categoryid: joi.number().integer().required(),
                isservice: joi.boolean().required(),
                itemimg: joi.string().required(),
                disable: joi.boolean().required(),
                price: joi.number().required(),
                qtystock: joi.number().required(),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
}

module.exports = router;