const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const port = 3000 | process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, ()=>{console.log(`jalan di ${port}`)})
