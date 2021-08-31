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
app.use(express.json())
app.use('/style'. express.static('./public/styles.css'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Jack'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('Student already exists')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`))