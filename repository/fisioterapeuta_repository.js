const {Client} = require('pg');
const conexao = {
  user: 'postgres', 
  password: 'root',
  host: 'localhost',
  database: 'cadastro_fisioterapeuta', 
  port: 5432
};

async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM fisioterapeuta')
    const listaFisioterapeutas = res.rows;
    await cliente.end();
    return listaFisioterapeutas;
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM fisioterapeuta WHERE id=$1',[id]);
    const listaFisioterapeutas = res.rows[0];
    await cliente.end();
    return listaFisioterapeutas;
}

async function inserirFisioterapeuta(fisioterapeuta){
  const sql = 'INSERT INTO fisioterapeuta (nome, especialidade) VALUES ($1, $2) RETURNING *'
  const values = [fisioterapeuta.nome, fisioterapeuta.especialidade];

  const cliente = new Client(conexao);
  await cliente.connect();
  const res = await cliente.query(sql,values);
  const fisioterapeutaInserido = res.rows[0];
  await cliente.end();
  return fisioterapeutaInserido; 


}

module.exports = {
    listar,
    buscarPorId,
    inserirFisioterapeuta
}