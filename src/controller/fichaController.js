const vantUnicas = require('../seleções/vantsUnicas.json')
const vants = require('../seleções/vantagens.json')
const desvantagem = require('../seleções/desvantagens.json')
const superPoder =require('../seleções/SuperPoder.json')
export class FichaController{
    constructor(){
        //propriedades do jogo
        this.availablePoints= 10;
        this.maxPoints = 4;
        this.atributos= {
            força:0,
            habilidade:0,
            armadura:0,
            resistencia:0,
            pdf:0,

            }
        this.meusEspeciais= {
                vantagens:[],
                desvantagens:[],
                vantUnica :"",
                superPoder:[],
                }
        //elementos HTML
        this.icons =  document.querySelectorAll('i')
    
        this.vantsUnicasEl
        this.SuperPoderEl
        this.botaoVant = document.querySelector('#adiciona-vantagem')
        this.botaoDesvant = document.querySelector('#adiciona-desvantagem')
        this.vantagensEl = document.querySelector('#select-vantagem');
        this.desvantagensEl= document.querySelector('#select-desvantagem');
        this.pontosDeAtributosEl = document.querySelectorAll('[id=pontos]');
        this.previewEl =document.querySelector('#preview')
        this.initEvents();
    }
//inicialização    
    initEvents(){
        this.criaEventoRenderDiv();
        this.criaEventBotao();
        this.initVantsEDesvants()
        if(this.availablePoints > 0){
            this.setBotoes('minus','show');
            this.setBotoes('plus','show');
        }
        else{
            this.setBotoes('plus');
            this.setBotoes('minus');
        }
    }
    criaEventBotao(){
        //icones atributo
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
        //LISTENER dos botões de Vantagem
        this.botaoDesvant.addEventListener('click', e=>{
            e.preventDefault()
            this.adicionarVantOuDesvant('des')
        });
        this.botaoVant.addEventListener('click', e=>{
            e.preventDefault()
            this.adicionarVantOuDesvant('van')
        });
    
        this.vantagensEl.addEventListener('change',e=>{
            this.setPreviewEl(this.vantagensEl);
        })
        this.desvantagensEl.addEventListener('change',e=>{
            this.setPreviewEl(this.desvantagensEl);
        })
    }

    //MEXE EM TODOS OS BOTÕES AO MESMO TEMPOS 
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
    //CONTROLE DE PONTOS DE TOTAIS DE ATRIBUTO NOS VALORES DA FICHA
    soma(atributo){
        atributo = atributo.replace("soma ","");
        if(this.atributos[atributo] <=this.maxPoints){
            this.atributos[atributo] = this.atributos[atributo]+1
            this.criaBolinha(atributo)
            this.gastaPonto(1)
        }
        else{return}
        
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
        
    }
    //redndezeriza as bolinhas de atributo inicalmenet conforme os valores da ficha
    criaEventoRenderDiv(){ 
        this.pontosDeAtributosEl.forEach(div=>{
            let atributo = div.getAttribute('name')
            
            if(this.atributos[atributo] > 0){
                
                var pontos = this.atributos[atributo]
                let i = 1
                for(i >1 ; i <= pontos; i++)
                {
                    this.criaBolinha(atributo)
                }
            }
        })
    }
    //função para fazer um incone de atributo + ou - desaparecer
    getAttributeIcon(atributo , noneOrBlock){
        this.icons.forEach(icon=>{
           
            if(icon.getAttribute('name') === atributo){
                if (noneOrBlock){
                    icon.style.display = noneOrBlock
                }
            }
        })
    }

    //CRIAÇAO E REMOÇÃO DO DESENHO DE ATRIBUTO
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

    //CONTROLE DE PONTOS DISPONIVEIS
    ableTest(icon){
        var atr = icon.getAttribute('name')
        if(atr.includes("reduz")){
             var atributo = atr.replace("reduz ","soma ")
            var valorDoAtr = this.atributos[atributo.replace("soma ", "")] 
            //console.log(valorDoAtr)
            if(this.maxPoints >= valorDoAtr){
                this.getAttributeIcon(atributo, 'block')
                
            }
        }
        else{
            atr = atr.replace("soma ","")
            var valor = this.atributos[atr]
            valor >= this.maxPoints ? icon.style.display ='none' : icon.style.display ='block'
        }
    }
    gastaPonto(valor){
        return this.availablePoints = this.availablePoints-valor
    }

    devolvePonto(valor){
        return this.availablePoints = this.availablePoints+valor
    }


    //INVOÇÃO DAS VANTAGENS E DESVANTAGENS

    async initVantsEDesvants(){
    desvantagem.forEach((obj)=>{
            this.desvantagensEl.appendChild(this.criaUmaOption(obj));
        })
 
    superPoder.forEach((obj)=>{
            //this.SuperPoderEl.appendChild(this.criaUmaOption(obj));
        })  
    vants.forEach((obj)=>{
            this.vantagensEl.appendChild(this.criaUmaOption(obj));
        })
     
    vantUnicas.forEach((obj)=>{
            //this.vantsUnicasEl.appendChild(this.criaUmaOption(obj));
        
    })
    
    }
    testaCusto(string){
        var teste = string.replace(/([^\d])+/gim, '')
        teste = parseInt(teste,10)
        if(isNaN(teste)){
            teste = "Especial"
        }
        if(teste >=10){
            teste = "Variavel"
        }
        return teste
    }
    criaUmaOption(obj){
        var option = document.createElement('option')
        option.innerHTML = obj.name
        option.dataset.cost = this.testaCusto(obj.cost);
        option.dataset.descr = obj.description
        option.name = obj.name;
        return option
    }
    //PREVIEW DOS SELECTS
    setPreviewEl(este){
        var prevDivi= document.createElement('div')
        var previewValue = este.selectedOptions[0].dataset.descr
            
        this.apagaPrevieEl();
        this.previewEl.style.display ='block'
          //prevDivi.classList.add('form')
        prevDivi.innerHTML = previewValue
        this.previewEl.appendChild(prevDivi)
       // console.log(inputD,'preview')
    }
    apagaPrevieEl(){
        this.previewEl.removeChild(this.previewEl.childNodes[0])
    }
    //botões de adicionar vantagem

    adicionarVantOuDesvant(q){
        switch(q){
            case'des':
                document.
                this.desvantagensEl.selectedOptions[0].name
                break;
            case'van':
                this.vantagensEl.selectedOptions[0].name
                break;
            case'uni':
                break;
            case'sup':
                break;
            default:
                break;            
        }
        console.log()        
    }
   
}