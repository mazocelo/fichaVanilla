//var {vantagagens}= require('./vants&desvants.json');

class VantDesvHandler{
    
    constructor(){
        
        
        this.vants ={};
        this.desvants={};
        this.init();
    }

     init(){
        return new Promise((resolve,reject)=>{

            
        let json =  import('./vants&desvants.json').then(()=>{
            return resolve
        }).catch(err=>{
            return reject
        });
        })
        

    }

    setVants(){

    console.log(vantagens,desvantagens)
        
    }


}