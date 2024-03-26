import { useEffect, useState } from 'react';
import api from '../api';

function PermissionsTypesComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/api/PermissionsType');
            setData(response.data);
            console.log(response.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    );
}

export default PermissionsTypesComponent;