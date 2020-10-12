class FichaController{
    constructor(){

        this.availablePoints= 10;
        this.maxPoints;
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

                })

            }
              
        })
    }

    escondeBotoes(){
       var icons =  document.querySelectorAll('i')
        icons.forEach(icon=>{
            icon.style.display= 'none'
           // console.log(icon)
        })
    
    }




    criaBolinha(atriNome){
        atriNome = atriNome.replace("soma ","")
       
        const div = document.createElement('div')
        div.classList.add('atriBolinha')

        this.pontosDeAtributosEl.forEach((atribute)=>{
            if(atribute.getAttribute('name') === atriNome){
                //console.log(div)
                atribute.appendChild(div)

          }
     
        })
    
    
    }

    removeBolinha(atriNome){
        atriNome = atriNome.replace("reduz ","")
       
        this.pontosDeAtributosEl.forEach((atribute)=>{
            if(atribute.getAttribute('name') === atriNome){
                if(atribute.childNodes.length > 0){
                atribute.removeChild(atribute.childNodes[0])
                }

          }
     
        
        })
    
       
    }





    

}

