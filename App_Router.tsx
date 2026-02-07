import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// UI Components
import { NewHero as Hero } from "./components/ui/new-hero";
import { ProjectShowcase, projects } from "./components/ui/project-showcase";
import { ServicesScrollAccordion } from "./components/home/ServicesScrollAccordion";
import { WhyUs } from "./components/home/WhyUs";
import { AboutSection } from "./components/home/AboutSection";
import { Insights } from "./components/home/Insights";
import { ScalexTeaser } from "./components/home/ScalexTeaser";
import { CustomCursor } from './components/ui/CustomCursor';

// Page Components (Lazy Loaded)
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const WorkPage = React.lazy(() => import('./components/WorkPage').then(module => ({ default: module.WorkPage })));
const ServicesPage = React.lazy(() => import('./components/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceDetail = React.lazy(() => import('./components/ServiceDetail').then(module => ({ default: module.ServiceDetail })));
const ScalexPage = React.lazy(() => import('./components/ScalexPage').then(module => ({ default: module.ScalexPage })));
const BlogPage = React.lazy(() => import('./components/BlogPage').then(module => ({ default: module.BlogPage })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const CareersPage = React.lazy(() => import('./components/CareersPage').then(module => ({ default: module.CareersPage })));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));

// Layout & Utils
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from "./components/ui/loading-screen";
import { CookieBanner } from "./components/ui/cookie-banner";
import { useLanguage } from "./components/LanguageContext";
import { blogPosts } from "./lib/data";
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';

// Wrappers
const ProjectDetailWrapper = () => {
    const { title } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.title === decodeURIComponent(title || ''));

    if (!project) return <Navigate to="/" replace />;
    
    return (
        <>
            <SEO title={project.title} description={project.description} />
            <ProjectDetail project={project} onBack={() => navigate('/')} />
        </>
    );
};

const ServiceDetailWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <>
            <SEO title="Detail Služby" />
            <ServiceDetail serviceId={id!} onBack={() => navigate('/services')} />
        </>
    );
};

const BlogPageWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const handleSelectPost = (postId: number | null) => {
        if (postId) navigate(`/blog/${postId}`);
        else navigate('/blog');
    };

    return (
        <>
            <SEO title="Blog" />
            <BlogPage 
                posts={blogPosts} 
                selectedPostId={id ? Number(id) : null} 
                onSelectPost={handleSelectPost}
                onBack={() => navigate('/')}
            />
        </>
    );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFastLoad, setIsFastLoad] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
        setIsFastLoad(true);
    } else {
        sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const { isTransitioning, finishTransition } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePage = (path: string) => {
      if (path === '/') return 'home';
      if (path.startsWith('/services')) return 'services';
      if (path.startsWith('/projects') || path.startsWith('/work')) return 'projects';
      if (path.startsWith('/scalex')) return 'scalex';
      if (path.startsWith('/blog')) return 'blog';
      if (path.startsWith('/careers')) return 'careers';
      if (path === '/contact') return 'contact';
      if (path === '/privacy-policy') return 'privacy-policy';
      return 'home';
  };

  const activePage = getActivePage(location.pathname);

  const handleNavigate = (page: string) => {
    if (page === 'home') navigate('/');
    else if (page === 'services') navigate('/services');
    else if (page === 'scalex') navigate('/scalex');
    else if (page === 'blog') navigate('/blog');
    else if (page === 'careers') navigate('/careers');
    else if (page === 'contact') navigate('/contact');
    else if (page === 'projects') navigate('/work');
    else if (page === 'privacy-policy') navigate('/privacy-policy');
  };

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {(isLoading || isTransitioning) && (
            <LoadingScreen 
                key={isLoading ? "loader-init" : "loader-trans"} 
                isFast={isFastLoad}
                onFinished={() => {
                    if (isLoading) setIsLoading(false);
                    if (isTransitioning) finishTransition();
                }} 
            />
        )}
      </AnimatePresence>
      
      <div className="bg-brand-black min-h-screen text-white selection:bg-brand-purple selection:text-white w-full">
        {!isLoading && (
            <>
                <Header onNavigate={handleNavigate} activePage={activePage} />
                
                <main>
                  <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-brand-black text-white/50 font-mono">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <SEO title="Domov" />
                                <Hero onViewProjects={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} />
                                <AboutSection />
                        <section id="projects">
                            <ProjectShowcase onProjectSelect={(p) => navigate(`/projects/${encodeURIComponent(p.title)}`)} />
                        </section>
                        <div className="relative z-10 bg-brand-black">
                           <ServicesScrollAccordion onSelectService={(id) => navigate(`/services/${id}`)} />
                        </div>
                        <WhyUs />
                        <ScalexTeaser onNavigate={() => navigate('/scalex')} />
                        <Insights onNavigate={() => navigate('/blog')} />
                    </>
                } />
                
                <Route path="/projects/:title" element={<ProjectDetailWrapper />} />
                
                <Route path="/services" element={
                     <>
                        <SEO title="Služby" />
                        <ServicesPage onBack={() => navigate('/')} />
                     </>
                } />
                <Route path="/services/:id" element={<ServiceDetailWrapper />} />

                {/* Work Page */}
                <Route path="/work" element={
                    <>
                        <SEO 
                            title="Our Work | GrowthSpect" 
                            description="Explore our portfolio of custom software solutions, AI implementations, and digital transformation projects." 
                        />
                        <WorkPage />
                    </>
                } />

                <Route path="/scalex" element={
                    <>
                        <SEO title="SCALEX" />
                        <ScalexPage onBack={() => navigate('/')} />
                    </>
                } />

                <Route path="/blog" element={<BlogPageWrapper />} />
                <Route path="/blog/:id" element={<BlogPageWrapper />} />

                <Route path="/contact" element={
                    <>
                        <SEO title="Kontakt" />
                        <ContactPage />
                    </>
                } />
                
                <Route path="/careers" element={
                    <>
                         <SEO title="Kariéra" />
                         <CareersPage />
                    </>
                } />

                <Route path="/privacy-policy" element={
                    <>
                        <SEO title="Ochrana osobních údajů" />
                        <PrivacyPolicyPage />
                    </>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </main>
        
        <Footer onNavigate={handleNavigate} />
        <CookieBanner />
            </>
        )}
      </div>
    </>
  );
}
