import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from "../../hooks"
import { Typography } from "@mui/material"

const KidProductsPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=kid')

    return (
        <ShopLayout title="Kid products" pageDescription="kids page">

            <Typography variant="h1" component='h1'>Tienda</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Kids products</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default KidProductsPage