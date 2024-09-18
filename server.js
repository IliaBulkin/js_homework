const express = require('express');
const app = express()


function getCurrentDate() {
    return new Date().toLocaleString(); 
}


app.get('/date', (req, res) => {
    const currentDate = getCurrentDate();
    console.log(currentDate); 
    res.send(`${currentDate}`); 
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});