import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material"
import ShopLayout from "../../components/layouts/ShopLayout"
import { CartList } from '../../components/cart/CartList';
import { OrderSumary } from "../../components/cart";

const CartPage = () => {
    return (
        <ShopLayout title="Shopping Cart" pageDescription="cart shopping">
            <Typography variant="h1" component='h1'>Cart</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{ my: 1 }} />
                        <OrderSumary />
                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className="circular-bnt" fullWidth>Checkout </Button>

                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default CartPage