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
        //listener dos botões de vantagem
        var botaoVant = document.querySelector('#adiciona-vantagem')
        var botaoDesvant = document.querySelector('#adiciona-desvantagem')
        console.log(botaoDesvant,botaoVant)
        botaoDesvant.addEventListener('click', e=>{this.adicionarVantOuDesvant('des')})
        botaoVant.addEventListener('click', e=>{this.adicionarVantOuDesvant('van')})
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
        console.log(this.atributos)
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
        console.log(this.atributos)
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

    //CONTROLE DE PONTOS
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
    gastaPonto(valor){
        return this.availablePoints = this.availablePoints-valor
    }

    devolvePonto(valor){
        return this.availablePoints = this.availablePoints+valor
    }



    async initVantsEDesvants(){
        let data = await import('./vantsEdesvants.json').then(json=>{
           
            this.setVantsOnSelect(json);
            this.setDesvantsOnSelect(json);
      })
      
    }

    setVantsOnSelect(data){
        let vantagens =Object.entries(data.vantagens)
        var obj = {}
      
        vantagens.forEach(vant=>{
            obj['nome'] =vant[0]
            obj['objeto'] = vant[1]
            let option = document.createElement('option')
            option.innerHTML = obj.objeto.name
            option.dataset.descr = obj.objeto.description
            this.vantagensEl.appendChild(option)
            console.log()

        })
        
    }
    setDesvantsOnSelect(data){
        let desvantagens= Object.entries(data.desvantagens)
        var objeto = {}
        desvantagens.forEach(desvantagem=>{
            objeto['nome'] = desvantagem[0]
            objeto['objeto'] =desvantagem[1]
            let option = document.createElement('option')
            option.innerHTML = objeto.objeto.name
            this.desvantagensEl.appendChild(option)
        })
    }
    //botões de adicionar vantagem
    adicionarVantOuDesvant(desvan){
        if('van'){
            
        }
        if('des'){}

    }

}