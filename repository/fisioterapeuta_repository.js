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

async function atualizar(id, fisioterapeuta) {
  const sql = 'UPDATE fisioterapeuta set nome=$1, especialidade=$2 WHERE id=$3 RETURNING *'
  const values = [fisioterapeuta.nome, fisioterapeuta.especialidade, id];

  const cliente = new Client(conexao);
  await cliente.connect();
  const res = await cliente.query(sql,values);
  const fisioterapeutaAtualizado = res.rows[0];
  await cliente.end();
  return fisioterapeutaAtualizado;    
}




async function deletar(id) {
  const sql = 'DELETE FROM fisioterapeuta WHERE id=$1 RETURNING *'
  const values = [id];

  const cliente = new Client(conexao);
  await cliente.connect();
  const res = await cliente.query(sql,values);
  const fisioterapeutaDeletado = res.rows[0];
  await cliente.end();
  return fisioterapeutaDeletado;    
}




module.exports = {
    listar,
    buscarPorId,
    inserirFisioterapeuta,
    atualizar,
    deletar
}