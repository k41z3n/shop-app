import { useContext, useEffect } from 'react';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

import { CartContext } from "../../context";

import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { CartList } from '../../components/cart';
import { OrderSummary } from "../../components/cart";
import { jwt } from '../../utils';

const CartPage = () => {
    const { hasProducts, cart } = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (hasProducts && cart.length === 0) {
            router.replace('/cart/empty')
        }
    }, [hasProducts, cart, router])

    if (!hasProducts && cart.length === 0) return <></>

    return (
        <ShopLayout title="Shopping Cart" pageDescription="cart shopping">
            <Typography variant="h1" component='h1'>Cart</Typography>
            <Grid container >

                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>

                <Grid item xs={12} sm={5} >
                    <Card className="summary-card"  >
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{ my: 1 }} />
                        <OrderSummary />
                        <Box sx={{ mt: 3 }}>
                            <Button
                                color="secondary"
                                className="circular-bnt"
                                fullWidth
                                href='/checkout/address'
                            >
                                Checkout
                            </Button>

                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}


// ! MOVE TO Middleware
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const { token = '' } = req.cookies
//     let isValidToken = false

//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true
//     } catch {
//         isValidToken = false
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {},
//     };
// };


export default CartPage