class ContactBook{

    constructor(name,contacts=[]){
        this.name = name;
        this.contacts = contacts;
    }

    addContact(contact){
        this.contacts.push(contact);
    }

    listarCB(){
        for(let i =0;i<contacts.lenght;i++){
            console.log("Hola");
            console.log("---",contacts[i]);
        }
    }
}
module.exports = {ContactBook};