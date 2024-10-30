import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CondicoesPagamento() {
    const [condicoes, setCondicoes] = useState([]);
    const [formData, setFormData] = useState({ descricao: '', dias: '' });

    useEffect(() => {
        fetchCondicoes();
    }, []);

    const fetchCondicoes = async () => {
        const response = await axios.get('/api/condicoespagamentos');
        setCondicoes(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/condicoespagamentos', formData);
        fetchCondicoes();
        setFormData({ descricao: '', dias: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/condicoespagamentos/${id}`);
        fetchCondicoes();
    };

    return (
        <div>
            <h2>Condições de Pagamento</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />
                <input type="text" name="dias" placeholder="Dias" value={formData.dias} onChange={handleChange} />
                <button type="submit">Add Condição</button>
            </form>
            
            <ul>
                {condicoes.map(condicao => (
                    <li key={condicao.condicaoPagamentoId}>
                        {condicao.descricao} - {condicao.dias}
                        <button onClick={() => handleDelete(condicao.condicaoPagamentoId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CondicoesPagamento;
