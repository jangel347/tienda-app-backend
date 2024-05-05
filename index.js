const express = require('express');
const cors = require('cors');

console.log('Application starts');
//create a node server
const app = express();
const port = 3901;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
const auth_routes = require('./routes/auth');
const user_routes = require('./routes/user');

app.use('/api/auth/', auth_routes);
app.use('/api/user/', user_routes);
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});