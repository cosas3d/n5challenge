import {Button, MenuItem, Select, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import api from "../api.js";

function FormCreateComponent({ initialValues, onSubmit }) {
    const [values, setValues] = useState(initialValues || {});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
    };
    const [permissionTypes, setPermissionTypes] = useState([]);
    useEffect(() => {
        const fetchPermissionTypes = async () => {
            const response = await api.get('/api/PermissionsType');
            setPermissionTypes(response.data);
        };

        fetchPermissionTypes();
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="NombreEmpleado"
                label="Nombre del Empleado"
                value={values.NombreEmpleado || ''}
                onChange={handleChange}
            /><br/><br/>
            <TextField
                name="ApellidoEmpleado"
                label="Apellido del Empleado"
                value={values.ApellidoEmpleado || ''}
                onChange={handleChange}
            /><br/><br/>
            <TextField
                name="FechaPermiso"
                label="Fecha del Permiso"
                type="date"
                value={values.FechaPermiso || ''}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            /><br/><br/>
            <TextField
                name="TipoPermisoId"
                label="ID del Tipo de Permiso"
                value={values.TipoPermisoId || ''}
                onChange={handleChange}
            /><br/><br/>
            <Select
                name="TipoPermisoId"
                value={values.TipoPermisoId || ''}
                onChange={handleChange}
            >
                {permissionTypes.map((type) => (
                    <MenuItem value={type.id}>{type.descripcion}</MenuItem>
                ))}
            </Select><br/><br/>
            <Button type="submit">Crear</Button>
        </form>
    );
}

export default FormCreateComponent;