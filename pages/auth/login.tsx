import { useState, useContext } from 'react';

import NextLink from "next/link"
import { useForm } from "react-hook-form";

import { Box, Grid, Typography, TextField, Button, Link, Chip } from "@mui/material"
import { AuthLayout } from "../../components/layouts"
import { validations } from "../../utils";
// import { shopApi } from '../../api';

import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
};


const LoginPage = () => {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [hasError, sethasError] = useState(false)

    const { loginUser } = useContext(AuthContext)

    const onLogin = async ({ email, password }: FormData) => {
        sethasError(false)
        const isValid = await loginUser(email, password)
        if (!isValid) {
            sethasError(true)
            return
        }

        const redirectTo = router.query.p?.toString() || '/'
        router.replace(redirectTo)
        // try {
        //     const { data } = await shopApi.post('/user/login', { email, password })
        //     const { token, user } = data
        //     console.log(token, user);

        // } catch (error) {
        //     sethasError(true)
        //     console.log({ error })
        // }
    }



    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLogin)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1"> Iniciar Sesión </Typography>

                            <Chip
                                sx={{ width: '100%', display: hasError ? 'flex' : 'none' }}
                                label='User or password invalid!!!'
                                color="error"
                                className="fadeIn"
                                icon={<ErrorOutline />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register("email", {
                                    required: 'Email is required',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 charts' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            display='flex'
                            justifyContent='end'
                        >
                            <NextLink
                                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                passHref>
                                ¿No tienes cuenta?
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage