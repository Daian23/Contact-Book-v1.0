const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const ClaseContact = require('./ClaseContact');
const ClaseContactBook = require('./ClaseContactBook');
const apps = require('./prueba.js');

//const { send } = require('process');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Acceder a la carpeta public
app.use(express.static(__dirname + "/public/"));

//Setting/Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/',(request,response) =>{
    response.render('menu.ejs', {contactsBooks: apps.filesDirectory()});
});

app.get('/addContact',(request,response) =>{

    response.render('addContact.ejs', {contactsBooks: apps.filesDirectory(), mensaje: "Hola"});
   
});

app.post('/salidaContact',(request,response)=>{
    
    let nombre = request.body.name;
    let email = request.body.email;
    let mobil = request.body.mobil;
    let topList = request.body.topList;
    let contactBook = request.body.ContactB;

    if(apps.validateMobil(contactBook,mobil)){
        msj="El contacto ya existe";
    }else{
        var tp = apps.convertFavorite(topList);
        var contact = new ClaseContact.Contact(nombre,email,mobil,tp);
        apps.saveContact(contactBo,JSON.stringify(contact));
        msj="Contacto registrado con exito";
    }
   
    response.render('addContact.ejs', {contactsBooks: apps.filesDirectory(),mensaje: msj});

});

app.get('/home/:CB',(request,response) =>{

    var contactsBook = apps.loadContacts(`${request.params.CB}`);

    response.render('listContacts.ejs', {contactsBooksL: contactsBook, contactsBooks: apps.filesDirectory()});

});

app.post('/salidaCB',(request,response)=>{
    
    let nameCB = request.body.name;

    apps.existsCB(nameCB);

    response.render('CreateContactBook.ejs', {contactsBooks: apps.filesDirectory(),mensaje: "Hola"});

    //Solucionar
    //response.sendFile(path.join(__dirname,'./forms/salidaCB.html'));
    
});

app.get('/eliminarContacto/:CB/:mobil',(request,response)=>{

   apps.deleteContact(`${request.params.CB}`,request.params.mobil);

   var contactsBook = apps.loadContacts(`${request.params.CB}`);

   response.render('listContacts.ejs', {contactsBooksL: contactsBook, contactsBooks: apps.filesDirectory()});
});

app.get('/CreateContactBook',(request,response) =>{

    response.render('CreateContactBook.ejs',{contactsBooks: apps.filesDirectory()});

});

const port = 5000;

app.listen(port,()=>{
  console.log(`Express listen on port ${port}`);
});
