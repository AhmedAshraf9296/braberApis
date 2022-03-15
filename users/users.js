const express = require('express');
const router = express.Router();
const joi = require('joi');
const usersOperations = require('../users/usersApi');

//USER GET ROUTE API
 router.get('/',async (req, res) => {
    // const users = [];  
    await usersOperations.getUsers().then(result=>{
    // users.push(result);
    res.send(result);
    })
  });
  
  //USER GET ROUTE BY ID API
  router.get('/:Id', async (req, res) => {  
     await usersOperations.getUsers().then(result =>{
        const findUser = result.find(element => element.Id == req.params.Id);
        if (!findUser) {
            res.send('These User Not Found');
          }
          res.send(findUser);
    });
});
  
  //USER POST ROUTE API
  router.post('/', async(req, res) => {
    const { error } =  userPostValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    const user = {
      name: req.body.name,
      userName: req.body.userName,
      userPass: req.body.userPass,
      phone: req.body.phone,
      email: req.body.email,
      disable : req.body.disable
    };
    
     await usersOperations.createUser(user).then(result=>{
         const createUser = result;
        if(!createUser){
           return res.send('User Cannot Inserted');
        }
        res.send(user);
    });
  });
  
  //USER PUT ROUTE API
  router.put('/:id',async (req, res) => {
    const user = {
        id : req.params.id,
        name: req.body.name,
        userName: req.body.userName,
        userPass: req.body.userPass,
        phone: req.body.phone,
        email: req.body.email,
        disable : req.body.disable
      };    
    const { error } =  userPutValidation(req.body);
    if (error) {
      return res.send(error.message);
    }
    await usersOperations.updateUser(user).then(result=>{
        res.send(user);
    });
  });
  
  router.delete('/:id',async(req,res)=>{
    const userid = {
        id : req.params.id
      };    
      await usersOperations.getUsers().then(result =>{
        const findUser = result.find(element => element.Id == req.params.id);
        if (!findUser) {
           return res.send('These User Not Found');
          }
           usersOperations.deleteUser(userid).then(result=>{
            res.send(findUser);
          });
    });
  });
  
  //USER POST VALIDATION FUNCTION
  function userPostValidation(user) {
    const schema =
      joi.object(
        {
          name: joi.string().required(),
          userName: joi.string().required(),
          userPass: joi.string().required(),
          phone: joi.string().required(),
          email: joi.string().required(),
          disable : joi.boolean().required()
        }
      );
    return schema.validate(user);
  };
  
  //USER PUT VALIDATION FUNCTION
  function userPutValidation(user) {
    const schema =
      joi.object(
        {
          name: joi.string().required(),
          userName: joi.string().required(),
          userPass: joi.string().required(),
          phone: joi.string().required(),
          email: joi.string().required(),
          disable : joi.boolean().required()
        }
      );
    return schema.validate(user);
  }

  module.exports = router;