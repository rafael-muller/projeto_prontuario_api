const cadastroFisioterapeuta = require('../cadastro_fisioterapeuta')

function listar(req, res) {
    const listaFisioterapeuta = req.cadastroFisioterapeuta.listar();
    res.json(listaFisioterapeuta);
}

function buscarPorId(req,res) {
    const id = req.params.id;
    try{
        const fisioterapeuta = cadastroFisioterapeuta.buscarPorId(id);
        res.json(fisioterapeuta);
    } catch (err) {
        res.status(err.numero).json(err);
    }
}

function inserir(req, res) {
    const fisioterapeuta = req.body;

    try{
        const fisioterapeutaCadastrado = cadastroFisioterapeuta.inserir(fisioterapeuta);
        res.status(201).json(fisioterapeutaCadastrado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
}

function atualizar(req,res) {
    const id = req.params.id;
    const fisioterapeuta = req.body;
    try{
        const fisioterapeutaAtualizado = cadastroFisioterapeuta.atualizar(id,fisioterapeuta);
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