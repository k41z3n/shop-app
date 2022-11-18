import { NextPage, GetServerSideProps } from "next"

import { ProductList } from "../../components/products"

import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

import { dbProducts } from "../../database";
import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[]
    totalRecords: number
    foundProducts: boolean
    query: string
}

const Search: NextPage<Props> = ({ products, totalRecords, foundProducts, query }) => {


    return (
        <ShopLayout title="Search" pageDescription="Search page">

            <Typography variant="h1" component='h1'>Buscador</Typography>
            {
                foundProducts ?
                    <>
                        <Typography variant="h2" sx={{ mb: 1 }} component='h2'>Busqueda de productos: {query}</Typography>
                        <Typography variant="subtitle2" sx={{ mb: 1 }} component='p'>Total : {totalRecords}</Typography>
                    </>
                    :
                    <>
                        <Typography variant="h2" sx={{ mb: 1 }} component='h2'>No se encontraron productos</Typography>
                        <Typography variant="subtitle2" sx={{ mb: 1 }} component='p' color='secondary'> {query}</Typography>
                    </>
            }

            <ProductList products={products} />

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if (query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const totalRecords = products.length
    const foundProducts = products.length > 0

    if (!foundProducts) {
        products = await dbProducts.getProductsByTerm('shirt')
    }

    return {
        props: {
            products, totalRecords, foundProducts, query
        },
    };
};

export default Search