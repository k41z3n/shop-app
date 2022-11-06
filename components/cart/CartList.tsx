import { initialData } from '../../database/products'
import { Grid, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC } from 'react';


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
]


interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {


    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={'/products/slug'} passHref>

                                <CardActionArea>
                                    <CardMedia image={`products/${product.images[0]}`} component='img' sx={{ borderRadius: 5 }} />
                                </CardActionArea>

                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>{'talla :'} <strong>M</strong></Typography>
                                {
                                    editable
                                        ? <Typography variant='h5'>3 items</Typography>
                                        : <ItemCounter />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant='text' color='secondary'>Remover</Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
