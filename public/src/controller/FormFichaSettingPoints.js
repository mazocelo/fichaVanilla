class FichaSettings {
    constructor() {
        this._setPoints = 10
        this._availablePoints = this._setPoints;
        this._maxPoints = 4;
    }
    get availablePoints() {
        return this._availablePoints
    }
    set availablePoints(value) {
        return this._availablePoints = value
    }

    get maxPoints() {
        return this._maxPoints
    }
    set maxPoints(value) {
        return this._maxPoints = value
    }
    gastaPonto(valor) {
        return this.availablePoints = this.availablePoints - valor
    }

    devolvePonto(valor) {
        return this.availablePoints = this.availablePoints + valor
    }

}