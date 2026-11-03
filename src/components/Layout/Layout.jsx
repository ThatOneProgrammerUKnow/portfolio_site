import { Outlet, ScrollRestoration } from 'react-router';
import { LazyMotion } from 'motion/react';
import site from '../../content/site.json';
import Logo from '../Logo/Logo';
import OrbNav from '../OrbNav/OrbNav';
import Footer from '../Footer/Footer';
import './Layout.css';

const loadMotionFeatures = () => import('../../utils/motionFeatures').then((module) => module.default);

export default function Layout() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <a href="#main" className="skip-link">
        {site.skipLink}
      </a>
      <header className="site-header container">
        <Logo />
      </header>
      <OrbNav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </LazyMotion>
  );
}
