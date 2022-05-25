const express = require('express');
const router = express.Router();
const ClaseContact = require('../ClaseContact');
const ClaseContactBook = require('../ClaseContactBook');
const apps = require('../models/prueba');

router.get('/',(request,response) =>{
    response.render('menu.ejs');
});

router.get('/addContact',(request,response) =>{

    response.render('addContact.ejs',{contactsBooks: apps.filesDirectory(),mensaje:""});
   
});
//PRUEBA
router.get('/contactsBooks',(request,response) =>{

    response.render('contactsBooks.ejs', {contactsBooks: apps.filesDirectory()});
   
});

router.post('/addContact',(request,response)=>{
    
    let name = request.body.name;
    let email = request.body.email;
    let mobil = request.body.mobil;
    let topList = request.body.topList;
    let contactBook = request.body.ContactB;
    console.log("---",name);

    var msj = "";

    if(apps.validateInput(name,email,mobil,contactBook)){
        msj = "Los campos no pueden estar vacíos"
    }else {
        if(apps.validateMobil(contactBook,mobil)){
            msj="Este contacto no fue registrado porque ya existe";
        }else{
            var tp = apps.convertFavorite(topList);
            var contact = new ClaseContact.Contact(name,email,mobil,tp);
            apps.saveContact(contactBook,JSON.stringify(contact));
            msj="Contacto registrado con exito";
        }
    }

    response.render('addContact.ejs',{contactsBooks: apps.filesDirectory(),mensaje:msj});
    //response.render('/addContact');

});
//Muestra la lista de Libretas de Contactos
router.get('/home/:CB',(request,response) =>{

    console.log(`${request.params.CB}`);

    var contactsBook = apps.loadContacts(`${request.params.CB}`);
    contactsBook.contacts.sort(function (a, b) {
        if (a.topList < b.topList) {
          return 1;
        }
        if (a.topList > b.topList) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    console.log("Name CB",contactsBook.name);
    response.render('listContacts.ejs', {contactsBooksL: contactsBook});
    

});
//Eliminar un Contact Book
router.get('/deleteContact/:CB/:mobil',(request,response)=>{

   apps.deleteContact(`${request.params.CB}`,request.params.mobil);

   //var contactsBook = apps.loadContacts(`${request.params.CB}`);

   response.redirect('/home/'+`${request.params.CB}`);
});

//Muestra la vista del Contact Book
router.get('/addContactBook',(request,response) =>{

    response.render('CreateContactBook.ejs',{mensaje:""});

});
//Guardar una libreta de contacto
router.post('/addContactBook',(request,response)=>{
    
    let nameCB = request.body.name;

    var msj;

    if(nameCB==""){
      msj = "El campo no puede estar vacío!"
    }else{
      msj = apps.saveCB(nameCB);
    }
    
    response.render('CreateContactBook.ejs',{mensaje:msj});
});

module.exports = router;

