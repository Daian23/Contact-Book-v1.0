class Contact{

    constructor(name,email,mobil,topList){
        this.name = name;
        this.email = email;
        this.mobil = mobil;
        this.topList = topList;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getEmail(){
        return this.email;
    }

    setEmail(){
        this.email = email;
    }

    getMobil(){
        return this.mobil;
    }

    setMobil(mobil){
        this.mobil = mobil;
    }

    getTopList(){
        return this.topList;
    }

    setTopList(topList){
        this.topList = topList;
    }


}

module.exports = {Contact};

