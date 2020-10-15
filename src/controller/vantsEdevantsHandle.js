export class VantDesvHandler{
    
    constructor(){
              
        this.vants ={};
        this.desvants={};
        this.init();
    }
    
    async init(){
        let data = await import('./vantsEdesvants.json').then(json=>{
            json.vantagens = this.vants
            json.desvantagens= this.desvants
        })

    }

    setVants(){

    }


}