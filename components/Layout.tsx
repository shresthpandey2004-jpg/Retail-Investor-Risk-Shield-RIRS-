import { ReactNode } from 'react';
import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | RIRS` : 'RIRS - Retail Investor Risk Shield'}</title>
        <meta name="description" content={description || 'Professional SaaS platform to protect retail investors from unnecessary losses, risky trades, and emotional mistakes.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;