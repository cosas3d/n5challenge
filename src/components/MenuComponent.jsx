import { Button, Container,Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Container>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Button component={Link} to="/" variant="contained" color="primary">Home</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Menu;