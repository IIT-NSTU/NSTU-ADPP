const ethAirBalloons = require('ethairballoons')
const path = require('path')
const savePath = path.resolve(__dirname + '/contracts')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3001
app.use(cors());
app.use(bodyParser.json())

const ethAirBalloonsProvider = ethAirBalloons('http://127.0.0.1:7545', savePath)

const Car = ethAirBalloonsProvider.createSchema({
  name: 'certificate',
  contractName: 'certificateContract',
  properties: [
    {
      name: 'roll',
      type: 'bytes32',
      primaryKey: true,
    },
    {
      name: 'certificate_number',
      type: 'bytes32',
    },
    { name: 'cgpa', type: 'uint' },
  ],
})
Car.setAccount()
app.get('/', (_req, res) => {
  res.send('EthairBalloons CRUD API!')
})

app.get('/deploy', (_req, res) => {
  Car.deploy(function (err, _success) {
    if (!err) {
      res.send('Contract deployed successfully!')
    } else {
      res.send('Contract deployment error' + err)
    }
  })
})

app.post('/create', (req, res) => {
  console.log('request came')
  const newCarObject = req.body
  Car.save(newCarObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved)
    } else {
      res.json({ 'error': err })
    }
  })
})

app.patch('/update/:id', (req, res) => {
  const newCarObject = req.body
  Car.updateById(req.params.id, newCarObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved)
    } else {
      res.send(err)
    }
  })
})

app.get('/find', (_req, res) => {
  Car.find(function (err, allObjects) {
    if (!err) {
      res.json(allObjects)
    } else {
      res.send(err)
    }
  })
})

app.get('/find/:id', (req, res) => {
  Car.findById(req.params.id, function (err, found) {
    if (!err) {
      res.json(found)
    } else {
      res.send(err)
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  Car.deleteById(req.params.id, function (err, _found) {
    if (!err) {
      res.json({ message: 'Object deleted successfully' })
    } else {
      res.send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`EthairBalloons API listening at http://localhost:${port}`)
})
