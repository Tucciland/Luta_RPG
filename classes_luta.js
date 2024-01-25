class PersonagemPadrao {
    _vida = 1
    vidaMaxima = 1
    ataque = 0
    defesa = 0
    cAtaque = 'img/ataque.jpg'
    cDefesa = 'img/defendeu.jpg'
    cTomou = 'img/tomou.jpg'
    cMorto = 'img/morte.jpg'
    _statusAtual = ''
    

    constructor(nome){
        this.nome = nome
    }

    get vida() {
        return this._vida
    }
    set vida(newVida) {
        this._vida =  newVida < 0 ? 0 : newVida
    }

    get statusAtual(){
        return this._statusAtual
    }
    set statusAtual(newStatusAtual){
        this._statusAtual = newStatusAtual
    }
}

class Guerreiro extends PersonagemPadrao {
    constructor(nome){
        super(nome)

        this.classe = "Guerreiro"
        this.foto = 'img/guerreiro.jpg'
        this.vida = 100
        this.ataque = 10
        this.defesa = 8
        this.vidaMaxima = this.vida
    }
}

class Mago extends PersonagemPadrao {
    constructor(nome){
        super(nome)

        this.classe = "Mago"
        this.foto = 'img/mago.jpg'
        this.vida = 80
        this.ataque = 15
        this.defesa = 3
        this.vidaMaxima = this.vida
    }
}

class monstroPequeno extends PersonagemPadrao {
    constructor() {
        super('Monstro Pequeno')

        this.foto = 'img/monstroP.jpg',
        this.vida = 40
        this.ataque = 4
        this.defesa = 4
        this.vidaMaxima = this.vida
    }
}

class monstroGrande extends PersonagemPadrao {
    constructor() {
        super('Monstro Grande')

        this.foto = 'img/monstroG.jpg'
        this.vida = 120
        this.ataque = 16
        this.defesa = 6
        this.vidaMaxima = this.vida
    }
}

class Senario {
    constructor(lutador1, lutador2, lutador1EL, lutador2EL, logObjetos){
        this.lutador1 = lutador1
        this.lutador2 = lutador2
        this.lutador1EL = lutador1EL
        this.lutador2EL = lutador2EL
        this.log = logObjetos
    }

    start(){
        this.update()

        this.lutador1EL.querySelector('.bt-ataque').addEventListener('click', ()=> this.atacando(this.lutador1,this.lutador2))
        this.lutador2EL.querySelector('.bt-ataque').addEventListener('click', ()=> this.atacando(this.lutador2,this.lutador1))
    }

    update(){
        //Lutador 1
        this.lutador1EL.querySelector('.nome').innerHTML = `${this.lutador1.classe} ${this.lutador1.nome} - ${this.lutador1.vida.toFixed(1)} HP`
        let f1vida = (this.lutador1.vida/this.lutador1.vidaMaxima)*100
        this.lutador1EL.querySelector('.foto').setAttribute('src', this.lutador1.foto);
        this.lutador1EL.querySelector('.evento').setAttribute('src', this.lutador1.statusAtual);
        this.lutador1EL.querySelector('.barra').style.width = `${f1vida}%`
        this.lutador1EL.querySelector('.defesa').innerHTML = `Defesa: ${this.lutador1.defesa}`
        this.lutador1EL.querySelector('.dano').innerHTML = `Dano: ${this.lutador1.ataque}`

        //Lutador 2
        this.lutador2EL.querySelector('.nome').innerHTML = `${this.lutador2.nome} - ${this.lutador2.vida.toFixed(1)} HP`
        let f2vida = (this.lutador2.vida/this.lutador2.vidaMaxima)*100
        this.lutador2EL.querySelector('.foto').setAttribute('src', this.lutador2.foto);
        this.lutador2EL.querySelector('.evento').setAttribute('src', this.lutador2.statusAtual);
        this.lutador2EL.querySelector('.barra').style.width = `${f2vida}%`
        this.lutador2EL.querySelector('.defesa').innerHTML = `Defesa: ${this.lutador2.defesa}`
        this.lutador2EL.querySelector('.dano').innerHTML = `Dano: ${this.lutador2.ataque}`
    }

    atacando(atacante, atacado) {
        if (atacante.vida <= 0) {
            this.log.addMensagem(`${atacante.nome} está morto.`)
            atacante.statusAtual = atacante.cMorto
            this.update()
            return
        }else if (atacado.vida <= 0) {
            this.log.addMensagem(`${atacado.nome} está morto.`)
            atacado.statusAtual = atacado.cMorto
            this.update()
            return
        }

        let fatorataque = (Math.random() * 2).toFixed(2)
        let fatordefesa = (Math.random() * 2).toFixed(2)

        let ataqueatual = atacante.ataque * fatorataque
        let defesaatual = atacado.defesa * fatordefesa
        this.log.addMensagem(`ataque: ${ataqueatual.toFixed(1)}`)
        this.log.addMensagem(`defesa: ${defesaatual.toFixed(1)}`)

        if (ataqueatual > defesaatual) {
            atacado.vida -=ataqueatual
            this.log.addMensagem(`${atacante.nome} causou ${ataqueatual.toFixed(2)} de dano em ${atacado.nome}.`)
            atacante.statusAtual = atacante.cAtaque
            atacado.statusAtual = atacado.cTomou
        }else {
            this.log.addMensagem(`${atacado.nome} defendeu.`)
            atacante.statusAtual = atacante.cAtaque
            atacado.statusAtual = atacado.cDefesa
        }

        this.update()
    }
}

class Log {
    list=[]
    areaLog = document.querySelector('.area-log');

    constructor(listEL){
        this.listEL = listEL
    }

    addMensagem(msg){
        this.list.push(msg)
        this.render()
    }

    render(){
        this.listEL.innerHTML = ''

        for (let i in this.list) {
            this.listEL.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}