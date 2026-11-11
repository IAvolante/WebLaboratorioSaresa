import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import Header from './components/Header';
import InicioTab from './components/InicioTab';
import PacientesTab from './components/PacientesTab';
import ReproduccionTab from './components/ReproduccionTab';
import ProfesionalesTab from './components/ProfesionalesTab';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [cmdOpen, setCmdOpen] = useState(false);

  // Fuerza siempre el tema claro institucional y activa scroll fluido con Lenis
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSearchModal = () => {
    setCmdOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <InicioTab
            onNavigate={handleNavigate}
            onOpenSearch={openSearchModal}
          />
        );
      case 'pacientes':
        return (
          <PacientesTab
            onNavigate={handleNavigate}
            onOpenSearch={openSearchModal}
          />
        );
      case 'reproduccion':
        return (
          <ReproduccionTab
            onNavigate={handleNavigate}
            onOpenSearch={openSearchModal}
          />
        );
      case 'profesionales':
        return (
          <ProfesionalesTab
            onNavigate={handleNavigate}
            onOpenSearch={openSearchModal}
          />
        );
      default:
        return (
          <InicioTab
            onNavigate={handleNavigate}
            onOpenSearch={openSearchModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#231F20] selection:bg-[#FDF2EF] selection:text-[#E04323]">
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenCommandPalette={openSearchModal}
      />

      {/* Contenedor Principal con Transición Suave */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="app-main"
        >
          {renderTabContent()}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />

      {/* Buscador Institucional de Estudios e Indicaciones */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onNavigate={handleNavigate}
      />

      {/* Botón Flotante Oficial de WhatsApp con Pulso/Titileo */}
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-5 sm:bottom-5 z-40">
        <a
          href="https://wa.me/5493872129924"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultas por WhatsApp con Laboratorio Saresa"
          style={{ color: '#FFFFFF' }}
          className="whatsapp-blink-btn flex min-h-[44px] items-center gap-2 sm:gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] px-4 py-2.5 sm:px-5 sm:py-3 text-[13px] sm:text-sm font-bold text-white transition-all"
        >
          <svg
            viewBox="0 0 448 512"
            fill="currentColor"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <span className="hidden sm:inline">Consultas por WhatsApp</span>
          <span className="sm:hidden">Consultas WhatsApp</span>
        </a>
      </div>

      {/* Notificaciones institucionales limpias */}
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            borderRadius: '6px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            border: '1px solid #E5E5E5',
            backgroundColor: '#FFFFFF',
            color: '#231F20',
          },
        }}
      />
    </div>
  );
}

export default App;
