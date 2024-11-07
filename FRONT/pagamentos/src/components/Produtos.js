import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({ Sku: '', Descricao: '' });

    // Fetch clientes on component mount
    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        const response = await axios.get('http://localhost:3000/produtos');
        setProdutos(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/produtos', formData);
        fetchProdutos();
        setFormData({ Sku: '', Descricao: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/produtos/${id}`);
        fetchProdutos();
    };

    return (
        <div className="component-container">
            <h2>Produtos</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Sku" placeholder="Sku" value={formData.Sku} onChange={handleChange} />
                <input type="text" name="Descricao" placeholder="Descricao" value={formData.Descricao} onChange={handleChange} />
                <button type="submit">Adicionar Produto</button>
            </form>
            
            <table className="component-table">
                <thead>
                    <tr>
                        <th>Sku</th>
                        <th>Descricao</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((produto) => (
                        <tr>
                            <td>{produto.Sku}</td>
                            <td>{produto.Descricao}</td>
                            <td><button onClick={() => handleDelete(produto.Id)}>Remover</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
            
        </div>
    );
}

export default Produtos;

//export { default as Clientes } from './Clientes';