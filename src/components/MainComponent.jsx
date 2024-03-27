import { useEffect, useState } from 'react';
import FormCreateComponent from './FormCreateComponent';
import DataTable from './DataTable.jsx';

import api from '../api';

function MainComponent() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/api/Permissions');
            setData(response.data);
        };

        fetchData();
    }, []);

    const handleCreate = (values) => {
        // Implementa aquí la lógica para crear un nuevo elemento
    };

    const handleEdit = (id) => {
        setSelectedId(id);
        // Implementa aquí la lógica para editar un elemento
    };

    const handleDelete = (id) => {
        // Implementa aquí la lógica para borrar un elemento
    };

    return (
        <div>
            <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} onCreate={() => setSelectedId(null)} />
            {selectedId && <FormCreateComponent initialValues={data.find(item => item.id === selectedId)} onSubmit={handleCreate} />}
        </div>
    );
}

export default MainComponent;