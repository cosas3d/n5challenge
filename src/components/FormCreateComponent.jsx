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
                name="nombre"
                label="Nombre"
                value={values.nombre || ''}
                onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}

export default FormCreateComponent;