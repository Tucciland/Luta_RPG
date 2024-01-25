let personagem = new Mago('Alek San')
let monstro = new monstroGrande()
let log = new Log(document.querySelector('.area-log'))

const senario = new Senario(personagem, monstro, document.querySelector('#lutador'), document.querySelector('#monstro'), log)

senario.start()