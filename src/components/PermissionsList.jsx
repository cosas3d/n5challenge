import React, { useState, useEffect } from 'react';
import api from '../api';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from "@mui/material";

const PermissionsList = ({ onEdit }) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const { data } = await api.get('/api/Permissions');
                setPermissions(data.map(d => ({ ...d, id: d.id.toString() })));
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };

        fetchPermissions();
    }, []);

    const columns = [
        { field: 'nombreEmpleado', headerName: 'Nombre', width: 130 },
        { field: 'apellidoEmpleado', headerName: 'Apellido', width: 130 },

        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                >
                    Eliminar
                </Button>
            ),
        },
        {
            field: 'edit',
            headerName: 'Editar',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(params.row)}
                >
                    Editar
                </Button>
            ),
        },

    ];

    const handleEdit = async (id) => {
        const permissionToEdit = permissions.find(permission => permission.id === id);
        onEdit(permissionToEdit);
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/Permissions/${id}`);
            setPermissions(permissions.filter(permission => permission.id !== id));
        } catch (error) {
            console.error("Error deleting permission:", error);
        }
    };
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={permissions} columns={columns} pageSize={5} />
        </div>
    );
};

export default PermissionsList;
