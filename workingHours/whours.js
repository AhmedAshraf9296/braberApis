const express = require('express');
const router = express.Router();
const joi = require('joi');
const workingHoursOperations = require('../workingHours/whoursApi');

//WorkingHours GET ROUTE API
router.get('/', async (req, res) => {
    await workingHoursOperations.getWorkingHours().then(result => {
        res.send(result);
    })
});

//WorkingHours GET ROUTE BY ID API
router.get('/:Id', async (req, res) => {
    await workingHoursOperations.getWorkingHours().then(result => {
        const findWorkingHours = result.find(element => element.Id == req.params.Id);
        if (!findWorkingHours) {
            res.send('These Product Not Found');
        }
        res.send(findWorkingHours);
    });
});

//WorkingHours POST ROUTE API
router.post('/', async (req, res) => {
    const { error } =  workingHoursPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const workingHours = {
        name: req.body.name,
        disable: req.body.disable,
    };

    await workingHoursOperations.createWorkingHours(workingHours).then(result => {
        const createWorkingHours = result;
        if (!createWorkingHours) {
            return res.send('These WorkingHour Cannot Inserted');
        }
        res.send(workingHours);
    });
});

//WorkingHours PUT ROUTE API
router.put('/:id', async (req, res) => {
    const workingHours = {
        id: req.params.id,
        name: req.body.name,
        disable: req.body.disable
    };
    const { error } = workingHoursPutValidation(req.body);
    if (error) {
        return res.send(error.message);
    }
    await workingHoursOperations.updateWorkingHours(workingHours).then(result => {
        res.send(workingHours);
    });
});



//WorkingHours DELETE ROUTE API
router.delete('/:id', async (req, res) => {
    const workingHours = {
        id: req.params.id
    };
    await workingHoursOperations.getWorkingHours().then(result => {
        const findWorkginHour = result.find(element => element.Id == req.params.id);
        if (!findWorkginHour) {
            return res.send('These Working Hour Not Found');
        }
        workingHoursOperations.deleteWorkingHours(workingHours).then(result => {
            res.send(findWorkginHour);
        });
    });
});

//PRODUCT POST VALIDATION FUNCTION
function workingHoursPostValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required(),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
};

//PRODUCT PUT VALIDATION FUNCTION
function workingHoursPutValidation(user) {
    const schema =
        joi.object(
            {
                name: joi.string().required(),
                disable: joi.boolean().required(),
            }
        );
    return schema.validate(user);
}

module.exports = router;