const fs = require('fs')

const dinoRouter = require('express').Router()

dinoRouter.get('/', (req, res) => {
  const rawDinos = fs.readFileSync('./dinosaurs.json')
  const dinos = JSON.parse(rawDinos)
  
  res.render('dinosaurs/index', { dinos })
})

// new has to be above show, or else it will think that 'new' is an id value
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

dinoRouter.get('/search/:searchTerm', (req, res) => {
  const newDino = req.body
  const rawDinos = fs.readFileSync('./dinosaurs.json')
  const dinos = JSON.parse(rawDinos)
  const searchTerm = req.params.searchTerm

  // note that the details of the search are up to you!
  // do partial matches count? do we look at the type property as well as the name property?
  // this is a crude, 1st draft kind of search
  const filteredDinos = dinos.filter((dino) => dino.name.toLowerCase() == searchTerm.toLowerCase())

  console.log(searchTerm);
  console.log(dinos);
  console.log(filteredDinos);

  res.render('dinosaurs/index', { dinos: filteredDinos })
})

module.exports = dinoRouter
