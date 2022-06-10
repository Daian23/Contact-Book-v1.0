const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Acceder a la carpeta public
app.use(express.static(__dirname + "/public/"));

//Setting/Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

//routes
app.use('/', require('./src/routes/routesContactBook'));
app.use('/', require('./src/routes/routesContact'));

const PORT = process.env.PORT || 5000;
//const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`Express listen on port ${PORT}`);
});
