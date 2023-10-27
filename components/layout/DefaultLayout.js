import Head from 'next/head';
import Footer from '../feature/Footer';
import Header from '../feature/Header';
import Sidebar from '../feature/sidebar/Sidebar';

function DefaultLayout({ children, title = 'Embersense' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex w-full min-h-[100vh]">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full">
          <Header></Header>
          <main className="flex-1 p-4 relative">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
