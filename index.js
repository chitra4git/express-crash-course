//Express JS Crash Course: https://www.youtube.com/watch?v=L72fhGm1tfE

const express = require ('express');
const path = require ('path');
const app = express ();
const exphbs  = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

//initialize middleware
//app.use(logger);

//handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname,'pulic','index.html'))
// });

// Body Parser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Homepage Route
app.get('/',(req, res)=>res.render('index',{
    title: 'Member App',
    members
}));

//set static folder

app.use(express.static(path.join(__dirname, 'public')));


// Members API routes

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 