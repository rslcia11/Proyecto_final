import { useState, useEffect } from 'react';

const NeighborhoodSelect = ({ onChange }) => {
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    const loadNeighborhoods = async () => {
      try {
        const response = await fetch('/neighborhoods');
        const data = await response.json();
        setNeighborhoods(data);
      } catch (error) {
        console.error('Error cargando barrios:', error);
      }
    };

    loadNeighborhoods();
  }, []);

  return (
    <select 
      name="idneighborhood" 
      onChange={(e) => onChange(e.target.value)}
      required
      className="form-control"
    >
      <option value="">Seleccione un barrio</option>
      {neighborhoods.map((neighborhood) => (
        <option 
          key={neighborhood.idneighborhood} 
          value={neighborhood.idneighborhood}
        >
          {neighborhood.name}
        </option>
      ))}
    </select>
  );
};

export default NeighborhoodSelect;