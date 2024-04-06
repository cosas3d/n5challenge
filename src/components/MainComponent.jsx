import { useEffect, useState } from 'react';


import api from '../api';
import PermissionsList from "./PermissionsList.jsx";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import CreatePermissionForm from "./CreatePermissionForm.jsx";
import EditPermissionForm from "./EditPermissionForm.jsx";

function MainComponent() {
    const [openDialog, setOpenDialog] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [editingPermission, setEditingPermission] = useState(null);


    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await api.get('/api/Permissions');
                setPermissions(response.data);
            } catch (error) {
                console.error('Error al obtener permisos:', error);
            }
        };

        fetchPermissions();
    }, []);

    const handleEdit = (permission) => {
        setEditingPermission(permission);
    };


    const handleUpdateSuccess = (updatedPermission) => {
        setPermissions(permissions.map(permission => permission.id === updatedPermission.id ? updatedPermission : permission));
        setEditingPermission(null);
    };

    const handleCreateSuccess = async (newPermission) => {
        handleClose();
        setPermissions((currentPermissions) => [...currentPermissions, newPermission]);
    };
    const handleOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Agregar Permiso
            </Button>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Agregar Nuevo Permiso</DialogTitle>
                <DialogContent>
                    <CreatePermissionForm onSuccess={handleCreateSuccess} />
                </DialogContent>
            </Dialog>
            {editingPermission && (
                <Dialog open={Boolean(editingPermission)} onClose={() => setEditingPermission(null)}>
                    <DialogTitle>Editar Permiso</DialogTitle>
                    <DialogContent>
                        <EditPermissionForm
                            initialValues={editingPermission}
                            onSuccess={handleUpdateSuccess}
                        />
                    </DialogContent>
                </Dialog>
            )}
            <PermissionsList permissions={permissions} onEdit={handleEdit}/>
        </>
    );
}

export default MainComponent;