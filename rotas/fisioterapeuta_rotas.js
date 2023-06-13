const express = require('express');
const cadastroFisioterapeuta = require('../cadastro_fisioterapeuta')
const fisioterapeutaController = require('../controller/fisioterapeuta_controller')

const router = express.Router();

//Recurso: Produtos - rota: /produtos
router.get('/', fisioterapeutaController.listar);
router.get('/:id', fisioterapeutaController.buscarPorId)
router.post('/', fisioterapeutaController.inserir);
router.put('/:id', fisioterapeutaController.atualizar);
router.delete('/:id', fisioterapeutaController.deletar);

module.exports = router;