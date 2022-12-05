import type { AppProps } from 'next/app'

import { AuthProvider, CartProvider, UiProvider } from '../context'

import { SWRConfig } from 'swr'
import { lightTheme } from '../themes'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      // refreshInterval: 3000,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}>
      <AuthProvider isLoggedIn={false} >
        <CartProvider cart={[]} numberOfItems={0} subTotal={0} tax={0} total={0} hasProducts={false} >
          <UiProvider isMenuOpen={false}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
