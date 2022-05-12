var fs = require('fs');
const ClaseContactBook = require('./ClaseContactBook');
const ClaseContact = require('./ClaseContact');

module.exports = class apps{

    constructor(){}

    convertFavorite(topList){
       if(topList=="on"){
           topList = true;
       }else{
        topList = false;
       }
       return topList;
    }

    static filesDirectory(){
        var files = fs.readdirSync('./archivos');
        
        return files;
    }

    static saveContact(contactBName,contacts){

        fs.appendFileSync('./archivos/'+contactBName,contacts + '|' ,(error) =>{
            if(error){
                console.log("No se pudo escribir el texto");
            }else{
                console.log("Escritura exitosa");
            }
        });
    
    }

    static existsCB(nameCB){
       
        if(fs.existsSync("./archivos/"+nameCB+".txt")){
            console.log("El Contact Book EXISTE!");
        }else{
            console.log("El Contact Book NO EXISTE!");
                
            apps.saveCB(nameCB);
        }
        
    }
  
    static saveCB(nameCB){
        fs.writeFile('./archivos/' + nameCB + '.txt',(error) =>{
            if(error){
                console.log("No se pudo crear el Contact Book");
            }else{
                console.log("Contact Book creado con exito!");
            }
        });
    }

    static validateMobil(nameCB,mobil){
        
        var flag = false;

        var array = apps.loadContacts(nameCB);
     
        for(let i = 0;i < array.contacts.length;i++){
           
            if(array.contacts[i].mobil == mobil){
                flag = true;
            }
        }

        return flag;
    }

    static loadContacts(nameCB){
        
        try {
            const stringContacts = fs.readFileSync('./archivos/'+nameCB, 'utf-8');
           
            var contactBook = new ClaseContactBook.ContactBook(nameCB,[]);

            let arrayContacts = stringContacts.split('|');

            arrayContacts.splice(-1, 1);

            for (let i=0;i<arrayContacts.length;i++){

                var contact = JSON.parse(arrayCBs[i]);

                console.log(contact);
            
                contactBook.addContact(new ClaseContact.Contact(contact.name,contact.email,contact.mobil,contact.topList));

            }
        } catch (err) {
            console.error(err);
        }

        return contactBook;
    }

    static deleteContact(nameCB,mobil){

        const arrayData = fs.readFileSync('./archivos/'+nameCB, 'utf-8').split('|');
        
        arrayData.splice(-1, 1);
      
        for (let i=0;i<arrayData.length;i++){

            if(JSON.parse(arrayData[i]).mobil==mobil){
                arrayData.splice(i,1);
            }
        }
       
        if(arrayData.length == 0){
            fs.writeFileSync('./archivos/'+nameCB,'');
        }else{
            console.log("....",arrayData);
            const dataString = arrayData.join('|');
            fs.writeFileSync('./archivos/'+nameCB, dataString+"|");
        }  
    }
}