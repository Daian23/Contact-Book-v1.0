var fs = require('fs');
const { fileURLToPath } = require('url');
const ClaseContact= require('./classContact');
const ClaseContactB = require('./classContactBook');

module.exports = class apps{

    constructor(){}

    static existsCB(nameCB){
       
        if(fs.existsSync("./files/"+nameCB+".txt")){
            console.log("El Contact Book EXISTE!");
        }else{
            console.log("El Contact Book NO EXISTE!");
                
            apps.saveCB(nameCB);
        }
        
    }
  
    static saveCB(nameCB){
        var msj = "";
        
        if(fs.existsSync("./files/"+nameCB+".txt")){
            msj = "El Contact Book EXISTE!";
        }else{
            
            fs.writeFileSync('./files/'+nameCB+'.txt',"",(error) =>{
                if(error){
                    console.log("No se pudo crear el archivo");
                }else{
                    console.log("Se creo el archivo");
                }
            })
            msj = "Contact Book Registrado con éxito!"
        }
        
        return msj;
    }

    

    static filesDirectory(){
        var files = fs.readdirSync('./files');
        console.log(files);
        for(let i=0;i<files.length;i++){
            files[i] = files[i].slice(0,-4);
        }
        return files;
    }

    static convertFavorite(topList){
        if(topList=="on"){
            topList = true;
        }else{
         topList = false;
        }
        return topList;
    }

    static validateInput(name,email,mobil,nameCB){
        var flag = false;
        if(name=="" || email=="" || mobil=="" || nameCB==""){
            flag = true;
        }
        console.log("flag->",flag);
        return flag;
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

    static saveContact(contactBName,contact){

        fs.appendFileSync('./files/'+contactBName+'.txt',contact + '|' ,(error) =>{
            if(error){
                console.log("No se pudo escribir el texto");
            }else{
                console.log("Escritura exitosa");
            }
        });
    
    }


    static loadContacts(nameCB){
        
        try {
            const stringContacts = fs.readFileSync('./files/'+nameCB+'.txt', 'utf-8');
           
            var contactBook = new ClaseContactB.ContactBook(nameCB,[]);

            let arrayContacts = stringContacts.split('|');

            arrayContacts.splice(-1, 1);

            for (let i=0;i<arrayContacts.length;i++){

                var contact = JSON.parse(arrayContacts[i]);

                console.log(contact);
            
                contactBook.addContact(new ClaseContact.Contact(contact.name,contact.email,contact.mobil,contact.topList));

            }
        } catch (err) {
            console.error(err);
        }

        return contactBook;
    }

    

    static deleteContact(nameCB,mobil){

        const arrayData = fs.readFileSync('./files/'+nameCB+'.txt', 'utf-8').split('|');
        
        arrayData.splice(-1, 1);
      
        for(let i=0;i<arrayData.length;i++){

            if(JSON.parse(arrayData[i]).mobil==mobil){
                arrayData.splice(i,1);
            }
        }
       
        if(arrayData.length == 0){
            fs.writeFileSync('./files/'+nameCB+'.txt','');
        }else{
            console.log("....",arrayData);
            const dataString = arrayData.join('|');
            fs.writeFileSync('./files/'+nameCB+'.txt', dataString+"|");
        }  
    }
}