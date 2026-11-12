import React from 'react';
import {
  Microscope,
  Droplet,
  Dna,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  Award,
} from 'lucide-react';
import andrologiaImg from '../assets/andrologia-samer.jpg';

const CLINICAL_UNITS = [
  {
    title: 'Embriología y Procedimientos Reproductivos',
    subtitle: 'Soporte embriológico y preparación gamética',
    icon: Dna,
    studies: [
      'Capacitación espermática (Swim-up / Gradientes de densidad) para IIU y FIV',
      'Recuperación espermática diagnóstica y terapéutica',
      'Evaluación funcional gamética y soporte de laboratorio de embriología',
      'Protocolos estandarizados bajo normas de bioseguridad reproductiva',
    ],
  },
  {
    title: 'Andrología Clínica (Acreditado SAMER)',
    subtitle: 'Evaluación del factor masculino bajo criterios OMS',
    icon: Microscope,
    studies: [
      'Espermograma completo computarizado y macro/microscópico',
      'Morfología espermática por criterio estricto de Kruger',
      'Test de vitalidad (Eosina) y movilidad progresiva',
      'Fragmentación de ADN espermático y anticuerpos antiespermáticos',
    ],
  },
  {
    title: 'Hormonas Reproductivas y Genética',
    subtitle: 'Reserva ovárica, endocrinología y estudios preconcepcionales',
    icon: Droplet,
    studies: [
      'Hormona Antimülleriana (AMH) — marcador directo de reserva ovárica',
      'Perfiles hormonales del ciclo (FSH, LH, Estradiol, Prolactina, TSH)',
      'Cariotipo en sangre periférica y estudio de Trombofilias',
      'PCR para Chlamydia, Mycoplasma y Ureaplasma',
    ],
  },
];

export default function ReproduccionTab({ onNavigate }) {
  return (
    <div
      className="bg-white text-[#231F20] pb-16"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* 1. Institutional Header Banner with Google Flow Video */}
      <div className="bg-[#F7F6F4] border-b border-neutral-200 py-7 sm:py-12">
        <div className="container">
          <nav className="flex min-w-0 items-center gap-2 text-xs sm:text-sm text-[#52525B] mb-4 sm:mb-5">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="shrink-0 hover:text-[#E04323] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span className="shrink-0">/</span>
            <span className="truncate text-[#7E1418] font-medium">
              Embriología y Reproducción Asistida
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#7E1418]/10 text-[#7E1418] text-xs font-semibold">
                <Award className="w-4 h-4 shrink-0" />
                <span>Unidad Acreditada por SAMER</span>
              </div>

              <h1 className="text-2xl min-[390px]:text-3xl sm:text-4xl font-bold text-[#231F20] leading-tight">
                Embriología y Reproducción Humana Asistida
              </h1>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-xl">
                Laboratorio especializado en embriología, capacitación
                espermática, andrología clínica y perfiles de fertilidad con
                acreditación nacional SAMER.
              </p>

              <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20un%20turno%20para%20el%20%C3%A1rea%20de%20embriolog%C3%ADa%20/%20espermograma."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 rounded bg-[#7E1418] hover:bg-[#630F12] active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <span>Pedir turno por WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('profesionales')}
                  className="inline-flex w-full sm:w-auto justify-center items-center px-5 py-3 rounded bg-white hover:bg-neutral-100 active:scale-[0.99] text-[#231F20] border border-neutral-300 font-semibold text-sm transition-all cursor-pointer"
                >
                  Ver +300 análisis
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-md overflow-hidden border border-neutral-200 shadow-sm bg-white">
                <video
                  src={`${import.meta.env.BASE_URL}banners/reproduccion-saresa.mp4`}
                  poster={andrologiaImg}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-[215px] sm:h-[290px] object-cover"
                />
                <div className="px-3.5 py-2.5 sm:p-3.5 bg-white border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-[11.5px] sm:text-xs text-[#52525B]">
                  <span>Laboratorio de Embriología y Andrología</span>
                  <span className="font-semibold text-[#7E1418] whitespace-nowrap">
                    Normas OMS / SAMER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Concrete Clinical Pillars */}
      <div className="container pt-9 sm:pt-12 space-y-10 sm:space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CLINICAL_UNITS.map((unit, idx) => {
            const Icon = unit.icon;
            return (
              <div
                key={unit.title}
                className={`rounded-md border border-neutral-200 bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#7E1418]/10 text-[#7E1418] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-[#231F20]">
                    {unit.title}
                  </h2>
                  <p className="text-xs font-semibold text-[#E04323] mt-0.5 mb-4">
                    {unit.subtitle}
                  </p>
                  <ul className="space-y-2.5">
                    {unit.studies.map((study) => (
                      <li
                        key={study}
                        className="flex items-start gap-2 text-sm text-[#52525B]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E04323] mt-0.5 flex-shrink-0" />
                        <span>{study}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </section>

        {/* 3. Short & Clear Block: Cómo pedir turno e indicaciones rápidas */}
        <section className="rounded-md bg-[#F7F6F4] border border-neutral-200 p-5 sm:p-7 xl:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
            <div className="xl:col-span-8 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#231F20]">
                ¿Cómo coordinar un Espermograma o Estudio de Embriología?
              </h2>
              <p className="text-sm text-[#52525B]">
                Los análisis hormonales de sangre se realizan{' '}
                <strong className="text-[#231F20]">sin turno previo</strong>.
                Para espermograma o capacitación espermática solo necesitás:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white p-3.5 rounded border border-neutral-200 text-xs sm:text-sm">
                  <strong className="text-[#231F20] block">
                    1. Abstinencia 3 a 5 días
                  </strong>
                  <span className="text-[#52525B]">
                    Ni menos de 3, ni más de 5 días.
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded border border-neutral-200 text-xs sm:text-sm">
                  <strong className="text-[#231F20] block">
                    2. Frasco estéril
                  </strong>
                  <span className="text-[#52525B]">
                    Recolectar el total de la muestra.
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded border border-neutral-200 text-xs sm:text-sm">
                  <strong className="text-[#231F20] block">
                    3. Entrega &lt; 45 min
                  </strong>
                  <span className="text-[#52525B]">
                    Mantener a temperatura corporal.
                  </span>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 bg-white rounded-md border border-neutral-200 p-5 space-y-3">
              <div className="text-sm font-bold text-[#231F20]">
                Reservá tu horario de entrega
              </div>
              <div className="flex items-center gap-2 text-xs text-[#52525B]">
                <Clock className="w-4 h-4 shrink-0 text-[#E04323]" />
                <span>Lunes a Viernes · Mariano Boedo 23</span>
              </div>
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2 pt-1">
                <a
                  href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20fecha%20para%20un%20espermograma."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded bg-[#E04323] hover:bg-[#C43417] text-white font-semibold text-sm text-center transition-colors"
                >
                  Coordinar por WhatsApp
                </a>
                <a
                  href="tel:03874215440"
                  className="flex-1 py-2.5 xl:py-2 px-4 rounded bg-[#F7F6F4] hover:bg-neutral-200 text-[#231F20] font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[#E04323]" />
                  <span>Llamar al (0387) 421-5440</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
