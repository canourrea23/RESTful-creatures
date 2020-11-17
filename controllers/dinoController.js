const fs = require('fs')

const dinoRouter = require('express').Router()

dinoRouter.get('/', (req, res) => {
  const rawDinos = fs.readFileSync('./dinosaurs.json')
  const dinos = JSON.parse(rawDinos)
  
  res.render('dinosaurs/index', { dinos })
})

dinoRouter.get('/new', (req, res) => {
  res.render('dinosaurs/new')
})

dinoRouter.get('/:id', (req, res) => {
  const rawDinos = fs.readFileSync('./dinosaurs.json')
  const dinos = JSON.parse(rawDinos)
  const id = parseInt(req.params.id) - 1
  const dino = dinos[id]

  res.render('dinosaurs/show', { dino })
})

dinoRouter.post('/', (req, res) => {
  const newDino = req.body
  const rawDinos = fs.readFileSync('./dinosaurs.json')
  const dinos = JSON.parse(rawDinos)
  dinos.push(newDino)

  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

  res.redirect('/dinosaurs')
})

module.exports = dinoRouter