import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import ShopLayout from "../../components/layouts/ShopLayout"

const addressPage = () => {
    return (
        <ShopLayout title="Address" pageDescription="shop destination">
            <Typography variant="h1" component='h1'>Direction</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Name" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="surname" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="direction" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="direction 2" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Code" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Ciudad" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="telefono" variant="filled" fullWidth />
                </Grid>

            </Grid>
            <Box sx={{ mt: 3 }} display='flex' justifyItems='center'>
                <Button color='secondary' className="circular-btn" size='large' >Review</Button>
            </Box>

        </ShopLayout>
    )
}

export default addressPage