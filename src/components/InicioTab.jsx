import React from 'react';
import Hero from './Hero';
import {
  Microscope,
  Droplet,
  Baby,
  ShieldAlert,
  Dna,
  Heart,
  Award,
  CheckCircle2,
  ArrowRight,
  Home,
  Phone,
} from 'lucide-react';
import andrologiaImg from '../assets/andrologia-samer.jpg';

const COMPACT_SPECIALTIES = [
  {
    title: 'Análisis de Rutina',
    desc: 'Hemograma, glucemia, colesterol, hepatograma y controles preventivos en el día.',
    icon: Microscope,
    target: 'pacientes',
  },
  {
    title: 'Hormonales y Tiroides',
    desc: 'TSH, T4 libre, prolactina, cortisol y perfiles endocrinológicos automatizados.',
    icon: Droplet,
    target: 'profesionales',
  },
  {
    title: 'Pediatría y Pesquisa Neonatal',
    desc: 'Extracción especializada para recién nacidos y niños sin turno previo.',
    icon: Baby,
    target: 'pacientes',
  },
  {
    title: 'Embriología y Preconcepcionales',
    desc: 'Capacitación espermática, espermograma SAMER y reserva ovárica (AMH).',
    icon: Heart,
    target: 'reproduccion',
  },
  {
    title: 'Bacteriología y Cultivos',
    desc: 'Urocultivos, coprocultivos, exudados y antibiogramas de alta precisión.',
    icon: ShieldAlert,
    target: 'pacientes',
  },
  {
    title: 'PCR y Biología Molecular',
    desc: 'Estudios genéticos, cariotipos, trombofilias, HPV y filiación por ADN.',
    icon: Dna,
    target: 'profesionales',
  },
];

const FEATURED_INSURANCES = [
  'IPS Salta',
  'OSDE',
  'Swiss Medical',
  'Galeno',
  'Medifé',
  'Sancor Salud',
  'Boreal',
  'UNSa',
];

