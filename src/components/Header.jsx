import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import logoImg from '../assets/logo-lab-saresa-01.png';

export default function Header({
  activeTab,
  setActiveTab,
  onOpenCommandPalette,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'pacientes', label: 'Pacientes' },
    { id: 'reproduccion', label: 'Embriología y Fertilidad' },
    { id: 'profesionales', label: 'Médicos y Derivaciones' },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Barra Superior Corporativa — siempre en 1 sola línea limpia en todos los anchos */}
      <div className="bg-[#7E1418] text-white text-[11.5px] sm:text-xs xl:text-[13px] py-1.5 sm:py-2">
        <div className="container flex items-center justify-between gap-3 whitespace-nowrap overflow-hidden">
          {/* Izquierda: Sede con Google Maps y Horario de Atención */}
          <div className="flex min-w-0 items-center gap-x-3.5 xl:gap-x-4 overflow-hidden">
            <a
              href="https://maps.google.com/?q=Mariano+Boedo+23,+Salta,+Argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center gap-1 sm:gap-1.5 font-medium text-white hover:text-[#FAA61A] transition-colors truncate"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FAA61A]" />
              <span className="truncate">Mariano Boedo 23, Salta</span>
            </a>
            <span className="hidden text-white/35 md:inline">|</span>
            <span className="hidden items-center gap-1.5 text-white/90 md:inline-flex truncate">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#FAA61A]" />
              <span className="hidden xl:inline">
                Lun a Vie 7:30 a 19:30 hs · Sáb 9:00 a 12:30 hs
              </span>
              <span className="xl:hidden">
                Lun–Vie 7:30–19:30 · Sáb 9:00–12:30
              </span>
            </span>
          </div>

          {/* Derecha: Teléfono directo y modalidad de atención */}
          <div className="flex shrink-0 items-center gap-x-3.5 xl:gap-x-4">
            <a
              href="tel:03874215440"
              className="inline-flex items-center gap-1 sm:gap-1.5 font-semibold text-white hover:text-[#FAA61A] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#FAA61A]" />
              <span>(0387) 421-5440</span>
            </a>
            <span className="hidden text-white/35 lg:inline">|</span>
            <span className="hidden items-center gap-1.5 text-white/95 lg:inline-flex">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#FAA61A]" />
              <span className="hidden xl:inline">
                Atención sin turno · Extracciones a domicilio
              </span>
              <span className="xl:hidden">Sin turno · Domicilios</span>
            </span>
          </div>
        </div>
      </div>

      {/* Header Principal Institucional sobre Blanco Puro */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-[45] shadow-2xs">
        <div className="relative z-50 bg-white">
          <div className="container flex h-16 sm:h-[72px] xl:h-20 items-center justify-between gap-2 sm:gap-3 xl:gap-5">
            {/* Logo Oficial Laboratorio Saresa (proporción 9.17:1 acotada por ancho para nunca invadir el menú) */}
            <button
              type="button"
              onClick={() => handleNav('inicio')}
              className="flex shrink-0 items-center py-2 text-left focus:outline-none"
              aria-label="Ir al inicio de Laboratorio Saresa"
            >
              <img
                src={logoImg}
                alt="Laboratorio Saresa — Reproducción Humana Asistida y Análisis Clínicos"
                className="block h-auto w-[168px] min-[390px]:w-[196px] sm:w-[228px] lg:w-[198px] xl:w-[248px] 2xl:w-[268px] max-w-full object-contain"
              />
            </button>

            {/* Navegación Institucional Central (Desktop >= 1024px) */}
            <nav
              aria-label="Navegación Principal"
              className="hidden h-full min-w-0 items-center gap-0.5 lg:flex xl:gap-1.5"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`relative flex h-full items-center whitespace-nowrap px-2 xl:px-3.5 text-[13px] xl:text-[14.5px] font-medium transition-colors ${
                      isActive
                        ? 'text-[#E04323] font-semibold'
                        : 'text-[#231F20] hover:text-[#E04323]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute right-1.5 bottom-0 left-1.5 h-[3px] bg-[#E04323] rounded-t-xs" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Acciones Derecha: Buscador de Estudios + WhatsApp Directo */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCommandPalette) onOpenCommandPalette();
                }}
                className="inline-flex h-10 w-10 p-0 items-center justify-center gap-1.5 whitespace-nowrap rounded border border-neutral-300 bg-neutral-50 text-[13px] xl:text-sm font-medium text-[#231F20] transition-all hover:border-[#E04323] hover:bg-[#FDF2EF] hover:text-[#E04323] active:scale-[0.99] sm:h-9 sm:w-auto sm:px-3 xl:h-10 xl:px-3.5"
                aria-label="Buscar estudios e indicaciones"
              >
                <Search className="h-4 w-4 shrink-0 text-[#E04323]" />
                <span className="hidden sm:inline lg:hidden xl:inline">
                  Buscar estudios
                </span>
                <span className="hidden lg:inline xl:hidden">Buscar</span>
              </button>

              <a
                href="https://wa.me/5493872129924"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 whitespace-nowrap bg-[#E04323] hover:bg-[#C43417] text-white rounded h-9 px-3 xl:h-10 xl:px-4 text-[13px] xl:text-sm font-medium transition-colors shadow-2xs md:inline-flex"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span className="hidden xl:inline">WhatsApp Directo</span>
                <span className="xl:hidden">WhatsApp</span>
              </a>

              {/* Botón Menú Móvil / Tablet (< 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded border border-neutral-200 bg-white text-[#231F20] hover:bg-neutral-50 active:scale-[0.99] transition-all lg:hidden"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable Móvil y Tablet (< 1024px) */}
        {mobileMenuOpen && (
          <>
            <div
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] lg:hidden"
            />
            <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-neutral-200 bg-white shadow-xl sm:max-h-[calc(100dvh-4.5rem)] lg:hidden">
              <div className="container py-4 space-y-3.5">
                <nav
                  aria-label="Navegación móvil"
                  className="flex flex-col divide-y divide-neutral-100"
                >
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNav(item.id)}
                        className={`relative flex min-h-[48px] items-center justify-between px-3 text-left text-[15px] transition-colors active:bg-neutral-100 ${
                          isActive
                            ? 'font-semibold text-[#E04323] bg-[#FDF2EF]/70 rounded-r'
                            : 'font-medium text-[#231F20] hover:text-[#E04323]'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#E04323]" />
                        )}
                        <span>{item.label}</span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#E04323]' : 'text-neutral-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-3 border-t border-neutral-200 space-y-3">
                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
                    <a
                      href="https://wa.me/5493872129924"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] min-w-0 items-center justify-center gap-1.5 rounded bg-[#E04323] px-2.5 py-2.5 text-center text-xs min-[390px]:text-sm font-semibold leading-tight text-white hover:bg-[#C43417] active:scale-[0.99] transition-all"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>WhatsApp Directo</span>
                    </a>
                    <a
                      href="tel:03874215440"
                      className="flex min-h-[44px] min-w-0 items-center justify-center gap-1.5 rounded border border-neutral-300 bg-white px-2.5 py-2.5 text-center text-xs min-[390px]:text-sm font-semibold leading-tight text-[#231F20] hover:border-[#E04323] hover:text-[#E04323] active:scale-[0.99] transition-all"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-[#E04323]" />
                      <span>Llamar (0387) 421-5440</span>
                    </a>
                  </div>

                  <div className="rounded bg-[#F7F6F4] border border-neutral-200/80 p-3 text-xs text-[#52525B] space-y-1">
                    <p className="font-semibold text-[#231F20] flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#7E1418]" />
                      <span>Sede Central: Mariano Boedo 23, Salta</span>
                    </p>
                    <p>Lun a Vie de 7:30 a 19:30 hs · Sáb de 9:00 a 12:30 hs</p>
                    <p className="text-[#7E1418] font-medium">
                      Atención por orden de llegada sin turno previo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
