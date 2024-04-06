import React, {useEffect, useState} from 'react';
import {TextField, Button, InputLabel, Select, FormControl, MenuItem} from '@mui/material';
import api from '../api';

const EditPermissionForm = ({ onSuccess, initialValues }) => {
    const [formData, setFormData] = useState({
        nombreEmpleado: '',
        apellidoEmpleado: '',
        fechaPermiso: '',
        permissionsTypeId: '',
    });
    const [permissionTypes, setPermissionTypes] = useState([]);

    useEffect(() => {
        const fetchPermissionTypes = async () => {
            try {
                const response = await api.get('/api/PermissionsType');
                setPermissionTypes(response.data);
            } catch (error) {
                console.error("Error fetching permission types:", error);
            }
        };

        fetchPermissionTypes();
    }, []);

    useEffect(() => {
        if (initialValues) {
            setFormData({
                id: initialValues.id,
                nombreEmpleado: initialValues.nombreEmpleado || '',
                apellidoEmpleado: initialValues.apellidoEmpleado || '',
                fechaPermiso: initialValues.fechaPermiso ? initialValues.fechaPermiso.split('T')[0] : '',
                permissionsTypeId: initialValues.permissionsTypeId || '',
            });
        }
    }, [initialValues]);

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        const formattedDate = value ? new Date(value).toISOString() : '';
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: formattedDate
        }));
    };
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
            const { data } = await api.put(`/api/Permissions/${initialValues.id}`, formData);
            onSuccess(data);
        } catch (error) {
            console.error("Error updating permission:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="nombreEmpleado"
                label="Nombre del Empleado"
                value={formData.nombreEmpleado}
                onChange={handleChange}
            />
            <TextField
                name="apellidoEmpleado"
                label="Apellido del Empleado"
                value={formData.apellidoEmpleado}
                onChange={handleChange}
            />
            <TextField
                name="fechaPermiso"
                label="Fecha del Permiso"
                type="date"
                value={formData.fechaPermiso.split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            /><br/>
            <FormControl fullWidth>
                <InputLabel id="permissionsTypeId-label">Tipo de Permiso</InputLabel>
                <Select
                    labelId="permissionsTypeId-label"
                    name="permissionsTypeId"
                    value={formData.permissionsTypeId}
                    label="Tipo de Permiso"
                    onChange={handleChange}
                >
                    {permissionTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.descripcion}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl><br/>
            <Button type="submit">Actualizar Permiso</Button>
        </form>
    );
};

export default EditPermissionForm;