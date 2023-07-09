const cadastroFisioterapeuta = require('../cadastro_fisioterapeuta')
const repositoryFisioterapeuta = require('../repository/fisioterapeuta_repository')

async function listar(req, res) {
    
    const listaFisioterapeuta = await repositoryFisioterapeuta.listar();
    res.json(listaFisioterapeuta);
}

async function buscarPorId(req,res) {
    const id = req.params.id;
        const fisioterapeuta =  await repositoryFisioterapeuta.buscarPorId(id);
    if(fisioterapeuta){

        res.json(fisioterapeuta);

    } 
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Fisioterapeuta não encontrado."
            }
        );
    }
}

async function inserir(req, res) {
    const fisioterapeuta = req.body;
    //A estrutura try...catch deve ser utilizada em operações que podem falhar.
    if( fisioterapeuta.nome && fisioterapeuta.especialidade){
        const fisioterapeutaCadastrado = /*cadastroFisioterapeuta.inserir(fisioterapeuta);*/
            await repositoryFisioterapeuta.inserirFisioterapeuta(fisioterapeuta);
        //é utilizado como resposta de sucesso, indica que a requisição foi bem sucedida e que um novo recurso foi criado.
        res.status(201).json(fisioterapeutaCadastrado);

    }
    else {

        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros do Fisioterapeuta estão inválidos."
            }

        );
    }
}

function atualizar(req,res) {
    const id = req.params.id;
    const fisioterapeuta = req.body;

    try{
        const fisioterapeutaAtualizado = cadastroFisioterapeuta.atualizar(fisioterapeuta);
        res.json(fisioterapeutaAtualizado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }

}

function deletar(req,res) {
    const id = req.params.id;
    try{
        const fisioterapeutaExcluido = cadastroFisioterapeuta.deletar(id);
        res.json(fisioterapeutaExcluido);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir, 
    atualizar,
    deletar
}