import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { NextPage } from "next"
import ShopLayout from "../components/layouts/ShopLayout"
import { initialData } from "../database/products"


const Home: NextPage = () => {
  return (
    <ShopLayout title="home" pageDescription="home page">

      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map(prod => (
            <Grid item sm={4} key={prod.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia component='img' image={`products/${prod.images[0]}`} alt={prod.title} />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>

    </ShopLayout>
  )
}

export default Home