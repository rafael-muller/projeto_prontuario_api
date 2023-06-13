const cadastro = require('./cadastro_fisioterapeuta')

let listaInicialEsperada = [
    {id:1, nome:"Fernanda", especialidade:"traumato"},
    {id:2, nome:"Lucas", especialidade:"orto"},
    {id:3, nome:"Maria", especialidade:"esporte"},
]

let listaInseridoEsperado = [
    {id:1, nome:"rafinha", especialidade:"traumato"},
    {id:2, nome:"rafa", especialidade:"traumato"},
    {id:3, nome:"rafao", especialidade:"traumato"},
    {id:4, nome:"rafano", especialidade:"traumato"},
]

let listaAtualizadaEsperada = [
    {id:1, nome:"mariazinha", especialidade:"traumato"},
    {id:2, nome:"maria", especialidade:"traumato"},
    {id:3, nome:"mario", especialidade:"traumato"},

]
let listaDeletadoEsperado = [
    {id:2, nome:"rafa", especialidade:"traumato"},
    {id:3, nome:"rafao", especialidade:"traumato"},
]

beforeEach(() => {
    cadastro.deletar();
    cadastro.inserir({nome:"Fernanda", especialidade:"traumato"});
    cadastro.inserir({nome:"Lucas", especialidade:"orto"});
    cadastro.inserir({nome:"Maria", especialidade:"esporte"});
});

/*test('Listar Produtos sem cadastrar deve retornar vazio', () => {
    expect(cadastro.listar()).toEqual([]);
    expect(cadastro.listar().length).toBe(0);
})*/

//Cenario de Sucesso!
test("Listar Fisioterapeutas retorna a lista inicial esperada",
    function() {
        expect(cadastro.listar())
            .toEqual(listaInicialEsperada)
    }
)

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Fisioterapeuta Lucas',
    function() {
        let fisioterapeuta2 = {
            id:2, 
            nome:"Lucas", 
            especialidade:"orto"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(fisioterapeuta2);
    }
)

//Cenario de Insucesso - Não existe fisioterapeuta 5!
test ('Buscar Por Id 5 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = new Error({
            numero: 404,
            msg: "Erro: Profissional não encontrado."
        });
        expect(() => cadastro.buscarPorId(5))
            .toThrow(errIdNaoEncontrado);
    }
)

// Cenario de sucesso - inserir Fisioterapeuta 4
test ('Inserir Fisioterapeuta 4 deve retornar profissional cadastrado com id=4 e deve trabalhar na lista corretamente',
    function(){
        const fisioterapeuta4 = {nome:"rafano", especialidade:"traumato"};
        const fisioterapeuta = {id:4, nome:"rafano", especialidade:"traumato"};

        expect(cadastro.inserir(fisioterapeuta4))
            .toEqual(fisioterapeuta);
        
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

// Cenario de erro - inserir produto 4 sem nome
test ('Inserir fisioterapeuta sem nome deve aparecer o erro',
    function() {
        const profissionalSemNome = {especialidade: "traumato"};        
        const erroEsperado = new Error({
            numero: 400,
            msg: "Erro: Os parametros profissional estão inválidos"
        });

        expect(() => cadastro.inserir(profissionalSemNome))
            .toThrow(erroEsperado);

    });


//Cenário de Sucesso
test ('Alterar Produto com id 1 para nome "Produto X" e preco 100 deve atualizar na lista',
    function() {
        const produtoAtualizadoEsperado = {id:1, nome:"Produto X", preco:100};
        const produtoAtualizar = {nome:"Produto X", preco:100};
        const idAtualizar = 1;

        expect(cadastro.atualizar(idAtualizar, produtoAtualizar))
            .toEqual(produtoAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadaEsperada);

    }
)

//Cenario de Insucesso - Não existe produto 6!
test ('Atualizar o produto com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const produtoAtualizar = {
            nome:"Produto 6", 
            preco:600
        };
        const errIdNaoEncontrado = new Error({
            numero: 404,
            msg: "Erro: Produto nao encontrado."
        });
        expect(() => cadastro.atualizar(6, produtoAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

//Cenário de Sucesso
test ('Deletar o produto com id 1 deve remover tal produto da lista',
    function() {
        const produto1 = {id:1, nome:"Produto 1", preco: 10};

        expect(cadastro.deletar(1))
            .toEqual(produto1);

        expect(cadastro.listar())
            .toEqual(listaDeletadoEsperado);
    }
)

//Cenario de Insucesso - Não existe produto 6!
test ('Deletar o produto com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = new Error({
            numero: 404,
            msg: "Erro: Produto nao encontrado."
        });
        expect(() => cadastro.deletar(6))
            .toThrow(errIdNaoEncontrado);
    }
)