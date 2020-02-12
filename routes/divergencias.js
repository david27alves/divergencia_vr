const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
	user: 'user',
	host: 'host',
	database: 'db',
	password: 'pass',
	port: 5432,
});



router.get('/', function (req, res, next){
	
	const query = {
		text: 'select fornecedor.id as cod_fornecedor, fornecedor.razaosocial, notaentrada.numeronota, notaentrada.dataentrada, produto.id as cod_produto, produto.descricaocompleta, notaentradadivergencia.quantidadenota, notaentradadivergencia.quantidadepedido, notaentradadivergencia.custonota, notaentradadivergencia.custopedido, tipodivergenciaentrada.descricao as divergencia, loja.descricao as loja from notaentradadivergencia  inner join notaentrada on notaentrada.id = notaentradadivergencia.id_notaentrada inner join fornecedor on notaentrada.id_fornecedor = fornecedor.id inner join produto on notaentradadivergencia.id_produto = produto.id inner join tipodivergenciaentrada on notaentradadivergencia.id_tipodivergenciaentrada = tipodivergenciaentrada.id inner join loja on notaentrada.id_loja = loja.id where notaentrada.justificativadivergencia = $1 and notaentrada.dataentrada between $2 and $3 and notaentradadivergencia.id_notaentrada = notaentrada.id and id_loja = 5',
		values: ['', '2020-01-01', '2020-01-05']
	};
		
	pool.query(query, (err, resp) => {
		
		res.json(resp.rows);
		
	});
	
});

module.exports = router;