import { Typography } from "@mui/material"
import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from "../../hooks"


const MenProductsPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men')

    return (
        <ShopLayout title="Mens products" pageDescription="mens page">

            <Typography variant="h1" component='h1'>Tienda</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Mens products</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default MenProductsPage