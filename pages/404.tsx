import { Box, Typography } from '@mui/material'
import React from 'react'
import ShopLayout from '../components/layouts/ShopLayout'

const PageNotFound = () => {
    return (
        <ShopLayout title='Page not Found' pageDescription='no nada por aqui'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography variant='h1' component='h1' fontSize={80} fontWeight={100}>404 |</Typography>
                <Typography marginLeft={2}>No hay nda por aqui!</Typography>
            </Box>
            <></>
        </ShopLayout >
    )
}

export default PageNotFound