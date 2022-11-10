import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../layouts'

export const FullScreenLoading = () => {
    return (
        <ShopLayout title='Page not Found' pageDescription='no nada por aqui'>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography >Loading...</Typography>
                <CircularProgress thickness={2} />
            </Box>
            <></>
        </ShopLayout >
    )
}