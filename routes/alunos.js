const express = require('express');
const router = express.Router();

let alunos = [
  { id: 1, 
    nome: 'Ana', 
    email: 'ana@email.com', 
    cpf: '111.111.111-11', 
    telefone: '1111-1111', 
    dataNascimento: '2000-01-01' 
    },
  { id: 2, 
    nome: 'Bruno', 
    email: 'bruno@email.com', 
    cpf: '222.222.222-22', 
    telefone: '2222-2222', 
    dataNascimento: '2001-02-02' 
}];

router.get('/', (req, res) => res.json(alunos));

router.get('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === Number(req.params.id));
  aluno ? res.json(aluno) : res.status(404).json({erro:'Aluno não encontrado'});
});

router.post('/', (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  alunos.push(novo);
  res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
  const idx = alunos.findIndex(a => a.id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({erro:'Aluno não encontrado'});
  alunos[idx] = { ...alunos[idx], ...req.body };
  res.json(alunos[idx]);
});

router.delete('/:id', (req, res) => {
  alunos = alunos.filter(a => a.id !== Number(req.params.id));
  res.status(204).end();
});

module.exports = router;