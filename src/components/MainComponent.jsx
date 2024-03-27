import { useEffect, useState } from 'react';
import FormCreateComponent from './FormCreateComponent';
import DataTable from './DataTable.jsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import api from '../api';

function MainComponent() {
    const [data, setData] = useState([]);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/api/Permissions');
            setData(response.data);
        };

        fetchData();
    }, []);

    const handleCreate = async (values) => {
        try {
            const response = await api.post('/api/Permissions', values);
            setData([...data, response.data]);
            setCreating(false);
        } catch (error) {
            console.error('Error al crear el permiso: ', error);
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
            <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} onCreate={() => setCreating(true)} />
            <Dialog open={creating} onClose={() => setCreating(false)}>
                <DialogTitle>Crear Permiso</DialogTitle>
                <DialogContent>
                    <FormCreateComponent onSubmit={handleCreate} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MainComponent;