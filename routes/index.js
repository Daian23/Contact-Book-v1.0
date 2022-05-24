const express = require('express');
const router = express.Router();
const ClaseContact = require('../ClaseContact');
const ClaseContactBook = require('../ClaseContactBook');
const apps = require('../models/prueba');

router.get('/',(request,response) =>{
    response.render('menu.ejs', {contactsBooks: apps.filesDirectory()});
});

router.get('/addContact',(request,response) =>{

    response.render('addContact.ejs', {contactsBooks: apps.filesDirectory(), mensaje: "Hola"});
   
});

router.post('/addContact',(request,response)=>{
    
    let nombre = request.body.name;
    let email = request.body.email;
    let mobil = request.body.mobil;
    let topList = request.body.topList;
    let contactBook = request.body.ContactB;

    if(!nombre || !email || !mobil || !contactBook){
        response.send(400).send("Los campos no pueden estar vacíos");
    }

    if(apps.validateMobil(contactBook,mobil)){
        msj="Este contacto no fue registrado porque ya existe";
    }else{
        var tp = apps.convertFavorite(topList);
        var contact = new ClaseContact.Contact(nombre,email,mobil,tp);
        apps.saveContact(contactBook,JSON.stringify(contact));
        msj="Contacto registrado con exito";
    }
   
    response.redirect('/addContact');

});

router.get('/home/:CB',(request,response) =>{

    console.log(`${request.params.CB}`);

    var contactsBook = apps.loadContacts(`${request.params.CB}`);
    console.log("Name CB",contactsBook.name);
    response.render('listContacts.ejs', { contactsBooks: apps.filesDirectory(),contactsBooksL: contactsBook});
    

});

router.get('/eliminarContacto/:CB/:mobil',(request,response)=>{

   apps.deleteContact(`${request.params.CB}`,request.params.mobil);

   var contactsBook = apps.loadContacts(`${request.params.CB}`);

   //response.render('listContacts.ejs', {contactsBooksL: contactsBook, contactsBooks: apps.filesDirectory()});
   response.redirect('/home/'+`${request.params.CB}`);
});

router.get('/addContactBook',(request,response) =>{

    response.render('CreateContactBook.ejs',{contactsBooks: apps.filesDirectory(), mensaje:"hola"});

});

router.post('/addContactBook',(request,response)=>{
    
    let nameCB = request.body.name;

    var msj = apps.saveCB(nameCB);

    response.redirect('/addContactBook');
});

module.exports = router;

