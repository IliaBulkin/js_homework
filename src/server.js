const express = require('express');
const app = express()
const path = require('path')

app.use('/static/', express.static(path.join(__dirname, 'static')))

function getCurrentDate() {
    return new Date().toLocaleString(); 
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
})

app.get('/date', (req, res) => {
    const currentDate = getCurrentDate();
    console.log(currentDate); 
    res.send(`${currentDate}`); 
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});