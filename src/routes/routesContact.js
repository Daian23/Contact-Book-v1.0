const express = require('express');
const processingFiles = require('../processingFiles');
const classContact = require('../classContact');

const router = express.Router();

router.get('/addContact',(request,response) =>{

    response.render('addContact.ejs',{contactsBooks: processingFiles.filesDirectory(),mensaje:""});
   
});

router.post('/addContact',(request,response)=>{
    
    let name = request.body.name;
    let email = request.body.email;
    let mobil = request.body.mobil;
    let topList = request.body.topList;
    let contactBook = request.body.ContactB;

    var msj = "";

    if(processingFiles.validateInput(name,email,mobil,contactBook)){
        msj = "Los campos no pueden estar vacíos";
    }else {
        if(processingFiles.validateMobil(contactBook,mobil)){
            msj="Este contacto no fue registrado porque ya existe";
        }else{
            var tp = processingFiles.convertFavorite(topList);
            var contact = new classContact.Contact(name,email,mobil,tp);
            processingFiles.saveContact(contactBook,JSON.stringify(contact));
            msj="Contacto registrado con exito";
        }
    }

    response.render('addContact.ejs',{contactsBooks: processingFiles.filesDirectory(),mensaje:msj});

});

//Muestra la lista de Contactos
router.get('/home/:CB',(request,response) =>{

    console.log(`${request.params.CB}`);

    var contactsBook = processingFiles.loadContacts(`${request.params.CB}`);
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

//Eliminar un contact 
router.get('/deleteContact/:CB/:mobil',(request,response)=>{

    processingFiles.deleteContact(`${request.params.CB}`,request.params.mobil);
 
    response.redirect('/home/'+`${request.params.CB}`);
});

module.exports = router;