const express = require('express');
const router = express.Router();
const joi = require('joi');
const orderHOperations = require('../orderH/orderhApi');

//ORDER HEADER GET ROUTE API
router.get('/', async (req, res) => {
    await orderHOperations.getOrderHeader().then(result => {
        res.send(result);
    })
});

//ORDER HEADER GET ROUTE BY ID API
router.get('/:Id', async (req, res) => {
    await orderHOperations.getOrderHeader().then(result => {
        const findOrderH = result.find(element => element.Id == req.params.Id);
        if (!findOrderH) {
            res.send('These Order Not Found');
        }
        res.send(findOrderH);
    });
});

//ORDER HEADER POST ROUTE API
router.post('/', async (req, res) => {
    const { error } =  orderHeaderPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const orderH = {
        categoryId: req.body.categoryId,
        whId: req.body.whId,
        transactionDate: req.body.transactionDate,
        total: req.body.total,
    };
    
    await orderHOperations.createOrderHeader(orderH).then(result => {
        const createOrderHeader = result;
        if (!createOrderHeader) {
            return res.send('These Order Cannot Inserted');
        }
        // res.send(orderH);
        /////////
    });
    await orderHOperations.getOrderHeader().then(result => {
        res.send(result);
    })
});

//ORDER HEADER PUT ROUTE API
router.put('/:id', async (req, res) => {
    const orderH = {
        id: req.params.id,
        categoryid: req.body.categoryid,
        whid: req.body.whid,
        transactiondate: req.body.transactiondate,
        total: req.body.total
    };
    const { error } = orderHeaderPutValidation(req.body);
    if (error) {
        return res.send(error.message);
    }
    await orderHOperations.updateOrderHeader(orderH).then(result => {
        res.send(orderH);
    });
});



//ORDER HEADER DELETE ROUTE API
router.delete('/:id', async (req, res) => {
    const categories = {
        id: req.params.id
    };
    await categoriesOperations.getCategories().then(result => {
        const findCategory = result.find(element => element.Id == req.params.id);
        if (!findCategory) {
            return res.send('These Category Hour Not Found');
        }
        categoriesOperations.deleteCategories(categories).then(result => {
            res.send(findCategory);
        });
    });
});

//ORDER HEADER POST VALIDATION FUNCTION
function orderHeaderPostValidation(user) {
    const schema =
        joi.object(
            {
                categoryId: joi.number().integer().required(),
                whId: joi.number().integer().required(),
                transactionDate: joi.required(),
                total: joi.number().integer().required(),
            }
        );
    return schema.validate(user);
};

//ORDER HEADER PUT VALIDATION FUNCTION
function orderHeaderPutValidation(user) {
    const schema =
        joi.object(
            {
                categoryid: joi.number().integer().required(),
                whid: joi.number().integer().required(),
                transactiondate: joi.required(),
                total: joi.number().integer().required(),
            }
        );
    return schema.validate(user);
}

module.exports = router;