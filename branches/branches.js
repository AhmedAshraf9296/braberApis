const express = require('express');
const router = express.Router();
const joi = require('joi');
const branchesOperations = require('../branches/branchesApi');

//Branch GET ROUTE API
 router.get('/',async (req, res) => {
    // const users = [];  
    await branchesOperations.getBranches().then(result=>{
    // users.push(result);
    res.send(result);
    })
  });
  
  //Branch GET ROUTE BY ID API
  router.get('/:Id', async (req, res) => {  
     await branchesOperations.getBranches().then(result =>{
        const findBranch = result.find(element => element.Id == req.params.Id);
        if (!findBranch) {
            res.send('These Branch Not Found');
          }
          res.send(findBranch);
    });
});
  
  //Branch POST ROUTE API
  router.post('/', async(req, res) => {
    const { error } =  branchPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const branch = {
      name: req.body.name,
      itemimg: req.body.itemimg,
      disable : req.body.disable
    };
    
     await branchesOperations.createBranch(branch).then(result=>{
         const createBranch = result;
        if(!createBranch){
           return res.send('Branch Cannot Inserted');
        }
        res.send(branch);
    });
  });
  
  //Branch PUT ROUTE API
  router.put('/:id',async (req, res) => {
    const branch = {
        id : req.params.id,
        name: req.body.name,
        itemimg: req.body.itemimg,
        disable : req.body.disable
      };    
    const { error } =  branchPutValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    await branchesOperations.updateBranch(branch).then(result=>{
        res.send(branch);
    });
  });
  
  router.delete('/:id',async(req,res)=>{
    const branchid = {
        id : req.params.id
      };    
      await branchesOperations.getBranches().then(result =>{
        const findBranch = result.find(element => element.Id == req.params.id);
        if (!findBranch) {
           return res.send('These Branch Not Found');
          }
           branchesOperations.deleteBranch(branchid).then(result=>{
            res.send(findBranch);
          });
    });
  });
  
  //BRANCH POST VALIDATION FUNCTION
  function branchPostValidation(branch) {
    const schema =
      joi.object(
        {
          name: joi.string().required(),
          itemimg: joi.string().required(),
          disable : joi.boolean().required()
        }
      );
    return schema.validate(branch);
  };
  
  //BRANCH PUT VALIDATION FUNCTION
  function branchPutValidation(branch) {
    const schema =
      joi.object(
        {
            name: joi.string().required(),
            itemimg: joi.string().required(),
            disable : joi.boolean().required()
        }
      );
    return schema.validate(branch);
  }

  module.exports = router;