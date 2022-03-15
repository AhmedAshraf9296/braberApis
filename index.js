
const express = require('express');
const { options } = require('joi');
const { json } = require('express');
const app = express();
const users = require('./users/users')
const branches = require('./branches/branches')
const categories = require('./branches/categories')
const orderd = require('./branches/orderd')
const orderh = require('./branches/orderh')
const products = require('./branches/products')
const workinghours = require('./branches/whours')
const helmet = require('helmet');
const morgan = require('morgan');
app.use(express.json());
app.use(helmet());
app.use('/api/users',users);
app.use('/api/branches',branches);
app.use('/api/orderd',orderd);
app.use('/api/orderh',orderh);
app.use('/api/products',products);
app.use('/api/workinghours',workinghours);
app.use('/api/categories',categories);


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
  res.send('Ashraf');
});


app.listen(5005, () => { console.log('App Working on port 5005 ... ') });
