import { Typography } from "@mui/material"
import { NextPage } from "next"
import ShopLayout from "../components/layouts/ShopLayout"
import { initialData } from "../database/products"

import { ProductList } from "../components/products"

const Home: NextPage = () => {
  return (
    <ShopLayout title="home" pageDescription="home page">

      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>

      <ProductList products={initialData.products as any} />

    </ShopLayout>
  )
}

export default Home