import { useContext, useState } from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import { validations } from "../../utils";
// import { shopApi } from "../../api";

import { AuthLayout } from "../../components/layouts"
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";


type FormData = {
    name: string,
    email: string,
    password: string,
};


const RegisterPage = () => {
    const { registernUser } = useContext(AuthContext)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [hasError, sethasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const registerUser = async ({ name, email, password }: FormData) => {
        sethasError(false)
        const { hasError, message } = await registernUser(name, email, password)
        if (hasError) {
            sethasError(true)
            setErrorMessage(message!)
            return
        }

        const redirectTo = router.query.p?.toString() || '/'
        router.replace(redirectTo)

        // try {
        //     const { data } = await shopApi.post("/user/register", { name, email, password })
        //     const { token, user } = data
        //     console.log(token, user);

        // } catch (error) {
        //     sethasError(true)
        //     console.log({ error })
        // }
    }


    return (
        <AuthLayout title={"Ingresar"}>
            <Box sx={{ width: 350, padding: "10px 20px" }}>
                <form onSubmit={handleSubmit(registerUser)} noValidate >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Crear cuenta</Typography>

                            <Chip
                                sx={{ width: '100%', display: hasError ? 'flex' : 'none' }}
                                label={errorMessage ? errorMessage : 'Email already register!!!'}
                                color="error"
                                className="fadeIn"
                                icon={<ErrorOutline />}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                {...register("name", {
                                    required: 'name is required'
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                                type="password"
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
                                color="secondary"
                                className="circular-btn"
                                size="large"
                                fullWidth
                                type="submit"
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink
                                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                passHref>
                                ¿Ya tienes cuenta?
                            </NextLink>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage