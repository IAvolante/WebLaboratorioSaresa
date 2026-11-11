import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Clock,
  Microscope,
  Dna,
  Home,
  ArrowRight,
  X,
} from 'lucide-react';
import heroClinicaImg from '../assets/hero-clinica.jpg';
import { ANALYSES_DATA } from '../data/analysesData';

const QUICK_SUGGESTIONS = [
  'Glucemia',
  'Espermograma',
  'Orina Completa',
  'TSH',
  'Hemograma',
];

export default function Hero({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  const cleanString = (str) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const normalized = cleanString(trimmed);
    return ANALYSES_DATA.filter((item) =>
      cleanString(item).includes(normalized)
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStudy = (studyName) => {
    setIsOpenDropdown(false);
    onNavigate('profesionales');
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('saresa:select-study', { detail: studyName })
      );
    }, 80);
  };

  return (
    <section
      className="relative bg-[#F7F6F4] pb-8 sm:pb-10"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Institutional Photographic / Google Flow Video Banner */}
      <div className="relative min-h-[410px] sm:min-h-[470px] md:min-h-[530px] flex items-center overflow-hidden bg-[#181515]">
        <video
          src="/banners/hero-saresa.mp4"
          poster={heroClinicaImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay vertical envolvente en celular para contraste uniforme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141111]/85 via-[#141111]/75 to-[#141111]/90 md:hidden" />
        {/* Overlay horizontal editorial en pantallas medianas y escritorio */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(18, 15, 15, 0.90) 0%, rgba(22, 18, 18, 0.76) 44%, rgba(22, 18, 18, 0.22) 76%, rgba(22, 18, 18, 0.04) 100%)',
          }}
        />

        <div className="container relative z-10 py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex max-w-full items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded bg-black/35 backdrop-blur-xs border border-white/25 text-white text-[11.5px] sm:text-sm font-medium mb-4 sm:mb-5">
              <span className="w-2 h-2 shrink-0 rounded-full bg-[#FAA61A]" />
              <span className="leading-snug">
                Mariano Boedo 23, Salta · Atención por orden de llegada
              </span>
            </div>

            <h1
              className="text-[26px] min-[390px]:text-[29px] sm:text-4xl md:text-[44px] font-bold text-white leading-[1.14] tracking-tight mb-3.5 sm:mb-4"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 16px rgba(0, 0, 0, 0.35)',
              }}
            >
              Análisis clínicos sin turno previo y laboratorio de embriología
            </h1>

            <p
              className="text-sm min-[390px]:text-base sm:text-lg text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-xl"
              style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
            >
              Más de 300 análisis bioquímicos, extracciones a domicilio y
              medicina reproductiva con resultados rápidos y confiables.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('pacientes')}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3.5 rounded bg-[#E04323] hover:bg-[#C43417] active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
              >
                <span>Indicaciones y Atención Sin Turno</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20una%20extracci%C3%B3n%20a%20domicilio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3.5 rounded bg-white hover:bg-[#F7F6F4] active:scale-[0.99] text-[#231F20] font-semibold text-sm sm:text-base shadow-sm transition-all"
              >
                <Home className="w-4 h-4 shrink-0 text-[#E04323]" />
                <span>Extracción a domicilio por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping White 4 Key Pillars + Compact Search Bar */}
      <div className="container">
        <div className="-mt-6 sm:-mt-10 relative z-20 bg-white rounded-md shadow-md border border-neutral-200">
          {/* Upper Bar: 4 Key Commercial Pillars (2x2 on mobile, 1x4 on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-neutral-200">
            {/* 1. Atención sin turno */}
            <button
              type="button"
              onClick={() => onNavigate('pacientes')}
              className="p-3.5 sm:p-5 text-left hover:bg-[#F7F6F4]/70 active:bg-[#F7F6F4] transition-colors cursor-pointer flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 border-b border-r border-neutral-200 lg:border-b-0 group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-[#E04323]/10 text-[#E04323] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[13.5px] min-[390px]:text-sm sm:text-base font-bold text-[#231F20] group-hover:text-[#E04323] transition-colors leading-snug">
                  Atención sin turno
                </h2>
                <p className="text-[11.5px] sm:text-xs text-[#52525B] mt-0.5 leading-snug">
                  Lun a Vie 7:30–11:30 · Sáb 9:00–11:30 hs (espera &lt; 10 min)
                </p>
              </div>
            </button>

            {/* 2. +300 análisis */}
            <button
              type="button"
              onClick={() => onNavigate('profesionales')}
              className="p-3.5 sm:p-5 text-left hover:bg-[#F7F6F4]/70 active:bg-[#F7F6F4] transition-colors cursor-pointer flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 border-b border-neutral-200 lg:border-b-0 lg:border-r group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-[#E04323]/10 text-[#E04323] flex items-center justify-center flex-shrink-0">
                <Microscope className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[13.5px] min-[390px]:text-sm sm:text-base font-bold text-[#231F20] group-hover:text-[#E04323] transition-colors leading-snug">
                  +300 análisis
                </h2>
                <p className="text-[11.5px] sm:text-xs text-[#52525B] mt-0.5 leading-snug">
                  Rutina, hormonas, pediatría y alta complejidad
                </p>
              </div>
            </button>

            {/* 3. Embriología y Fertilidad */}
            <button
              type="button"
              onClick={() => onNavigate('reproduccion')}
              className="p-3.5 sm:p-5 text-left hover:bg-[#F7F6F4]/70 active:bg-[#F7F6F4] transition-colors cursor-pointer flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 border-r border-neutral-200 group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-[#7E1418]/10 text-[#7E1418] flex items-center justify-center flex-shrink-0">
                <Dna className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[13.5px] min-[390px]:text-sm sm:text-base font-bold text-[#231F20] group-hover:text-[#7E1418] transition-colors leading-snug">
                  Embriología y Fertilidad
                </h2>
                <p className="text-[11.5px] sm:text-xs text-[#52525B] mt-0.5 leading-snug">
                  Reproducción humana asistida acreditada SAMER
                </p>
              </div>
            </button>

            {/* 4. Extracciones a domicilio */}
            <a
              href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20una%20extracci%C3%B3n%20a%20domicilio."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-5 text-left hover:bg-[#F7F6F4]/70 active:bg-[#F7F6F4] transition-colors flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-[#E04323]/10 text-[#E04323] flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-[13.5px] min-[390px]:text-sm sm:text-base font-bold text-[#231F20] group-hover:text-[#E04323] transition-colors leading-snug">
                  Extracciones a domicilio
                </h2>
                <p className="text-[11.5px] sm:text-xs text-[#52525B] mt-0.5 leading-snug">
                  Vamos a tu hogar en Salta · Coordiná por WhatsApp
                </p>
              </div>
            </a>
          </div>

          {/* Lower Bar: Compact 1-Line Study & Preparation Search */}
          <div
            ref={searchContainerRef}
            className="px-3.5 py-3.5 sm:px-5 sm:py-4 bg-[#F7F6F4]/50 relative"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 sm:gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onFocus={() => setIsOpenDropdown(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpenDropdown(true);
                  }}
                  placeholder="¿Qué estudio te pidieron? Ej: Glucemia, Espermograma, TSH..."
                  className="w-full pl-10 pr-9 py-2.5 rounded border border-neutral-300 focus:border-[#E04323] focus:outline-none text-base sm:text-sm text-[#231F20] bg-white"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setIsOpenDropdown(false);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#231F20] cursor-pointer"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap min-w-0">
                {QUICK_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      setIsOpenDropdown(true);
                    }}
                    className="shrink-0 whitespace-nowrap text-xs px-2.5 py-1.5 rounded bg-white hover:bg-[#E04323]/10 active:bg-[#E04323]/15 text-[#52525B] hover:text-[#E04323] border border-neutral-200 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => onNavigate('pacientes')}
                  className="shrink-0 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded bg-[#231F20] hover:bg-[#E04323] text-white transition-colors cursor-pointer"
                >
                  Guías de ayuno →
                </button>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {isOpenDropdown && query.trim().length > 0 && (
              <div className="absolute left-3 right-3 sm:left-5 sm:right-5 top-full mt-1 bg-white rounded-md shadow-lg border border-neutral-200 z-30 overflow-hidden">
                {results.length > 0 ? (
                  <div className="divide-y divide-neutral-100 max-h-[60dvh] overflow-y-auto">
                    {results.map((study) => (
                      <div
                        key={study}
                        className="px-3.5 sm:px-4 py-2.5 hover:bg-[#F7F6F4] flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-1.5 min-[480px]:gap-3 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectStudy(study)}
                          className="text-left flex-1 min-w-0 text-sm font-medium text-[#231F20] hover:text-[#E04323] leading-snug cursor-pointer"
                        >
                          {study}
                        </button>
                        <div className="flex items-center justify-end gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpenDropdown(false);
                              onNavigate('pacientes');
                            }}
                            className="text-xs text-[#52525B] hover:text-[#231F20] underline cursor-pointer py-0.5"
                          >
                            Ver ayuno
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectStudy(study)}
                            className="text-xs font-semibold text-[#E04323] hover:underline cursor-pointer py-0.5"
                          >
                            Ver estudio →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-3.5 sm:px-4 py-3 text-xs sm:text-sm text-[#52525B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>Consultá nuestras +300 determinaciones bioquímicas.</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpenDropdown(false);
                        onNavigate('profesionales');
                      }}
                      className="text-left sm:text-right text-xs font-semibold text-[#E04323] hover:underline cursor-pointer shrink-0"
                    >
                      Ver listado completo →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
