const express = require('express');
const router = express.Router();
const joi = require('joi');
const categoriesOperations = require('../categories/categoriesApi');

//CATEGORIES GET ROUTE API
router.get('/', async (req, res) => {
    await categoriesOperations.getCategories().then(result => {
        res.send(result);
    })
});

//CATEGORIES GET ROUTE BY ID API
router.get('/:Id', async (req, res) => {
    await categoriesOperations.getCategories().then(result => {
        const findCategories = result.find(element => element.Id == req.params.Id);
        if (!findCategories) {
            res.send('These Categorie Not Found');
        }
        res.send(findCategories);
    });
});

//CATEGORIES POST ROUTE API
router.post('/', async (req, res) => {
    const { error } =  categoriesPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const categories = {
        name: req.body.name,
        disable: req.body.disable,
    };

    await categoriesOperations.createCategories(categories).then(result => {
        const createCategories = result;
        if (!createCategories) {
            return res.send('These Category Cannot Inserted');
        }
        res.send(categories);
    });
});

//CATEGORIES PUT ROUTE API
router.put('/:id', async (req, res) => {
    const categories = {
        id: req.params.id,
        name: req.body.name,
        disable: req.body.disable
    };
    const { error } = categoriesPutValidation(req.body);
    if (error) {
        return res.send(error.message);
    }
    await categoriesOperations.updateCategories(categories).then(result => {
        res.send(categories);
    });
});



//CATEGORIES DELETE ROUTE API
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

//CATEGORIES POST VALIDATION FUNCTION
function categoriesPostValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required(),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
};

//CATEGORIES PUT VALIDATION FUNCTION
function categoriesPutValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required().max(50),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
}

module.exports = router;