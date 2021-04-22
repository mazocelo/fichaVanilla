class FichaController extends EspeciaisController{
    
    constructor(){
        super()
        this.nomeDoPersonagem =document.querySelector('input.char-name')
        this.newCharButton = document.querySelector('button.criar-per')
        this.history= document.querySelector('textarea.history')
        this.init()
    }
    init(){
        this.newCharButton.addEventListener("click",(event)=>{
            event.preventDefault();
            this.checkAbleChar();
            let atr =this.atributos;
            let ele = this.elementos;
            const char = new Personagem(
                atr['força'],
                atr['habilidade'],
                atr['resistencia'],
                atr['armadura'],
                atr['pdf'],
                ele['fogo'],
                ele['ar'],
                ele['terra'],
                ele['agua'],
                ele['luz'],
                ele['trevas'],
                )
              HttpRequest.post('/newcharacter',char)
          })
    }
    
    checkAbleChar(){
    }
  
}