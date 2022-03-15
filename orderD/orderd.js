const express = require('express');
const router = express.Router();
const joi = require('joi');
const orderDOperations = require('../orderD/orderdApi');

//ORDER DETAIL GET ROUTE API
router.get('/', async (req, res) => {
    await orderDOperations.getOrderDetail().then(result => {
        res.send(result);
    })
});

//ORDER DETAIL GET ROUTE BY ID API
router.get('/:id', async (req, res) => {
    await orderDOperations.getOrderDetail().then(result => {
        const findOrderD = result.filter(element => element.hid == req.params.id);
        if (!findOrderD) {
            res.send('These Order Not Found');
        }
        res.send(findOrderD);
    });
});

//ORDER DETAIL POST ROUTE API
router.post('/', async (req, res) => {
    const { error } =  orderDetailPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const orderD = {
        hid: req.body.hid,
        productid: req.body.productid,
        qty: req.body.qty,
        price: req.body.price,
        total: req.body.total,
    };

    await orderDOperations.createOrderDetail(orderD).then(result => {
        const createOrderDetail = result;
        if (!createOrderDetail) {
            return res.send('These Order Cannot Inserted');
        }
        res.send(orderD);
    });
});

//ORDER DETAIL PUT ROUTE API
router.put('/:id', async (req, res) => {
    const orderD = {
        id: req.params.id,
        hid: req.body.hid,
        productid: req.body.productid,
        qty: req.body.qty,
        price: req.body.price,
        total: req.body.total,
    };
    // const { error } = orderHeaderPutValidation(req.body);
    // if (error) {
    //     return res.send(error.message);
    // }
    await orderDOperations.updateOrderDetail(orderD).then(result => {
        res.send(orderD);
    });
});



//ORDER DETAIL DELETE ROUTE API
// router.delete('/:id', async (req, res) => {
//     const categories = {
//         id: req.params.id
//     };
//     await categoriesOperations.getCategories().then(result => {
//         const findCategory = result.find(element => element.Id == req.params.id);
//         if (!findCategory) {
//             return res.send('These Category Hour Not Found');
//         }
//         categoriesOperations.deleteCategories(categories).then(result => {
//             res.send(findCategory);
//         });
//     });
// });

//ORDER DETAIL POST VALIDATION FUNCTION
function orderDetailPostValidation(user) {
    const schema =
        joi.object(
            {
                hid: joi.number().integer().required(),
                productid: joi.number().integer().required(),
                qty: joi.date().required(),
                price: joi.number().integer().required(),
                total: joi.number().integer().required(),
            }
        );
    return schema.validate(user);
};

//ORDER DETAIL PUT VALIDATION FUNCTION
function orderHeaderPutValidation(user) {
    const schema =
        joi.object(
            {
                categoryid: joi.number().integer().required(),
                whid: joi.number().integer().required(),
                transactiondate: joi.date().required(),
                total: joi.number().integer().required(),
            }
        );
    return schema.validate(user);
}

module.exports = router;