export class Personagem{

    constructor(força, habilidade, armadura, resistencia, pdf, vantagem, desvantagem){
        
        this.força = força;
        this.habilidade = habilidade;
        this.armadura = armadura ;
        this.resistencia = resistencia
        this.pdf = pdf ;
        this.vantagem = vantagem;
        this.desvantagem = desvantagem;
    }

    get força(){
        return this.força
    }

    get habilidade(){
        return this.habilidade
    }

    get armadura(){
        return this.armadura
    }

    get resistencia(){
        return this.resistencia
    }

    get armadura(){
        return this.armadura
    }

    get vantagem(){
        return this.vantagem
    }

    get desvantagem(){
        return this.desvantagem
    }


}