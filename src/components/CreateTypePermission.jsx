import React, {useEffect, useState} from 'react';
import api from "../api.js";

const CreateTypePermission = ({ onSuccess, initialValues }) => {
    const [formData, setFormData] = useState({
        Descripcion: '',
    });

    useEffect(() => {
        if (initialValues) {
            setFormData({
                Descripcion: initialValues.Descripcion || '',
            });
        }
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/PermissionsType', formData);
            onSuccess(response.data);
        } catch (error) {
            console.error('Error al crear el tipo de permiso:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Descripcion</label>
                <input
                    type="text"
                    name="Descripcion"
                    value={formData.Descripcion}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
}

export default CreateTypePermission;