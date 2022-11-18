
import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { Link, AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UiContext } from '../../context';


export const Navbar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchInputVisible, setSearchInputVisible] = useState(false)

    const { asPath, push } = useRouter()

    const { toggeSideMenu } = useContext(UiContext)


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>

                    <Typography variant='h6'>Shop</Typography>
                    <Typography sx={{ ml: 0.5 }}></Typography>

                </NextLink>
                <Box flex={1} />

                <Box
                    sx={{ display: searchInputVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">
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
                {
                    searchInputVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className="fadeIn"
                                autoFocus
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setSearchInputVisible(false)}
                                            aria-label="toggle password visibility"
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        :
                        (
                            <IconButton
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className="fadeIn"
                                onClick={() => setSearchInputVisible(true)}>
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggeSideMenu}>
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
