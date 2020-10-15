import {VantDesvHandler} from './vantsEdevantsHandle'
export class FichaController{
    constructor(){
        this.icons =  document.querySelectorAll('i')
        this.availablePoints= 10;
        this.maxPoints = 4;
        this.atributos= {
            força:0,
            habilidade:0,
            armadura:0,
            resistencia:0,
            pdf:0,

            }
        this.vantagensEl = document.querySelector('#select-vantagem')
        this.desvantagensEl= document.querySelector('#select-desvantagem')
        this.pontosDeAtributosEl = document.querySelectorAll('[id=pontos]')
        this.initEvents();
    }
//inicialização    
    initEvents(){
        this.criaEventoRenderDiv();
        this.criaEventBotaoAtr();
       
        if(this.availablePoints > 0){
            this.setBotoes('minus','show');
            this.setBotoes('plus','show');
        }
        else{
            this.setBotoes('plus');
            this.setBotoes('minus');
        }
        //console.log(this.vantagensEl)
    }
    criaEventBotaoAtr(){
        
        this.icons.forEach(icon=>{
            let atriNome = icon.getAttribute('name')
            if(atriNome.includes('reduz')){
                icon.addEventListener('click',()=>{
                   this.reduz(atriNome);
                   this.ableTest(icon)
                })
            }
            else{
                icon.addEventListener('click',()=>{
                    if(this.availablePoints){
                    this.soma(atriNome)
                    this.ableTest(icon)}
                    
                })
            }
        })
    }


   setBotoes(botao,estado){
      
        switch(botao) {
            case 'minus':
                this.icons.forEach(icon=>{
                    if(icon.getAttribute('name').includes('reduz')){
                        estado =='show' ? icon.style.display= 'block': icon.style.display= 'none'
                        }
                });
            break;
            case 'plus':
                this.icons.forEach(icon=>{
                    if(icon.getAttribute('name').includes('soma')){
                        estado == 'show' ? icon.style.display= 'block': icon.style.display= 'none'
                        }
                });
            break;
            default:
            break;
        }
    }
    soma(atributo){
        atributo = atributo.replace("soma ","");
        if(this.atributos[atributo] <=this.maxPoints){
            this.atributos[atributo] = this.atributos[atributo]+1
            this.criaBolinha(atributo)
            this.gastaPonto(1)
        }
        else{return}
        console.log(this.atributos[atributo])
        
    }
    reduz(atributo){
        atributo = atributo.replace("reduz ","");
        if(this.atributos[atributo] > 0){
            this.atributos[atributo] = this.atributos[atributo]-1
            this.removeBolinha(atributo)
            this.devolvePonto(1)
        }
        else{
           return
        }
        console.log(this.atributos[atributo])
    }
    criaEventoRenderDiv(){
        this.pontosDeAtributosEl.forEach(div=>{
            let atributo = div.getAttribute('name')
            
            if(this.atributos[atributo] > 0){
                
                var pontos = this.atributos[atributo]
                let i = 1
                for(i >1 ; i <= pontos; i++)
                {
                    this.criaBolinha(atributo)
                    //console.log('foi')
                }
            }
        })
   
    }


    getAttributeIcon(atributo , noneOrBlock){
        this.icons.forEach(icon=>{
           
            if(icon.getAttribute('name') === atributo){
                if (noneOrBlock){
                    icon.style.display = noneOrBlock
                 
                }
            }
          
        })
    }
    criaBolinha(atributo){
        this.pontosDeAtributosEl.forEach(div=>{
            if(div.getAttribute('name') == atributo) {
                const bolinha = document.createElement('div');
                bolinha.classList.add('atriBolinha');
                div.appendChild(bolinha);
            }
        })
    }

    removeBolinha(atributo){
        this.pontosDeAtributosEl.forEach(div=>{
            if(div.getAttribute('name') == atributo){
                let ultima = div.childNodes.length-1
                if(div.childNodes.length >0){
                    div.removeChild(div.childNodes[ultima])
                }
                else{
                    return
                }
            }
        })

    }
    ableTest(icon){
        var atr = icon.getAttribute('name')
        
        if(atr.includes("reduz")){
             var atributo = atr.replace("reduz ","soma ")
            var valorDoAtr = this.atributos[atributo.replace("soma ", "")] 
            //console.log(valorDoAtr)
            if(this.maxPoints >= valorDoAtr){
                this.getAttributeIcon(atributo, 'block')
                console.log('chegou')
            }
        }
        else{
            atr = atr.replace("soma ","")
            var valor = this.atributos[atr]
            valor >= this.maxPoints ? icon.style.display ='none' : icon.style.display ='block'
        }
    }
    

    //controlando os avaiable points
    gastaPonto(valor){
        return this.availablePoints = this.availablePoints-valor
    }

    devolvePonto(valor){
        return this.availablePoints = this.availablePoints+valor
    }


}