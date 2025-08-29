const express = require('express')
const router = express.Router()
const app = express()
app.use((req, res) => {
    console.log('Middleware executed')
    res.send('Hello from middleware')
});

app.get('/', (req, res) => {
    res.send('Hello World')}
)
app.get('/api', (req, res) => {
    res.send('Hello from API')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
