import Head from "next/head";
import { FC } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string
  children: JSX.Element[]
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="descripcion" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:descripcion" content={pageDescription} />

        {
          imageFullUrl && (<meta name="og:image" content={imageFullUrl} />)
        }

      </Head>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      <footer></footer>
    </>
  );
};


