const fs = require('fs')

const cryptRouter = require('express').Router()

cryptRouter.get('/', (req, res) => {
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const crypts = JSON.parse(rawCryptids)
  
  res.render('cryptids/index', { crypts })
})

cryptRouter.get('/new', (req, res) => {
  res.render('cryptids/new')
})

cryptRouter.get('/:id', (req, res) => {
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const crypts = JSON.parse(rawCryptids)
  const id = parseInt(req.params.id) - 1
  const crypt = crypts[id]

  res.render('cryptids/show', { crypt })
})

cryptRouter.post('/', (req, res) => {
  const newCrypt= req.body
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const crypt = JSON.parse(rawCryptids)
  crypt.push(newCrypt)

  fs.writeFileSync('./cryptids.json', JSON.stringify(crypt))

  res.redirect('/cryptids')
})

module.exports = cryptRouter