export default function InicioTab({ onNavigate }) {
  return (
    <div
      className="bg-white text-[#231F20]"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* 1. Hero + 4 Key Pillars */}
      <Hero onNavigate={onNavigate} />

      {/* 2. Section 1: Extracciones a Domicilio en Salta */}
      <section className="py-10 md:py-16 bg-white border-b border-neutral-200">
        <div className="container">
          <div className="rounded-md bg-[#F7F6F4] border border-neutral-200 p-5 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 mb-6 sm:mb-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E04323]/10 text-[#E04323] text-xs font-semibold mb-3">
                  <Home className="w-3.5 h-3.5 shrink-0" />
                  <span>Servicio de Extracción Domiciliaria en Salta</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20]">
                  ¿No podés acercarte? Vamos a tu domicilio
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] mt-2">
                  Realizamos extracciones en la comodidad de tu hogar para
                  adultos mayores, niños, embarazadas o pacientes con agenda
                  ajustada.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                <a
                  href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20una%20extracci%C3%B3n%20a%20domicilio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 rounded bg-[#E04323] hover:bg-[#C43417] active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <span>Coordinar extracción a domicilio</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <a
                  href="tel:03874215440"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-3 rounded bg-white hover:bg-neutral-100 active:scale-[0.99] text-[#231F20] border border-neutral-300 font-semibold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#E04323]" />
                  <span>Llamar al (0387) 421-5440</span>
                </a>
              </div>
            </div>

            {/* 3 Simple Visual Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded bg-[#E04323] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#231F20]">
                    1. Envianos tu orden
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] mt-1">
                    Mandá una foto de la orden médica y carnet por WhatsApp.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded bg-[#E04323] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#231F20]">
                    2. Coordinamos la visita
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] mt-1">
                    Elegimos el horario de mañana que mejor te quede.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded bg-[#E04323] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#231F20]">
                    3. Resultados digitales
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] mt-1">
                    Recibís tu informe en PDF por WhatsApp o email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 2: Laboratorio de Embriología y Reproducción Asistida */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-center">
            {/* Left Video Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-md overflow-hidden border border-neutral-200 shadow-sm bg-[#F7F6F4]">
                <video
                  src="/banners/reproduccion-saresa.mp4"
                  poster={andrologiaImg}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-[220px] sm:h-[350px] object-cover"
                />
                <div className="bg-white/95 backdrop-blur-xs border-t border-neutral-200 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#7E1418]">
                    Centro Acreditado SAMER
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#7E1418]/10 text-[#7E1418] text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                    Embriología y Fertilidad
                  </span>
                </div>
              </div>
            </div>

            {/* Right Short & Direct Content Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#7E1418]/10 text-[#7E1418] text-xs font-semibold">
                <span>Especialidad Insignia en Salta y el NOA</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20] leading-tight">
                Embriología, Andrología y Fertilidad
              </h2>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Contamos con laboratorio de embriología y andrología clínica
                acreditado por la Sociedad Argentina de Medicina Reproductiva
                (SAMER). Acompañamos tratamientos de fertilidad y estudios
                diagnósticos de la pareja con tecnología de alta precisión.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div className="p-3 sm:p-3.5 rounded bg-[#F7F6F4] border border-neutral-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7E1418] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#231F20]">
                    Laboratorio de Embriología
                  </span>
                </div>
                <div className="p-3 sm:p-3.5 rounded bg-[#F7F6F4] border border-neutral-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7E1418] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#231F20]">
                    Capacitación Espermática (IIU / FIV)
                  </span>
                </div>
                <div className="p-3 sm:p-3.5 rounded bg-[#F7F6F4] border border-neutral-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7E1418] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#231F20]">
                    Espermograma Kruger · SAMER
                  </span>
                </div>
                <div className="p-3 sm:p-3.5 rounded bg-[#F7F6F4] border border-neutral-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7E1418] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#231F20]">
                    Reserva Ovárica (AMH) y Genética
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('reproduccion')}
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded bg-[#7E1418] hover:bg-[#630F12] active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <span>Ver área de Embriología y Fertilidad</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: +300 Análisis Clínicos y 59 Obras Sociales */}
      <section className="py-10 md:py-16 bg-[#F7F6F4] border-t border-neutral-200">
        <div className="container space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E04323] block mb-1">
                Alta Complejidad y Rutina
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20]">
                Más de 300 análisis clínicos sin turno previo
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('profesionales')}
              className="text-sm font-semibold text-[#E04323] hover:underline cursor-pointer self-start sm:self-end"
            >
              Explorar catálogo de +300 análisis →
            </button>
          </div>

          {/* 6 Compact Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {COMPACT_SPECIALTIES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => onNavigate(item.target)}
                  className="bg-white border border-neutral-200 rounded-md p-4 sm:p-5 hover:border-[#E04323]/60 active:bg-neutral-50 transition-all cursor-pointer group flex items-start gap-3.5 sm:gap-4"
                >
                  <div className="w-10 h-10 rounded bg-[#F7F6F4] border border-neutral-200 text-[#E04323] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E04323] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#231F20] group-hover:text-[#E04323] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Strip: 59 Obras Sociales + SAMER & PEEC-FBA Badges */}
          <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2.5">
              <div className="text-sm font-bold text-[#231F20]">
                Trabajamos con 59 Obras Sociales y Prepagas
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {FEATURED_INSURANCES.map((os) => (
                  <span
                    key={os}
                    className="px-2.5 sm:px-3 py-1 rounded bg-[#F7F6F4] border border-neutral-200 text-xs font-medium text-[#231F20]"
                  >
                    {os}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => onNavigate('pacientes')}
                  className="px-3 py-1.5 sm:py-1 rounded bg-[#E04323]/10 text-[#E04323] hover:bg-[#E04323] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ver las 59 obras sociales →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
              <div className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded bg-[#F7F6F4] border border-neutral-200">
                <Award className="w-4 h-4 shrink-0 text-[#7E1418]" />
                <span className="text-xs font-semibold text-[#231F20]">
                  Acreditado SAMER
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded bg-[#F7F6F4] border border-neutral-200">
                <Award className="w-4 h-4 shrink-0 text-[#E04323]" />
                <span className="text-xs font-semibold text-[#231F20]">
                  Control Externo PEEC-FBA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
