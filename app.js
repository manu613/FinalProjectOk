const express = require('express');
const cors = require('cors');
const routerManager = require('./router/manager');
//const routerEmployee = require('./router/employee');
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use('/admin' , routerManager);
//app.use('./employee' , routerEmployee);

app.get('/',(req,res)=>{
    res.send("ok baby")
})

app.listen(5555);