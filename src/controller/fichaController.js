

class FichaController{
    constructor(){

        this.availablePoints= 10;
        this.maxPoints = 10;
        this.maxAtr =4;
        this.atributos= {}
        this.vantagens = {}
        this.desvantagens= {}
        this.pontosDeAtributosEl = document.querySelectorAll('[id=pontos]')
        this.initEvents();
    }
//inicialização    
    initEvents(){
        if(this.availablePoints > 0){
           this.mostraBotoes();
        }
        else{
            this.escondeBotoes();
        }
        new VantDesvHandler().init()
    }
    mostraBotoes(){
        var icons =  document.querySelectorAll('i')
        icons.forEach(icon=>{
            let atriNome = icon.getAttribute('name')
            if(atriNome.includes('reduz')){
                icon.addEventListener('click',()=>{
                    this.removeBolinha(atriNome);
                })
            }
            else{
                icon.addEventListener('click',()=>{
                    this.criaBolinha(atriNome)
                    new VantDesvHandler().setVants()
                })
            }
        })
    }
    escondeBotoes(){
       var icons =  document.querySelectorAll('i')
        icons.forEach(icon=>{
            icon.style.display= 'none';
        })
    }
    criaBolinha(atriNome){
        atriNome = atriNome.replace("soma ","");
        var pontosDispo = this.availablePoints;
        const div = document.createElement('div');
        div.classList.add('atriBolinha');

        this.pontosDeAtributosEl.forEach((atribute)=>{
            if(atribute.getAttribute('name') === atriNome){
                if(atribute.childNodes.length <this.maxPoints){
                atribute.appendChild(div);
                this.removeUmPonto();
            }
          }
        })
        if(pontosDispo <= 0){
            this.escondeBotoes();
        }
 
    }
    removeBolinha(atriNome){
        atriNome = atriNome.replace("reduz ","")
       
        this.pontosDeAtributosEl.forEach((atribute)=>{
            if(atribute.getAttribute('name') === atriNome){
                if(atribute.childNodes.length > 0){
                atribute.removeChild(atribute.childNodes[0])
                this.devolveUmPonto();
                }
          }
        })
    }
    removeUmPonto(){
        this.availablePoints = this.availablePoints-1
    }
    devolveUmPonto(){
        this.availablePoints = this.availablePoints+1
    }






}