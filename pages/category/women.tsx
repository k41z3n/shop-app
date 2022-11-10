import { Typography } from "@mui/material"
import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from "../../hooks"

const womenProductsPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women')

    return (
        <ShopLayout title="women page" pageDescription="womens page">

            <Typography variant="h1" component='h1'>Tienda</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Womens products</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default womenProductsPage