import React, { useState, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { toast } from 'sonner';
import Accordion from './Accordion';
import {
  Clock,
  FileText,
  Home,
  Search,
  Copy,
  Share2,
  Phone,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

const INSURANCE_LIST = [
  "A.C.A. Salud",
  "A.M.E.B.P.B.A",
  "AGUA Y ENERGÍA",
  "AMFFA (MUTUAL FARM.)",
  "AMSTERDAM SALUD",
  "APSOT Y FSST",
  "ATSA",
  "BOREAL / COB SALUD",
  "BRAMED / PATRONATO CABOTAJE",
  "CIENCIAS ECONOMICAS",
  "CRUZ BLANCA",
  "D.O.C.T.H.O.S.",
  "DIBPFA (FUERZA AEREA)",
  "DIREC. PERS. SANIDAD – LUIS PASTEUR",
  "ESCRIBANOS",
  "FUTBOLISTAS",
  "GALENO ARGENTINA (Oro, Plata, Azul)",
  "GALENO CONSULTING GROUP",
  "GAPRESA",
  "GÜEMES SALUD SRL (OSFATUN – OSPAGA – OSCEARA – OSSEG – GÜEMES PREPAGO)",
  "IPS (Instituto de Salta)",
  "JERARQUICOS SALUD",
  "LUZ Y FUERZA",
  "MEDICINA & SALUD (OSPEC-OSPAV-OSBA-LADRILLEROS-OSTEL)",
  "MEDIFE",
  "MEDICUS",
  "NORDICA SALUD",
  "O.S.P.E.R.Y.H.R.A.",
  "OMINT",
  "OSALARA – SYGMA",
  "O.S.D.E.",
  "OSDEPYM",
  "OSDIPP",
  "OSECAC – SIMESI",
  "OSMATA",
  "OSPATCA",
  "OSPE",
  "OSPEDYC",
  "OSPEGAP",
  "OSPIDA",
  "OSPIF",
  "OSPIL",
  "OSPLAD",
  "OSPRERA",
  "OSSEG",
  "PANADEROS",
  "PODER JUDICIAL",
  "POLICIA FEDERAL",
  "PREVENCION SALUD",
  "PREVENT SALUD (OSPIT-OSFE-OSETRA)",
  "PROPAGANDA MEDICA",
  "SADAIC",
  "SAN PEDRO",
  "SANCOR SALUD",
  "SERVICIO PENITENCIARIO",
  "SWISS MEDICAL",
  "TRABAJADORES VIALES",
  "U.N.Sa",
  "UNION PERSONAL",
  "UTA"
];

const PREPARATION_GUIDES = [
  {
    id: 'sangre',
    tabLabel: 'Análisis de Sangre',
    title: 'Sangre (Ayuno y Pruebas Especiales)',
    summaryBadge: 'Ayuno de 8 a 12 horas',
    whatsappText:
      'Laboratorio Saresa — Indicaciones para Análisis de Sangre:\n• Rutina estándar: Ayuno estricto de 8 hs mínimo.\n• Colesterol / Triglicéridos: Ayuno de 12 hs mínimo.\n• Prolactina: Despertarse 2 hs antes de la extracción y reposo.\n• Pruebas Funcionales (Glucosa, TRH, LHRH): Lun a Vie de 7:30 a 9:30 hs.',
    sections: [
      {
        heading: 'Análisis de sangre estándar',
        detail:
          'Ayuno estricto de 8 horas como mínimo. Evite ingerir agua en exceso, fumar o realizar ejercicio físico antes del estudio.',
      },
      {
        heading: 'Colesterol, Triglicéridos o Perfil Lipídico',
        detail:
          'Ayunar 12 horas como mínimo. La noche anterior evite comidas ricas en grasas y el consumo de alcohol.',
      },
      {
        heading: 'Dosaje de Prolactina',
        detail:
          'Despertarse 2 horas antes de la extracción. Permanezca en reposo relativo y evite relaciones sexuales o ejercicio las 24 hs previas.',
      },
      {
        heading: 'Pruebas Funcionales (Glucosa, TRH, LHRH)',
        detail:
          'Concurrir de lunes a viernes de 7:30 a 9:30 hs. Requerirá permanecer en el laboratorio entre 1 y 2 horas y media.',
      },
    ],
  },
  {
    id: 'orina',
    tabLabel: 'Orina Completa y 24 hs',
    title: 'Orina (Completa, 24 horas y Urocultivo)',
    summaryBadge: 'Primera orina / 24 hs',
    whatsappText:
      'Laboratorio Saresa — Indicaciones para Orina:\n• Orina Completa: Primera orina de la mañana, chorro medio en frasco limpio.\n• Orina 24 hs: 8:00 hs descartar primera orina y recolectar todas las siguientes hasta las 8:00 hs del día siguiente inclusive. Refrigerar.\n• Urocultivo: Higiene con agua y jabón neutro nuevo, chorro medio en frasco estéril.',
    sections: [
      {
        heading: 'Orina Completa',
        detail:
          'Recolectar la primera orina de la mañana. Descarte el primer chorro en el inodoro y recolecte el chorro medio en un frasco limpio.',
      },
      {
        heading: 'Orina de 24 Horas',
        detail:
          'A las 8:00 hs descarte la primera orina. Recolecte todas las micciones durante las siguientes 24 hs incluyendo la de las 8:00 hs del día siguiente. Mantenga refrigerado.',
      },
      {
        heading: 'Dietas Especiales (Catecolaminas, Vanilmandélico)',
        detail:
          '3 días previos sin té, café, mate, chocolates, bananas, cítricos, vainilla ni tomates. Recolectar en frasco con conservante del laboratorio.',
      },
      {
        heading: 'Urocultivo (Muestra Estéril)',
        detail:
          'Higienizar con agua y jabón neutro nuevo. Recolectar chorro medio en frasco estéril de farmacia y entregar dentro de las 2 horas (o refrigerar).',
      },
    ],
  },
  {
    id: 'espermograma',
    tabLabel: 'Espermograma',
    title: 'Semen (Espermograma Completo)',
    summaryBadge: 'Abstinencia de 3 a 5 días',
    whatsappText:
      'Laboratorio Saresa — Espermograma Completo:\n• Abstinencia sexual estricta de 3 a 5 días.\n• Obtener por masturbación en frasco estéril recolectando el total de la muestra.\n• Entregar dentro de los 45 minutos a temperatura corporal. Coordinar fecha previamente.',
    sections: [
      {
        heading: 'Abstinencia de 3 a 5 días',
        detail:
          'Abstinencia sexual estricta no menor a 3 días ni mayor a 5 días. Obtener por masturbación en frasco estéril recolectando el total del eyaculado.',
      },
      {
        heading: 'Entrega dentro de los 45 minutos',
        detail:
          'Rotular con nombre, hora y días de abstinencia. Entregar dentro de los 45 minutos manteniendo a temperatura corporal. Coordinar fecha previamente.',
      },
    ],
  },
  {
    id: 'materia-fecal',
    tabLabel: 'Materia Fecal',
    title: 'Materia Fecal y Coprocultivo',
    summaryBadge: 'Muestra fresca o seriada',
    whatsappText:
      'Laboratorio Saresa — Materia Fecal y Coprocultivo:\n• Parasitológico: Pequeña muestra en el envase correspondiente (o muestras diarias en seriados).\n• Coprocultivo: Muestra fresca en recipiente estéril. Entregar de inmediato.',
    sections: [
      {
        heading: 'Parasitológico de Materia Fecal',
        detail:
          'Recolectar una pequeña muestra en el envase correspondiente. En estudios seriados, recolectar muestras diarias según indicación.',
      },
      {
        heading: 'Coprocultivo',
        detail:
          'Colocar una porción de materia fecal fresca en recipiente estéril. Entregar de inmediato en recepción.',
      },
    ],
  },
  {
    id: 'psa',
    tabLabel: 'PSA (Próstata)',
    title: 'PSA / PSA Libre',
    summaryBadge: 'Reposo previo de 72 horas',
    whatsappText:
      'Laboratorio Saresa — PSA / PSA Libre:\n• 72 hs previas sin relaciones sexuales, tacto rectal, ecografía transrectal, ciclismo ni equitación.\n• En caso de biopsia de próstata, aguardar 6 semanas.',
    sections: [
      {
        heading: 'Cuidados 72 horas antes',
        detail:
          'No realizar relaciones sexuales, tacto rectal, ecografía transrectal ni ciclismo o equitación las 72 hs previas. Post-biopsia: aguardar 6 semanas.',
      },
    ],
  },
];

export default function PacientesTab({ onNavigate }) {
  const [activePrepTab, setActivePrepTab] = useState('sangre');
  const [insuranceSearch, setInsuranceSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('TODAS');
  const [activeFaq, setActiveFaq] = useState(null);

  const cleanString = (str) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const alphabet = useMemo(() => {
    const letters = new Set();
    INSURANCE_LIST.forEach((name) => {
      const firstChar = name.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return ['TODAS', ...Array.from(letters).sort()];
  }, []);

  const filteredInsurances = useMemo(() => {
    return INSURANCE_LIST.filter((name) => {
      const matchesSearch = cleanString(name).includes(
        cleanString(insuranceSearch)
      );
      const firstChar = name.trim().charAt(0).toUpperCase();
      const matchesLetter =
        selectedLetter === 'TODAS' || firstChar === selectedLetter;
      return matchesSearch && matchesLetter;
    });
  }, [insuranceSearch, selectedLetter]);

  const faqs = [
    {
      q: '¿Necesito sacar turno previo para análisis de sangre o rutina?',
      a: 'No. Atendemos por orden de llegada de lunes a viernes de 7:30 a 11:30 hs y sábados de 9:00 a 11:30 hs, con una espera menor a 10 minutos.',
    },
    {
      q: '¿Cómo pido una extracción a domicilio?',
      a: 'Escribinos por WhatsApp o llamá al (0387) 421-5440 enviando foto de la orden médica y datos del paciente para coordinar el horario de visita.',
    },
    {
      q: '¿Qué validez tiene la orden médica?',
      a: 'Tiene 30 días de validez desde su fecha de emisión y debe contar con nombre del paciente, obra social, diagnóstico, firma y sello médico.',
    },
    {
      q: '¿Cómo retiro mis resultados?',
      a: 'Podés solicitarlos en PDF por WhatsApp o email, o retirarlos en recepción en horario corrido de lunes a viernes hasta las 19:30 hs.',
    },
  ];

  const handleCopy = (guide) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(guide.whatsappText);
    }
    toast.success('Indicaciones copiadas al portapapeles');
  };

  const handleWhatsAppShare = (guide) => {
    const encoded = encodeURIComponent(guide.whatsappText);
    window.open(
      `https://wa.me/?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="bg-white text-[#231F20] pb-16"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* 1. Compact Header + 3 Key Highlights (Sin Turno, Requisitos, Domicilio) */}
      <div className="bg-[#F7F6F4] border-b border-neutral-200 py-6 sm:py-10">
        <div className="container">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#52525B] mb-2.5 sm:mb-3">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="hover:text-[#E04323] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span>/</span>
            <span className="text-[#231F20] font-medium">Pacientes</span>
          </nav>

          <h1 className="text-2xl min-[390px]:text-3xl sm:text-4xl font-bold text-[#231F20] mb-5 sm:mb-6">
            Atención a Pacientes e Indicaciones
          </h1>

          {/* 3 Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Card 1: Sin Turno */}
            <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-2">
                <Clock className="w-5 h-5 shrink-0 text-[#E04323]" />
                <h2 className="text-base font-bold text-[#231F20]">
                  Atención sin turno previo
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                <strong>Extracciones:</strong> Lun a Vie 7:30 a 11:30 hs · Sáb
                9:00 a 11:30 hs (espera &lt; 10 min).
                <br />
                <strong>Horario corrido:</strong> hasta las 19:30 hs para
                muestras e informes.
              </p>
            </div>

            {/* Card 2: 3 Requisitos Simples */}
            <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-2">
                <FileText className="w-5 h-5 shrink-0 text-[#E04323]" />
                <h2 className="text-base font-bold text-[#231F20]">
                  ¿Qué traer al laboratorio?
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                <strong>1. DNI</strong> · <strong>2. Orden médica</strong> (30
                días de validez) · <strong>3. Carnet de Obra Social</strong>.
                <br />
                <span className="text-xs text-[#7E1418]">
                  Si tu orden tiene algún error formal, podés dejar una seña
                  reintegrable para no perder el día.
                </span>
              </p>
            </div>

            {/* Card 3: Extracción a Domicilio */}
            <div className="md:col-span-2 lg:col-span-1 bg-[#7E1418] text-white rounded-md p-4 sm:p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Home className="w-5 h-5 shrink-0 text-[#F39C12]" />
                  <h2 className="text-base font-bold text-white">
                    Extracciones a domicilio
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-white/90">
                  Vamos a tu casa en Salta. Coordiná enviando foto de tu orden
                  médica.
                </p>
              </div>
              <div className="pt-3.5 flex flex-wrap items-center gap-2">
                <a
                  href="https://wa.me/5493872129924?text=Hola%20Laboratorio%20Saresa,%20quisiera%20coordinar%20una%20extracci%C3%B3n%20a%20domicilio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 justify-center items-center gap-1.5 min-h-[40px] px-3 sm:px-3.5 py-2 rounded bg-white text-[#231F20] font-semibold text-xs hover:bg-[#F7F6F4] active:scale-[0.99] transition-all whitespace-nowrap"
                >
                  <span>Pedir por WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#E04323]" />
                </a>
                <a
                  href="tel:03874215440"
                  className="inline-flex flex-1 justify-center items-center gap-1.5 min-h-[40px] px-3 py-2 rounded bg-white/15 text-white text-xs font-medium hover:bg-white/25 active:scale-[0.99] transition-all whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>421-5440</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-8 sm:pt-12 space-y-12 sm:space-y-14">
        {/* 2. Single Clean Preparation Selector (No Duplicate Accordion) */}
        <section>
          <div className="mb-4 sm:mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E04323] block mb-1">
              Preparación para Estudios
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20]">
              Indicaciones previas según tu estudio
            </h2>
          </div>

          <Tabs.Root value={activePrepTab} onValueChange={setActivePrepTab}>
            <Tabs.List
              aria-label="Seleccionar estudio"
              className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-neutral-200 pb-3 mb-5"
            >
              {PREPARATION_GUIDES.map((guide) => {
                const isSelected = activePrepTab === guide.id;
                return (
                  <Tabs.Trigger
                    key={guide.id}
                    value={guide.id}
                    className={`shrink-0 whitespace-nowrap min-h-[40px] px-4 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E04323] text-white shadow-2xs'
                        : 'bg-[#F7F6F4] text-[#52525B] hover:text-[#231F20] border border-neutral-200'
                    }`}
                  >
                    {guide.tabLabel}
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>

            {PREPARATION_GUIDES.map((guide) => (
              <Tabs.Content
                key={guide.id}
                value={guide.id}
                className="focus:outline-none"
              >
                <div className="rounded-md border border-neutral-200 bg-[#F7F6F4] p-4 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 mb-5 border-b border-neutral-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[#231F20]">
                        {guide.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded bg-white border border-neutral-200 text-xs font-semibold text-[#7E1418]">
                        {guide.summaryBadge}
                      </span>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(guide)}
                        className="inline-flex flex-1 sm:flex-initial justify-center items-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded bg-white hover:bg-neutral-100 active:scale-[0.99] text-[#231F20] border border-neutral-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 shrink-0 text-[#E04323]" />
                        <span>Copiar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppShare(guide)}
                        className="inline-flex flex-1 sm:flex-initial justify-center items-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded bg-[#E04323] hover:bg-[#C43417] active:scale-[0.99] text-white text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Enviar por WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                    {guide.sections.map((sec) => (
                      <div
                        key={sec.heading}
                        className="bg-white rounded-md border border-neutral-200 p-4 sm:p-5"
                      >
                        <h4 className="font-bold text-sm sm:text-base text-[#231F20] mb-1">
                          {sec.heading}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                          {sec.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </section>

        {/* 3. Coberturas Médicas y Obras Sociales (59 Obras Sociales Reales) */}
        <section className="pt-8 sm:pt-10 border-t border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E04323] block mb-1">
                Convenios Activos
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20]">
                59 Obras Sociales y Prepagas
              </h2>
            </div>

            <div className="w-full lg:w-96 relative">
              <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={insuranceSearch}
                onChange={(e) => {
                  setInsuranceSearch(e.target.value);
                  setSelectedLetter('TODAS');
                }}
                placeholder="Buscar tu obra social (ej: OSDE, IPS, Medifé)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-md border border-neutral-300 focus:border-[#E04323] focus:outline-none text-base sm:text-sm text-[#231F20] bg-white"
              />
              {insuranceSearch && (
                <button
                  type="button"
                  onClick={() => setInsuranceSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#231F20] cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Alphabetical Filter A-Z */}
          <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar items-center gap-1.5 mb-5 p-2 rounded-md bg-[#F7F6F4] border border-neutral-200">
            {alphabet.map((letter) => {
              const active = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(letter);
                    setInsuranceSearch('');
                  }}
                  className={`shrink-0 min-w-[36px] h-9 sm:min-w-[32px] sm:h-7 px-2.5 inline-flex items-center justify-center rounded text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#E04323] text-white'
                      : 'bg-white text-[#52525B] hover:text-[#231F20] border border-neutral-200'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {filteredInsurances.map((name) => (
              <div
                key={name}
                className="px-4 py-3 rounded-md bg-white border border-neutral-200 hover:border-[#E04323]/50 transition-colors flex items-center justify-between gap-2.5 shadow-2xs min-w-0"
              >
                <span className="min-w-0 break-words text-xs sm:text-sm font-medium text-[#231F20] leading-snug">
                  {name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#E04323] flex-shrink-0" />
              </div>
            ))}

            {filteredInsurances.length === 0 && (
              <div className="col-span-full py-8 text-center rounded-md bg-[#F7F6F4] border border-neutral-200 text-sm text-[#52525B]">
                No se encontraron obras sociales coincidentes con la búsqueda.
              </div>
            )}
          </div>
        </section>

        {/* 4. Compact FAQs */}
        <section className="pt-10 border-t border-neutral-200 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#231F20] mb-4">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-2.5">
            {faqs.map((faq, index) => (
              <Accordion
                key={faq.q}
                title={faq.q}
                isOpen={activeFaq === index}
                onToggle={() =>
                  setActiveFaq(activeFaq === index ? null : index)
                }
              >
                <p>{faq.a}</p>
              </Accordion>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
