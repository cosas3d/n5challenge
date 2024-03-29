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

    const [permissionTypes, setPermissionTypes] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/Permissions');

                const dataWithIds = response.data.map(item => {
                    if (item) {
                        return {
                            id: item.id,
                            nombreEmpleado: item.nombreEmpleado,
                            apellidoEmpleado: item.apellidoEmpleado,
                            fechaPermiso: item.fechaPermiso,

                        };
                    } else {
                        return null;
                    }
                }).filter(item => item !== null);
                setData(dataWithIds);
            } catch (error) {
                console.error('Error al obtener los datos: ', error);
            }
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

    const handleEdit = async (id) => {
        try {
            const response = await api.put(`/api/Permissions/${id}`, values);
            const updatedData = data.map(item => (item.id === id ? response.data : item));
            setData(updatedData);
        } catch (error) {
            console.error('Error al editar el permiso: ', error);
        }
    };


    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/Permissions/${id}`);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error('Error al borrar el permiso: ', error);
        }
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