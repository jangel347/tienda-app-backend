const express = require('express');
const cors = require('cors');

console.log('Application starts');
//connection to database
// connection();

//create a node server
const app = express();
const port = 3901;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
const auth_routes = require('./routes/auth');

app.use('/api', auth_routes);
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});