import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../css/RegisterUser.css';
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import UserRegistration from '../components/UserRegistration';
import NeighborhoodSelect from '../components/NeighborhoodSelect';

function App() {
    return (
        <div>
            <NeighborhoodSelect />
        </div>
    );
}
const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    idNeighborhood: '',
  });
  
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/neighborhoods')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setNeighborhoods(response.data);
        } else {
          console.error('Formato de respuesta incorrecto:', response.data);
          setNeighborhoods([]); // Asegura que neighborhoods siempre sea un array
        }
      })
      .catch(error => {
        console.error('Error al obtener barrios:', error);
        setNeighborhoods([]); // Previene que neighborhoods sea undefined
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      idNeighborhood: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.phone || !formData.idNeighborhood) {
      setFormError('Por favor, complete todos los campos requeridos.');
      return;
    }

    setIsLoading(true);
    setFormError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/users', {
        ...formData,
        last_name: formData.lastName,
        idneighborhood: formData.idNeighborhood,
      });

      setSuccess(`¡Bienvenido, ${response.data.name}! Tu cuenta ha sido creada exitosamente.`);
      setFormData({
        name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        idNeighborhood: '',
      });
    } catch (error) {
      setFormError('Error al crear usuario. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Usuario</h2>
      {formError && <div className="error-message">{formError}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          {/* Campos de nombre, apellido, email, etc. */}
        </div>
        <div className="form-group">
          <label htmlFor="idNeighborhood">
            <FaMapMarkerAlt /> Barrio
          </label>
          <Select
            options={neighborhoods}
            onChange={handleSelectChange}
            value={neighborhoods.find(n => n.value === formData.idNeighborhood)}
            placeholder="Selecciona tu barrio"
            isClearable
            required
          />
        </div>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
