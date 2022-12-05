import { NextPage } from "next"

import { ProductList } from "../components/products"
import { useProducts } from '../hooks';

import { Typography } from "@mui/material"

import { ShopLayout } from "../components/layouts"
import { FullScreenLoading } from "../components/ui";

const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/products')


  return (
    <ShopLayout title="home" pageDescription="home page">

      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default Home