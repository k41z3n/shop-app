import { Typography } from "@mui/material"
import { NextPage } from "next"
import ShopLayout from "../components/layouts/ShopLayout"


const Home: NextPage = () => {
  return (
    <ShopLayout title="home" pageDescription="home page">

      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>

    </ShopLayout>
  )
}

export default Home