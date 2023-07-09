let listaPaciente = []; // declarando lista de Paciente
let idAutoIncrement = 1; /* declaração de ID auto incremental para que o próximo paciente seja 
                       adicionado ao próximo ID.*/

// função para listar todos pacientes da lista
function listar(){
    return listaPaciente;
}

//função de inserção de profissional de fisioterapia, validando ID, nome, e especialidade
function inserir(paciente){
    if(paciente && paciente.nome && paciente.nascimento){
        paciente.id = idAutoIncrement++;
        listaPaciente.push(paciente);
        return paciente;
    }
    else{
        // instrução que permite criar um erro personalizado.
        throw({
            numero: 400,
            msg: "Erro: Os dados do paciente estão inválidos!"
        });
    }

}
//função para buscar o profissional por id, validando os dados do cadastro
function buscarPorId(id){
    for(let paciente of listaPaciente){
        if(paciente.id == id){
            return paciente;
        }
    }
    throw({
        //indica que a URL solicitada não pode ser encontrada no servidor
        numero: 404,
        msg: "Erro: Paciente não encontrado, tente novamente!"
    });


}

//função para atualizar o profissional de fisioterapia
function atualizar(pacienteAlterar){
    //validação dos dados do fisioterapeuta (OU).
    if(!pacienteAlterar.nome || !pacienteAlterar.nascimento  || !pacienteAlterar.id ){
        throw({
            //é um código de erro exibido quando um navegador web envia uma solicitação incorreta para um servidor web
            numero: 400,
            msg: "Erro: Os dados do paciente estão invávlidos!"
        });
    }

    for(let indice in listaPaciente){
        if(listaPaciente[indice].id == pacienteAlterar.id){
            //linha abaixo adicionada para segurar id no momento da alteração
            //fisioterapeutaAlterar.id = id;
            listaPaciente[indice] = pacienteAlterar;
            return listaPaciente[indice];

        }
     

    }
    throw({
        //indica que a URL solicitada não pode ser encontrada no servidor
        numero: 404,
        msg: "Erro: Paciente não encontrado.!"
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