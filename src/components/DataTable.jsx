import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DataTable({ data, onEdit, onDelete, onCreate }) {
    console.log(data);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombreEmpleado', headerName: 'Nombre del Empleado', width: 200 },
        { field: 'apellidoEmpleado', headerName: 'Apellido del Empleado', width: 200 },
        { field: 'fechaPermiso', headerName: 'Fecha del permiso', width: 200 },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button onClick={() => onEdit(params.row.id)}><EditIcon /></Button>
                    <Button onClick={() => onDelete(params.row.id)}><DeleteIcon /></Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button onClick={onCreate}><AddIcon />Crear</Button>
            <DataGrid rows={data} columns={columns} pageSize={5}  />
        </div>
    );
}

export default DataTable;