class EspeciaisController extends AtributosController {

    constructor() {
        super()
        this.meusEspeciais = {
                vantagem: [],
                desvantagem: [],
                super: [],
                unica: "",
            }
            //seleção de espciais
        this.vantsUnicasEl = document.querySelector('#select-vant-uni')
        this.superPoderEl = document.querySelector('#select-super-poder')
        this.vantagensEl = document.querySelector('#select-vantagem');
        this.desvantagensEl = document.querySelector('#select-desvantagem');

        //botoes de epeciais
        this.botaoVant = document.querySelector('#adiciona-vantagem')
        this.botaoDesvant = document.querySelector('#adiciona-desvantagem')
        this.botaoSuperPoder = document.querySelector('#adiciona-super-poder')
        this.botaoUni = document.querySelector('#adiciona-vant-uni')

        //painel de epseciais
        this.desvPanel = document.querySelector('#desv-panel')
        this.unicaPanel = document.querySelector('#vant-uni-panel')
        this.vantPanel = document.querySelector('#vant-panel')
        this.superpanel = document.querySelector('#super-poder-panel')
            //preview de espciais
        this.previewEl = document.querySelector('#preview')
        this.initVantsEDesvants();
    }
    async initVantsEDesvants() {


        HttpRequest.get('/desvantagem').then(data => {
            data.forEach((obj) => {
                this.desvantagensEl.appendChild(this.criaUmaOption(obj));
            })
        })
        HttpRequest.get('/superpoder').then(data => {
            data.forEach((obj) => {
                this.superPoderEl.appendChild(this.criaUmaOption(obj));
            })
        })
        HttpRequest.get('/vantagens').then(data => {
            data.forEach((obj) => {
                this.vantagensEl.appendChild(this.criaUmaOption(obj));
            })
        })
        HttpRequest.get('/unicas').then(data => {
            data.forEach((obj) => {
                this.vantsUnicasEl.appendChild(this.criaUmaOption(obj));
            })
        })


        //LISTENER dos botões de Vantagem
        //botao que adiiciona

        this.botaoDesvant.addEventListener('click', e => {
            e.preventDefault()
            this.adicionarVantOuDesvant('des')
        });
        this.botaoVant.addEventListener('click', e => {
            e.preventDefault()
            this.adicionarVantOuDesvant('van')
        });

        this.botaoUni.addEventListener('click', e => {
            e.preventDefault()
            this.adicionarVantOuDesvant('uni')
        });
        this.botaoSuperPoder.addEventListener('click', e => {
            e.preventDefault()
            this.adicionarVantOuDesvant('sup')
        });


        //EVENTO SELECT DE  preview
        this.vantagensEl.addEventListener('change', e => {
            this.setPreviewEl(this.vantagensEl);
        })
        this.desvantagensEl.addEventListener('change', e => {
            this.setPreviewEl(this.desvantagensEl);
        })
        this.superPoderEl.addEventListener('change', e => {
            this.setPreviewEl(this.superPoderEl);
        })
        this.vantsUnicasEl.addEventListener('change', e => {
            this.setPreviewEl(this.vantsUnicasEl);
        })
    }

    //cria as options de vantagens e desvantagens
    criaUmaOption(obj) {
            var option = document.createElement('option')
            option.innerHTML = obj.name
            option.dataset.cost = this.testaCusto(obj.cost);
            option.dataset.descr = obj.description
            option.name = obj.name;
            return option
        }
        //PREVIEW DOS SELECTS faz as descrições aparecerem na tela
    setPreviewEl(este) {
            var prevDivi = document.createElement('div')
            var previewValue = este.selectedOptions[0].dataset.descr

            this.apagaPrevieEl();
            this.previewEl.style.display = 'block'
                //prevDivi.classList.add('form')
            prevDivi.innerHTML = previewValue
            this.previewEl.appendChild(prevDivi)
                // console.log(inputD,'preview')
        }
        //apagar a preview da tela
    apagaPrevieEl() {
        this.previewEl.removeChild(this.previewEl.childNodes[0])
    }

