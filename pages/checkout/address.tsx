import { useContext } from 'react';
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { CartContext } from "../../context";
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"


type FormData = {
    firstName: string;
    lastName: string;
    direction: string;
    direction2?: string;
    code: string;
    city: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        direction: Cookies.get('direction') || '',
        direction2: Cookies.get('direction2') || '',
        code: Cookies.get('code') || '',
        city: Cookies.get('city') || '',
        phone: Cookies.get('phone') || '',
    }
}


const addressPage = () => {

    const router = useRouter()

    const { storeShippingAddress } = useContext(CartContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const storeAddress = async (data: FormData) => {

        storeShippingAddress(data)
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout title="Address" pageDescription="shop destination">
            <Typography variant="h1" component='h1'>Direction</Typography>

            <form onSubmit={handleSubmit(storeAddress)} noValidate >

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name" variant="filled" fullWidth
                            {...register("firstName", {
                                required: 'firstName is required'
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="surname" variant="filled" fullWidth
                            {...register("lastName", {
                                required: 'lastName is required'
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="direction" variant="filled" fullWidth
                            {...register("direction", {
                                required: 'direction is required'
                            })}
                            error={!!errors.direction}
                            helperText={errors.direction?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="direction 2" variant="filled" fullWidth
                            {...register("direction2")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Code" variant="filled" fullWidth
                            {...register("code", {
                                required: 'code is required'
                            })}
                            error={!!errors.code}
                            helperText={errors.code?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ciudad" variant="filled" fullWidth
                            {...register("city", {
                                required: 'city is required'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="telefono" variant="filled" fullWidth
                            {...register("phone", {
                                required: 'phone is required'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>

                </Grid>
                <Box sx={{ mt: 3 }} display='flex' justifyItems='center'>
                    <Button color='secondary' className="circular-btn" size='large' type="submit">Enviar direccion</Button>
                </Box>
            </form>

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