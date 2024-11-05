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
        const response = await axios.get('http://localhost:3000/clientes');
        setClientes(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/clientes', formData);
        fetchClientes();
        setFormData({ cnpj: '', razaoSocial: '', email: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
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
            
            <table>
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Razão Social</th>
                        <th>Email</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((cliente) => (
                        <tr>
                            <td>{cliente.cnpj}</td>
                            <td>{cliente.razaoSocial}</td>
                            <td>{cliente.email}</td>
                            <td><button onClick={() => handleDelete(cliente.clienteId)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
            
        </div>
    );
}

export default Clientes;

//export { default as Clientes } from './Clientes';