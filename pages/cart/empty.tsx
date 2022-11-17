import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"


const emptyPage = () => {
    return (
        <ShopLayout title="empty cart" pageDescription="dont have items in cart">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>

                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography marginLeft={2}>tu carrito esta vacio!</Typography>
                    <NextLink href='/' passHref>
                        Regresar
                    </NextLink>

                </Box>
            </Box>
            <></>
        </ShopLayout>
    )
}

export default emptyPage