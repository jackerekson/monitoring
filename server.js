const express = require('express')
const path = require('path');
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'e3635c339ce84e63b551ee7da8c88474',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []
const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req,res) =>{
    const {name} = req.body
    name = name.trim()

    students.push(name)
    
    rollbar.log('Studen added successfully', {author: 'Jack', type: 'manual entry'})

    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))