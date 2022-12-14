
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";
import { CartContext } from "../../context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!Cookies.get("firstName")) {
            router.push("/checkout/address");
        }
    }, []);

    const { shippingAddress, numberOfItems, createOrder } =
        useContext(CartContext);
    if (!shippingAddress) return <></>;

    const onCreateOrder = async () => {

        setErrorMessage('')
        setIsLoading(true)

        const { hasError, message } = await createOrder();

        setIsLoading(false)
        if (hasError) {
            setErrorMessage(message)
            return
        }

        router.replace(`/orders/${message}`)
    };

    return (
        <ShopLayout
            title="Resumen de orden"
            pageDescription={"Resumen de la orden"}
        >
            <Typography variant="h1" component="h1">
                Resumen de la orden
            </Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">
                                Resumen ({numberOfItems}{" "}
                                {numberOfItems == 1 ? "Producto" : "Productos"})
                            </Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">
                                    Direcci??n de entrega
                                </Typography>
                                <NextLink href="/checkout/address" passHref>
                                    Editar
                                </NextLink>
                            </Box>

                            <Typography>{shippingAddress?.firstName}</Typography>
                            <Typography>{shippingAddress?.direction}</Typography>
                            <Typography>{shippingAddress?.direction2}</Typography>
                            <Typography>{shippingAddress?.city}</Typography>
                            <Typography>{shippingAddress?.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    Editar
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                                <Button
                                    color="secondary"
                                    className="circular-btn"
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isLoading}
                                >
                                    Confirmar Orden
                                </Button>
                                <Chip color="error" label={errorMessage} sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;
