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
        const fisioterapeutaCadastrado = 
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

async function atualizar(req,res) {
    const id = req.params.id;
    const fisioterapeuta = req.body;
    
    if(fisioterapeuta && fisioterapeuta.nome && fisioterapeuta.especialidade)
    {
        const fisioterapeutaAlterado = 
            await repositoryFisioterapeuta.atualizar(id, fisioterapeuta);
        if(fisioterapeutaAlterado){
            res.json(fisioterapeutaAlterado);
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
    else {
        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros do Fisioterapeuta estão inválidos"
            }
        );
    }
}


async function deletar(req,res) {
    const id = req.params.id;
    const fisioterapeutaDeletado = 
        await repositoryFisioterapeuta.deletar(id);
    if(fisioterapeutaDeletado){
        res.json(fisioterapeutaDeletado);
    }
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Fisioterapeuta nao encontrado."
            }
        );
    }       
}


module.exports = {
    listar,
    buscarPorId,
    inserir, 
    atualizar,
    deletar
}