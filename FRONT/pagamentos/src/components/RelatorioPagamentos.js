import React, { useState, useEffect } from 'react';
import axios from 'axios';


function RelatorioPagamentos(){


    const [relatorioPagamento, setRelatorioPagamentos] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [historicoPrecos, setHistoricoPrecos] = useState([]);
    const [condicaoPagamento, setCondicaoPagamento] = useState([]);

    const [formData, setFormData] = useState({ clienteId: '', historicoPrecoId: '', condicaoPagamentoId: '' });


//pegar os atributos de produtos

//historico precos
//condicao pagamento
//cliente




    //pegar os atributos de HistoricoPrecos
    useEffect(() => {
        fetchRelatorioPagamentos();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/clientes').then((response) => {
            setClientes(response.data);
        });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:3000/historicoprecos').then((response) => {
            setHistoricoPrecos(response.data);
        });
    }, []);

    
    useEffect(() => {
        axios.get('http://localhost:3000/condicoespagamentos').then((response) => {
            setCondicaoPagamento(response.data);
        });
    }, []);


    const fetchRelatorioPagamentos = async () => {
        const response = await axios.get('http://localhost:3000/relatoriopagamentos');
        setRelatorioPagamentos(response.data);
    };

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/relatoriopagamentos', formData);
        fetchRelatorioPagamentos();
        setFormData({ historicoPrecoId: '', condicaoPagamentoId: '', clienteId: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/relatoriopagamentos/${id}`);
        fetchRelatorioPagamentos();
    };
    
    return(

    <div className="component-container">        
        <h2>Relatório Pagamentos</h2>

        <form onSubmit={handleSubmit}>

            <select name="clienteId" value={formData.clienteId} onChange={handleChange}>
                <option value="">Selecionar Cliente</option>
                {clientes.map(cliente => (
                    <option key={cliente.clienteId} value={cliente.clienteId}>{cliente.razaoSocial}</option>
                ))}
            </select>

            <select name="historicoPrecoId" value={formData.historicoPrecoId} onChange={handleChange}>
                <option value="">Selecionar Preço</option>
                {historicoPrecos.map(historicoPreco => (
                    <option key={historicoPreco.id} value={historicoPreco.id}>{historicoPreco.preco}</option>
                ))}
            </select>

            <select name="condicaoPagamentoId" value={formData.condicaoPagamentoId} onChange={handleChange}>
                <option value="">Selecionar Condição Pagamento</option>
                {condicaoPagamento.map(cp => (
                    <option key={cp.condicaoPagamentoId} value={cp.condicaoPagamentoId}>{cp.descricao} : {cp.dias} dias</option>
                ))}
            </select>
        </form>

        <table className="component-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Condição de Pagamento</th>
                    <th>Produto</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {relatorioPagamento.map((relatorio) => (
                    <tr key={relatorio.id}>
                        <td>{relatorio.id}</td>
                        <td>{relatorio.cliente}</td>
                        <td>{relatorio.condicaoPagamento}</td>
                        <td>{relatorio.produto}</td>
                        <td>{relatorio.preco.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
       
        </div>
    );

}

export default RelatorioPagamentos;

//export { default as HistoricoPrecos } from './';