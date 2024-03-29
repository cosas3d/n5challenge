import { useEffect, useState } from 'react';
import DataTable from './DataTable.jsx';
import Dialog from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import api from '../api';

function PermissionTypesComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/api/PermissionsType');
            setData(response.data);
        };

        fetchData();
    }, []);

    const handleCreate = async (values) => {
        try {
            const response = await api.post('/api/PermissionsType', values);
            setData([...data, response.data]);
        } catch (error) {
            console.error('Error al crear el tipo de permiso: ', error);
        }
    };

    const handleEdit = (id) => {
        // Implementa aquí la lógica para editar un elemento
    };

    const handleDelete = (id) => {
        // Implementa aquí la lógica para borrar un elemento
    };

    return (
        <div>
            <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} onCreate={handleCreate} />
        </div>
    );
}

export default PermissionTypesComponent;