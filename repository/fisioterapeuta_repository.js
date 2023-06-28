const {Client} = require('pg');

const cliente = new Client({

  user: 'postgres', 
  password: 'root',
  host: 'localhost',
  database: 'cadastro_fisioterapeuta', 
  port: 5432

})

async function listar() {
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM fisioterapeuta');
    const listaFisioterapeutas = res.rows;
    await cliente.end();
    return listaFisioterapeutas;
}

module.exports = {
    listar
}