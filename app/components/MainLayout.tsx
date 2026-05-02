import Header from './Header'
import Footer from './Footer'
import './main-layout.css'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  )
}
