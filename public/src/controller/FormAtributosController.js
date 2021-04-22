class AtributosController extends FichaSettings {
    constructor() {
            super()
            this.elementos = {
                fogo: 0,
                ar: 0,
                terra: 0,
                agua: 0,
                luz: 0,
                trevas: 0,
            }
            this.atributos = {
                    força: 0,
                    habilidade: 0,
                    armadura: 0,
                    resistencia: 0,
                    pdf: 0,
                }
                //atrib-divs
            this.pontosDeAtributosEl = document.querySelectorAll('[id=pontos]');
            //botoes atributo
            this.icons = document.querySelectorAll('i')
            this.initEvents();
        }
        //inicialização     dos eventos
    initEvents() {
            this.criaEventoRenderDiv();
            this.criaEventBotao();
            if (this.availablePoints > 0) {
                this.setBotoes('minus', 'show');
                this.setBotoes('plus', 'show');
            } else {
                this.setBotoes('plus');
                this.setBotoes('minus');
            }
        }
        //eventos de botao
    criaEventBotao() {
            //icones atributo
            this.icons.forEach(icon => {
                let atriNome = icon.getAttribute('name')
                if (atriNome.includes('reduz')) {
                    icon.addEventListener('click', () => {
                        this.reduz(atriNome);
                        // this.ableTest(icon)

                    })
                } else {
                    icon.addEventListener('click', () => {
                        if (this.availablePoints > 0) {
                            this.soma(atriNome)
                                // this.ableTest(icon)
                                //  console.log(this.availablePoints)
                        } else {
                            alert('acabou os pontos');
                            // console.log(this.availablePoints)
                        }
                    })
                }
            })
        }
        //setting pra todos botoes de atributo, MEXE EM TODOS OS BOTÕES AO MESMO TEMPOS 
    setBotoes(botao, estado) {
            switch (botao) {
                case 'minus':
                    this.icons.forEach(icon => {
                        if (icon.getAttribute('name').includes('reduz')) {
                            estado == 'show' ? icon.style.display = 'block' : icon.style.display = 'none'
                        }
                    });
                    break;
                case 'plus':
                    this.icons.forEach(icon => {
                        if (icon.getAttribute('name').includes('soma')) {
                            estado == 'show' ? icon.style.display = 'block' : icon.style.display = 'none'
                        }
                    });
                    break;
                default:
                    break;
            }
        }
        //CONTROLE DE PONTOS TOTAIS DE ATRIBUTO NOS VALORES DA FICHA
    soma(atributo) {
        atributo = atributo.replace("soma ", "");
        console.log(this.atributos[atributo])
        if (this.isElemental(atributo)) {
            if (this.elementos[atributo] < this.maxPoints) {
                this.gastaPonto(1)
                this.elementos[atributo] = this.elementos[atributo] + 1
                this.criaBolinha(atributo)
            } else {
                return
            }
        } else {
            if (this.atributos[atributo] < this.maxPoints) {
                this.gastaPonto(1)
                this.atributos[atributo] = this.atributos[atributo] + 1
                this.criaBolinha(atributo)
            } else {
                return
            }
        }

    }
    reduz(atributo) {
            atributo = atributo.replace("reduz ", "");
            if (this.isElemental(atributo)) {
                if (this.elementos[atributo] > 0) {
                    this.elementos[atributo] = this.elementos[atributo] - 1
                    this.removeBolinha(atributo)
                    this.devolvePonto(1)
                } else {
                    return
                }
            } else {
                if (this.atributos[atributo] > 0) {
                    this.atributos[atributo] = this.atributos[atributo] - 1
                    this.removeBolinha(atributo)
                    this.devolvePonto(1)
                } else {
                    return
                }
            }

        }
        //redndezeriza as bolinhas de atributo inicalmenetE conforme os valores INCIAIS da ficha
    criaEventoRenderDiv() {
            this.pontosDeAtributosEl.forEach(div => {
                let atributo = div.getAttribute('name')
                if (this.atributos[atributo] > 0) {
                    var pontos = this.atributos[atributo]
                    let i = 1
                    for (i > 1; i <= pontos; i++) { this.criaBolinha(atributo) }
                }
            })
        }
        //função para fazer um incone de atributo + ou - desaparecer
    getAttributeIcon(atributo, noneOrBlock) {
            this.icons.forEach(icon => {

                if (icon.getAttribute('name') === atributo) {
                    if (noneOrBlock) {
                        icon.style.display = noneOrBlock
                    }
                }
            })
        }
        //CRIAÇAO E REMOÇÃO DO DESENHO DE ATRIBUTO
    criaBolinha(atributo) {
        this.pontosDeAtributosEl.forEach(div => {
            if (div.getAttribute('name') == atributo) {
                const bolinha = document.createElement('div');
                bolinha.classList.add('atriBolinha');
                div.appendChild(bolinha);
            }
        })
    }
    removeBolinha(atributo) {
            this.pontosDeAtributosEl.forEach(div => {
                if (div.getAttribute('name') == atributo) {
                    let ultima = div.childNodes.length - 1
                    if (div.childNodes.length > 0) {
                        div.removeChild(div.childNodes[ultima])
                    } else {
                        return
                    }
                }
            })
        }
        //CONTROLE DE PONTOS DISPONIVEIS NOS ATRIBUTOS, PELOS EVENTOs DE BOTÃO
    isElemental(atributo) {
        let teste = false
        Object.keys(this.elementos).forEach(elemento => {
            if (atributo == elemento) {
                return teste = true;
            }
        })
        return teste;

    }

}