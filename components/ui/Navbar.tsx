import NextLink from 'next/link'
import React from 'react'
import { Link, AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
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
                        <Button sx={{ marginRight: 1 }}>
                            Men
                        </Button >
                    </NextLink>
                    <NextLink href='/category/women' passHref >
                        <Button sx={{ marginRight: 1 }}>
                            Wom
                        </Button >
                    </NextLink>
                    <NextLink href='/category/kid' passHref>
                        <Button  >
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

                <Button  >
                    Menu
                </Button >
            </Toolbar>
        </AppBar>
    )
}
