import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({ cnpj: '', razaoSocial: '', email: '' });

    // Fetch clientes on component mount
    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await axios.get('/api/clientes');
        setClientes(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/clientes', formData);
        fetchClientes();
        setFormData({ cnpj: '', razaoSocial: '', email: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/clientes/${id}`);
        fetchClientes();
    };

    return (
        <div>
            <h2>Clientes</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} />
                <input type="text" name="razaoSocial" placeholder="Razão Social" value={formData.razaoSocial} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <button type="submit">Add Cliente</button>
            </form>
            
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.clienteId}>
                        {cliente.razaoSocial} - {cliente.email}
                        <button onClick={() => handleDelete(cliente.clienteId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clientes;