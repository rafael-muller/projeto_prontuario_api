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
        //indica que a URL solicitada não pode ser encontrada no servidor
        numero: 404,
        msg: "Erro: Profissional não encontrado, tente novamente!"
    });


}

//função para atualizar o profissional de fisioterapia
function atualizar(fisioterapeutaAlterar){
    //validação dos dados do fisioterapeuta (OU).
    if(!fisioterapeutaAlterar.nome || !fisioterapeutaAlterar.especialidade  || !fisioterapeutaAlterar.id ){
        throw({
            //é um código de erro exibido quando um navegador web envia uma solicitação incorreta para um servidor web
            numero: 400,
            msg: "Erro: Os dados do profissional estão invávlidos!"
        });
    }

    for(let indice in listaFisioterapeuta){
        if(listaFisioterapeuta[indice].id == fisioterapeutaAlterar.id){
            //linha abaixo adicionada para segurar id no momento da alteração
            //fisioterapeutaAlterar.id = id;
            listaFisioterapeuta[indice] = fisioterapeutaAlterar;
            return listaFisioterapeuta[indice];

        }
     

    }
    throw({
        //indica que a URL solicitada não pode ser encontrada no servidor
        numero: 404,
        msg: "Erro: Fisioterapeuta não encontrado.!"
    });


   /*let test = listaFisioterapeuta.filter((fisio)=> fisio.id == id)
   test.nome = fisioterapeutaAlterar.nome
   test.especialidade = fisioterapeutaAlterar.especialidade

   console.log(fisioterapeutaAlterar)
   console.log(test)
*/
}

function deletar(id){
    for(let indice in listaFisioterapeuta){
        if(listaFisioterapeuta[indice].id == id){
            const fisioterapeutaExcluído = listaFisioterapeuta.splice(indice,1);
            return fisioterapeutaExcluído[0];
        }
    }
    throw({
        //indica que a URL solicitada não pode ser encontrada no servidor
        numero: 404,
        msg: "Erro: Fisioterapeuta não encontrado! "
    });

}
//um objeto em um arquivo Node.js que contém os valores e funções exportados desse módulo
module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}