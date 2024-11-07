import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CondicoesPagamento() {
    const [condicoes, setCondicoes] = useState([]);
    const [formData, setFormData] = useState({ descricao: '', dias: '' });

    useEffect(() => {
        fetchCondicoes();
    }, []);

    const fetchCondicoes = async () => {
        const response = await axios.get('http://localhost:3000/condicoespagamentos');
        setCondicoes(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/condicoespagamentos', formData);
        fetchCondicoes();
        setFormData({ descricao: '', dias: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/condicoespagamentos/${id}`);
        fetchCondicoes();
    };

    return (
        <div className="component-container">
            <h2>Condições de Pagamento</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />
                <input type="text" name="dias" placeholder="Dias" value={formData.dias} onChange={handleChange} />
                <button type="submit">Add Condição</button>
            </form>
            
            <table className="component-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Dias</th>
                    </tr>
                </thead>
                <tbody>
                    {condicoes.map(condicao => (
                    <tr>
                        <td>{condicao.descricao}</td>
                        <td>{condicao.dias}</td>
                        <td>
                            <button onClick={() => handleDelete(condicao.condicaoPagamentoId)}>Remover</button>
                        </td>
                    </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}

export default CondicoesPagamento;

//export { default as CondicoesPagamento } from './CondicoesPagamento';