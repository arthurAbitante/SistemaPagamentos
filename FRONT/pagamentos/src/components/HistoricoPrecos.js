import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HistoricoPrecos(){


    const [historicoPrecos, setHistoricoPrecos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({ preco: '', ProdutoId: '' });

//pegar os atributos de produtos
    useEffect(() => {
        axios.get('http://localhost:3000/produtos').then((response) => {
            setProdutos(response.data);
        });
    }, []);
    
   // alert(produtos);
    //pegar os atributos de HistoricoPrecos
    useEffect(() => {
        fetchHistoricoPrecos();
    }, []);

    const fetchHistoricoPrecos = async () => {
        const response = await axios.get('http://localhost:3000/historicoprecos');
        setHistoricoPrecos(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/historicoprecos', formData);
        fetchHistoricoPrecos();
        setFormData({ preco: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/historicoprecos/${id}`);
        fetchHistoricoPrecos();
    };
    
    
    return(

    <div>        
        <h2>Histórico</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="preco" placeholder="Preço" value={formData.preco} onChange={handleChange} />
        

                <select name="ProdutoId" value={formData.ProdutoId} onChange={handleChange}>
                    <option value="">Selecionar Produto</option>
                    {produtos.map(produto => (
                        <option key={produto.Id} value={produto.Id}>{produto.Descricao}</option>
                    ))}
                </select>

                <button type="submit">Adicionar Histórico</button>
            </form>
        
            <ul>
                {historicoPrecos.map(historicoPreco => (
                    <li key={historicoPreco.historicoprecoId}>
                        {historicoPreco.preco}
                        <button onClick={() => handleDelete(historicoPreco.historicoprecoId)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default HistoricoPrecos;

//export { default as HistoricoPrecos } from './';