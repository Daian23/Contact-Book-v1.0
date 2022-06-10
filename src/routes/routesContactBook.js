const express = require('express');
const ClaseContactBook = require('../classContactBook');
const apps = require('../processingFiles');

const router = express.Router();

router.get('/',(request,response) =>{
    response.render('menu.ejs');
});

//lista de libretas de contactos
router.get('/contactsBooks',(request,response) =>{

    response.render('listContactsBooks.ejs', {contactsBooks: apps.filesDirectory()});
   
});

//Muestra la vista del Contact Book
router.get('/addContactBook',(request,response) =>{

    response.render('CreateContactBook.ejs',{mensaje: ""});

});
//Guardar una libreta de contacto
router.post('/addContactBook',(request,response)=>{
    
    let nameCB = request.body.name;

    var msj;

    if(nameCB.trim()==""){
      msj = "El campo no puede estar vacío!"
    }else{
      msj = apps.saveCB(nameCB);
    }
    
    response.render('CreateContactBook.ejs',{mensaje:msj});
});

module.exports = router;

