import Head from 'next/head';
import Footer from '../feature/Footer';
import Header from '../feature/Header';
import Sidebar from '../feature/sidebar/Sidebar';
import clsx from 'clsx';

function DefaultLayout({
  children,
  title = 'Embersense',
  header = true,
  footer = true,
  className,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex w-full min-h-[100vh] lg:flex-row flex-col">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full">
          {header ? <Header></Header> : <></>}
          <main className={clsx('flex-1 relative p-4', className)}>
            {children}
          </main>
          {footer ? <Footer></Footer> : <></>}
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
