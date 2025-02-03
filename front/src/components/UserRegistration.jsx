import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRegistration = () => {
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        neighborhood: '' // ID del barrio seleccionado
    });

    // Cargar la lista de barrios cuando el componente se monte
    useEffect(() => {
        const fetchNeighborhoods = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/neighborhoods');
                setNeighborhoods(response.data);
            } catch (error) {
                console.error('Error al cargar los barrios:', error);
            }
        };

        fetchNeighborhoods();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users', formData);
            console.log('Usuario registrado:', response.data);
            // Aquí puedes agregar redirección o mensaje de éxito
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Barrio:</label>
                    <select
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Selecciona un barrio</option>
                        {neighborhoods.map((neighborhood) => (
                            <option 
                                key={neighborhood.idneighborhood} 
                                value={neighborhood.idneighborhood}
                            >
                                {neighborhood.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default UserRegistration;