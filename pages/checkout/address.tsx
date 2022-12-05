import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

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


// ! MOVE TO Middleware
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const { token = '' } = req.cookies
//     let isValidToken = false

//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true
//     } catch {
//         isValidToken = false
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {},
//     };
// };

export default addressPage