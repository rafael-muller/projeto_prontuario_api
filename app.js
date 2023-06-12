
const express = require('express');
const fisioterapeutaRota = require('../rotas/fisioterapeuta_rotas')

const app = express();
const PORTA = 3000;

app.use((express.json()));

app.use('/fisioterapeuta', fisioterapeutaRota);

app.listen(PORTA, () =>{
    console.log("Server iniciado com sucesso...!")
})