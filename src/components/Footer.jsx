import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo-lab-saresa-01.png';

export default function Footer({ onNavigate }) {
  const handleNavClick = (tabId) => {
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  return (
    <footer className="bg-[#181514] text-neutral-300 border-t-2 border-[#E04323]">
      <div className="container py-7 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
          {/* 1. Logo suelto sobre fondo oscuro + Acreditaciones */}
          <div className="space-y-3 max-w-md min-w-0">
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className="block max-w-full text-left focus:outline-none"
              aria-label="Ir al inicio de Laboratorio Saresa"
            >
              <img
                src={logoImg}
                alt="Laboratorio Saresa — Reproducción Humana Asistida"
                className="h-8 sm:h-10 w-auto max-w-[220px] sm:max-w-none object-contain brightness-110"
              />
            </button>
            <div className="flex flex-col min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 text-[#FAA61A] font-medium">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>Acreditado SAMER · PEEC-FBA</span>
              </span>
              <span className="hidden min-[420px]:inline">·</span>
              <span>Atención sin turno y extracciones a domicilio</span>
            </div>
          </div>

          {/* 2. Navegación compacta */}
          <nav
            aria-label="Enlaces del pie de página"
            className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-2.5 text-sm font-medium"
          >
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'pacientes', label: 'Pacientes' },
              { id: 'reproduccion', label: 'Embriología y Fertilidad' },
              { id: 'profesionales', label: 'Médicos y Derivaciones' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="py-0.5 text-left text-neutral-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3. Contacto y Sede en línea compacta */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm text-neutral-300 min-w-0">
            <a
              href="https://maps.google.com/?q=Mariano+Boedo+23,+Salta,+Argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <MapPin className="h-4 w-4 shrink-0 text-[#E04323]" />
              <span>Mariano Boedo 23, Salta</span>
            </a>

            <span className="inline-flex items-center gap-2 text-neutral-400">
              <Clock className="h-4 w-4 shrink-0 text-[#E04323]" />
              <span>Lun–Vie 7:30–19:30 · Sáb 9:00–12:30</span>
            </span>

            <a
              href="tel:03874215440"
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#FAA61A] transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0 text-[#E04323]" />
              <span>(0387) 421-5440</span>
            </a>

            <a
              href="mailto:laboratoriosaresa@hotmail.com.ar"
              className="inline-flex min-w-0 items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0 text-[#E04323]" />
              <span className="truncate">laboratoriosaresa@hotmail.com.ar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior mínima con resguardo inferior móvil para el botón flotante */}
      <div className="border-t border-white/10 pt-3.5 pb-20 sm:py-3.5">
        <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Clínica Laboratorio Saresa · Salta,
            Argentina
          </p>
          <p className="sm:pr-44">
            Análisis clínicos de baja y alta complejidad · Embriología
          </p>
        </div>
      </div>
    </footer>
  );
}
