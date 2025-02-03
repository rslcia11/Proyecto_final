import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchNeighborhoods } from "../api/api";

const NeighborhoodSelect = ({ onChange }) => {
    const [neighborhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        const loadNeighborhoods = async () => {
            const data = await fetchNeighborhoods();
            setNeighborhoods(data.map(n => ({ value: n.idneighborhood, label: n.name })));
        };
        loadNeighborhoods();
    }, []);

    return <Select options={neighborhoods} onChange={onChange} placeholder="Seleccione su barrio" />;
};

export default NeighborhoodSelect;
