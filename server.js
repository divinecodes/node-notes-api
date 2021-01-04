const express = require('express');
const bodyParser = require('body-parser'); 
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

//create express app
const app = express();


//parse requests of 
app.use(bodyParser.json()); 

//connecting to database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('Successfully connected to the database'); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now....',err); 
    process.exit();
});

app.get('/',(req, res)=> {
    res.json({"message": "Welcome to Easy Notes"});
});

//register routes
require('./app/routes/note.routes')(app);
require('./app/routes/auth.routes')(app);

app.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
});