import { Button, TextField } from '@mui/material';
import { useState } from 'react';

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
            />
            <Button type="submit">Crear</Button>
        </form>
    );
}

export default FormCreateComponent;