    //botões de adicionar poderes especiais
    adicionarVantOuDesvant(especial) {
            switch (especial) {
                case 'des':
                    let selectedDesv = this.desvantagensEl.selectedOptions[0]
                    if (this.testeDeEspecial(selectedDesv, 'desvantagem')) {
                        if (isNaN(selectedDesv.dataset.cost)) {
                            alert('WORKING ON IT...');
                        } else {
                            this.availablePoints = this.availablePoints + parseInt(selectedDesv.dataset.cost)
                            this.insereEspecial(selectedDesv, this.desvPanel)
                        }
                    } else {
                        alert('Você não tem pontos ou já escolheu este especial')
                    }
                    break;
                case 'van':
                    let selectedVant = this.vantagensEl.selectedOptions[0]
                    if (this.testeDeEspecial(selectedVant, 'vantagem')) {
                        if (isNaN(selectedVant.dataset.cost)) {
                            alert('WORKING ON IT...');
                        } else {
                            this.availablePoints = this.availablePoints - parseInt(selectedVant.dataset.cost)
                            this.insereEspecial(selectedVant, this.vantPanel)

                        }
                    } else {
                        alert('Você não tem pontos ou já escolheu este especial')
                    }
                    break;
                case 'uni':
                    let selectedUni = this.vantsUnicasEl.selectedOptions[0];
                    if (this.testeDeEspecial(selectedUni, 'unica')) {
                        if (isNaN(selectedUni.dataset.cost)) {
                            alert('WORKING ON IT...');
                        } else {
                            this.availablePoints = this.availablePoints - parseInt(selectedUni.dataset.cost)
                            this.insereEspecial(selectedUni, this.unicaPanel)

                        }
                    } else {
                        alert('Você não tem pontos ou já escolheu este especial')
                    }
                    break;
                case 'sup':
                    let selectedSup = this.superPoderEl
                    if (this.testeDeEspecial(selectedSup, 'super')) {
                        if (isNaN(selectedSup.dataset.cost)) {
                            alert('WORKING ON IT...');
                        } else {
                            this.availablePoints = this.availablePoints - parseInt(selectedSup.dataset.cost)
                            this.insereEspecial(selectedSup, this.superpanel)


                        }
                    } else {
                        alert('Você não tem pontos ou já escolheu este especial')
                    }
                    break;
                default:
                    break;
            }
        }
        //testa o valor de custo dos poderes especiais
    testaCusto(string) {
        var teste = string.replace(/([^\d])+/gim, '')
        teste = parseInt(teste, 10)
        if (isNaN(teste)) {
            teste = "Especial"
        }
        if (teste >= 10) {
            teste = "Variavel"
        }
        return teste
    }

    //testa se pode selecionar a habilidade
    testeDeEspecial(especial, categoria) {
            let confirm = true
            let custo = parseInt(especial.dataset.cost)
            if (this._availablePoints >= custo) {
                if (Array.isArray(this.meusEspeciais[categoria])) {
                    if (categoria == 'desvantagem') {
                        console.log(this._availablePoints, custo)
                        this._availablePoints + custo > this._setPoints ? confirm = false : confirm = true

                    }


                    this.meusEspeciais[categoria].forEach((espcCateg) => {
                        if (espcCateg == especial.name) {
                            confirm = false
                        }
                    })

                } else {
                    this.meusEspeciais[categoria].length > 1 ? confirm = false : confirm = true
                }
            } else {
                confirm = false
            }
            return confirm
        }
        //insere na ficha a habilidade
    insereEspecial(option, tabela) {
        let nova = document.createElement('div')
        let name = tabela.parentNode.getAttribute('name')
        nova.classList.add('divisor')
        nova.innerHTML = option.name
        tabela.appendChild(nova)

        //this.testeDeEspecial()
        console.log(name, this._availablePoints, this.meusEspeciais)

        //
        if (name == 'unica') this.meusEspeciais[name] = option.name
        else this.meusEspeciais[name].push(option.name);

    }


    removeEspecial(especial, tabela) {

    }


}