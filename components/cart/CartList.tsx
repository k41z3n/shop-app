import { FC, useContext } from 'react';
import NextLink from 'next/link';

import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

import { Grid, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { ItemCounter } from '../ui';
interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartProduct, removeCartProduct } = useContext(CartContext)

    const onChangeQuantity = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity
        updateCartProduct(product)
    }

    return (
        <>
            {
                cart.map(product => (
                    <Grid container key={product.slug + product.size} spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/products/${product.slug}`} passHref>

                                <CardActionArea>
                                    <CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: 5 }} />
                                </CardActionArea>

                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>{'talla :'} <strong>{product.size}</strong></Typography>
                                {
                                    editable
                                        ?
                                        (
                                            <ItemCounter
                                                quantity={product.quantity}
                                                maxQuantity={10}
                                                onChangeQuantity={(value) => onChangeQuantity(product, value)} />
                                        )
                                        :
                                        (
                                            <Typography variant='h5'>
                                                {product.quantity}
                                                {product.quantity > 1 ? 'Item' : "Items"}
                                            </Typography>
                                        )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button
                                        variant='text'
                                        color='secondary'
                                        onClick={() => removeCartProduct(product)}
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
