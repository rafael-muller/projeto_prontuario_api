let listaFisioterapeuta = []; // declarando variável da lista de fisioterapeuta
let idAutoIncrement = 1; /* declaração de ID auto incremental para que o próximo profissional seja 
                       adicionado ao próximo ID.*/

// função para listar todos fisioterapeutas da lista
function listar(){
    return listaFisioterapeuta;
}

//função de inserção de profissional de fisioterapia, validando ID, nome, e especialidade
function inserir(fisioterapeuta){
    if(fisioterapeuta && fisioterapeuta.nome && fisioterapeuta.especialidade){
        fisioterapeuta.id = idAutoIncrement++;
        listaFisioterapeuta.push(fisioterapeuta);
        return fisioterapeuta;
    }
    else{
        // instrução que permite criar um erro personalizado.
        throw({
            numero: 400,
            msg: "Erro: Os dados do fisioterapeuta estão inválidos!"
        });
    }

}
//função para buscar o profissional por id, validando os dados do cadastro
function buscarPorId(id){
    for(let fisioterapeuta of listaFisioterapeuta){
        if(fisioterapeuta.id == id){
            return fisioterapeuta;
        }
    }
    throw({
        numero: 404,
        msg: "Erro: Profissional não encontrado, tente novamente!"
    });


}

//função para atualizar o profissional de fisioterapia
function atualizar(id, fisioterapeutaAlterar){
    //validação dos dados do fisioterapeuta (OU).
    if(!fisioterapeutaAlterar || !fisioterapeutaAlterar.nome || !fisioterapeutaAlterar.especialidade){
        throw({
            numero: 400,
            msg: "Erro: Os dados do profissional estão invávlidos!"
        });
    }
    for(let indice in listaFisioterapeuta){
        if(listaFisioterapeuta[indice].id == id){
            fisioterapeutaAlterar.id = parseInt(id);
            listaFisioterapeuta[indice] = fisioterapeutaAlterar;
            return listaFisioterapeuta[indice];
        }
    }
    throw({
        numero: 404,
        msg: "Erro: Fisioterapeuta não encontrado.!"
    });

}

function deletar(id){
    for(let indice in listaFisioterapeuta){
        if(listaFisioterapeuta[indice].id == id){
            const fisioterapeutaExcluído = listaFisioterapeuta.splice(indice,1);
            return fisioterapeutaExcluído[0];
        }
    }
    throw({
        numero: 404,
        msg: "Erro: Fisioterapeuta não encontrado! "
    });

}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}