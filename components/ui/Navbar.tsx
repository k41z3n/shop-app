
import React, { useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { Link, AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UiContext } from '../../context';



export const Navbar = () => {

    const { asPath } = useRouter()

    const { toggeSideMenu } = useContext(UiContext)

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>

                    <Typography variant='h6'>Shop</Typography>
                    <Typography sx={{ ml: 0.5 }}></Typography>

                </NextLink>
                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/men' passHref >
                        <Button color={asPath === '/category/men' ? 'primary' : 'info'} sx={{ marginRight: 1 }}>
                            Men
                        </Button >
                    </NextLink>
                    <NextLink href='/category/women' passHref >
                        <Button color={asPath === '/category/women' ? 'primary' : 'info'} sx={{ marginRight: 1 }}>
                            women
                        </Button >
                    </NextLink>
                    <NextLink href='/category/kid' passHref>
                        <Button color={asPath === '/category/kid' ? 'primary' : 'info'}  >
                            Kid
                        </Button >
                    </NextLink>

                </Box>


                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </NextLink>

                <Button onClick={() => toggeSideMenu()}>
                    Menu
                </Button >
            </Toolbar>
        </AppBar>
    )
}
