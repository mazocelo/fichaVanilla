class FichaController extends EspeciaisController {

    constructor() {
        super()
        this.nomeDoPersonagem = document.querySelector('input.char-name')
        this.newCharButton = document.querySelector('button.criar-per')
        this.history = document.querySelector('textarea.history')
        this.init()
    }
    init() {
        this.newCharButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.checkAbleChar();
            let nome = this.nomeDoPersonagem.value;
            let atr = this.atributos;
            let ele = this.elementos;
            let especiais = this.meusEspeciais
            const char = new Object({ nome, atributos: atr, elementos: ele, especiais })

            //char.nome = this.nomeDoPersonagem
            HttpRequest.post('/newcharacter', char)
        })
    }

    checkAbleChar() {}

}