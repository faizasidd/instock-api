const express = require('express');
require('dotenv').config();
const cors = require('cors');
const warehousesRoute = require('./routes/warehouses.js');
const inventoriesRoute = require('./routes/inventories.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/warehouses', warehousesRoute);
app.use('/inventories', inventoriesRoute);


app.all('*', (req,res)=> {
  res.status(404).send('<h1>Resource not found</h1>')
})


app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});