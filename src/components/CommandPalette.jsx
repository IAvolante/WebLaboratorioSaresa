import React, { useState, useEffect, useMemo } from 'react';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Search,
  X,
  ChevronRight,
  FlaskConical,
  FileText,
  Phone,
  HeartHandshake,
} from 'lucide-react';
import { ANALYSES_DATA } from '../data/analysesData';

export default function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
}) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const indexedStudies = useMemo(() => {
    return ANALYSES_DATA.map((name) => ({
      name,
      normalized: name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
    }));
  }, []);

  const matchedStudies = useMemo(() => {
    const q = search
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (!q) {
      return indexedStudies.slice(0, 10);
    }

    return indexedStudies
      .filter((item) => item.normalized.includes(q))
      .slice(0, 12);
  }, [search, indexedStudies]);

  const handleSelectStudy = (studyName) => {
    onOpenChange(false);
    if (onNavigate) {
      onNavigate('profesionales');
    }
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('saresa:select-study', { detail: studyName })
      );
    }, 80);
  };

  const handleNavigateSection = (tabId) => {
    onOpenChange(false);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  const quickSections = [
    {
      id: 'prep-sangre',
      label: 'Indicaciones de ayuno y preparación para análisis de sangre',
      tab: 'pacientes',
    },
    {
      id: 'orina-24h',
      label: 'Instrucciones para recolección de orina de 24 horas y urocultivo',
      tab: 'pacientes',
    },
    {
      id: 'reproduccion',
      label: 'Laboratorio de Embriología, Fertilidad y Espermograma',
      tab: 'reproduccion',
    },
    {
      id: 'obras-sociales',
      label: 'Consulta de Obras Sociales y Prepagas con cobertura',
      tab: 'pacientes',
    },
    {
      id: 'extraccion-domicilio',
      label: 'Solicitud de extracción de sangre a domicilio en Salta',
      tab: 'pacientes',
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] transition-opacity" />
        <Dialog.Content
          aria-label="Buscador de Estudios e Indicaciones"
          className="fixed top-3 sm:top-[10vh] left-1/2 z-50 w-[94vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-md border border-neutral-200 bg-white text-[#231F20] shadow-xl focus:outline-none"
        >
          <Dialog.Title className="sr-only">
            Buscador de Estudios e Indicaciones — Laboratorio Saresa
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Busque análisis clínicos, estudios de fertilidad, preparación para muestras y coberturas médicas.
          </Dialog.Description>

          {/* Encabezado limpio */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-[#F7F6F4] px-4 sm:px-5 py-2.5 sm:py-3">
            <span className="text-xs sm:text-sm font-semibold text-[#231F20] truncate pr-2">
              Buscador de estudios clínicos e indicaciones
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Cerrar buscador"
              className="inline-flex h-8 w-8 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200/70 hover:text-[#231F20]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Command shouldFilter={false} className="flex flex-col bg-white">
            {/* Campo de búsqueda */}
            <div className="flex items-center border-b border-neutral-200 px-3.5 sm:px-4 py-3 sm:py-3.5">
              <Search className="mr-2.5 sm:mr-3 h-5 w-5 shrink-0 text-[#E04323]" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Buscar estudio o cobertura (ej: Glucemia, TSH, OSDE)..."
                className="w-full min-w-0 bg-transparent text-base sm:text-[15px] text-[#231F20] placeholder:text-neutral-400 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="ml-2 shrink-0 rounded bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-200"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Lista de resultados */}
            <Command.List className="max-h-[52dvh] sm:max-h-[60vh] overflow-y-auto overscroll-contain p-1.5 sm:p-2">
              <Command.Empty className="py-8 sm:py-10 px-4 text-center text-sm text-neutral-500">
                No se encontraron estudios con &ldquo;{search}&rdquo;. Puede
                consultar directamente por WhatsApp o teléfono.
              </Command.Empty>

              {/* Estudios Clínicos */}
              <Command.Group
                heading={
                  <div className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-neutral-500">
                    Estudios y determinaciones bioquímicas
                  </div>
                }
              >
                {matchedStudies.map((study) => (
                  <Command.Item
                    key={study.name}
                    value={study.name}
                    onSelect={() => handleSelectStudy(study.name)}
                    className="group flex cursor-pointer items-center justify-between rounded px-2.5 sm:px-3 py-2.5 text-sm text-[#231F20] transition-colors data-[selected=true]:bg-[#FDF2EF] data-[selected=true]:text-[#E04323] hover:bg-neutral-50"
                  >
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 pr-2 sm:pr-3">
                      <FlaskConical className="h-4 w-4 shrink-0 text-[#E04323]" />
                      <span className="font-medium leading-snug">{study.name}</span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-neutral-500 group-data-[selected=true]:text-[#E04323]">
                      <span className="hidden sm:inline">Ver estudio</span>
                      <ChevronRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Accesos Rápidos para Pacientes */}
              <Command.Group
                heading={
                  <div className="mt-2 border-t border-neutral-100 px-2.5 sm:px-3 pt-3 pb-2 text-xs font-semibold text-neutral-500">
                    Indicaciones para pacientes y servicios frecuentes
                  </div>
                }
              >
                {quickSections.map((sec) => (
                  <Command.Item
                    key={sec.id}
                    value={sec.label}
                    onSelect={() => handleNavigateSection(sec.tab)}
                    className="group flex cursor-pointer items-center justify-between rounded px-2.5 sm:px-3 py-2.5 text-sm text-[#231F20] transition-colors data-[selected=true]:bg-[#FDF2EF] data-[selected=true]:text-[#E04323] hover:bg-neutral-50"
                  >
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 pr-2">
                      {sec.tab === 'reproduccion' ? (
                        <HeartHandshake className="h-4 w-4 shrink-0 text-[#7E1418]" />
                      ) : (
                        <FileText className="h-4 w-4 shrink-0 text-[#F39C12]" />
                      )}
                      <span className="leading-snug">{sec.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 group-data-[selected=true]:text-[#E04323]" />
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Contacto Telefónico */}
              <Command.Group
                heading={
                  <div className="mt-2 border-t border-neutral-100 px-2.5 sm:px-3 pt-3 pb-2 text-xs font-semibold text-neutral-500">
                    Atención personalizada
                  </div>
                }
              >
                <Command.Item
                  value="Llamar por teléfono a recepción 0387 421 5440"
                  onSelect={() => {
                    onOpenChange(false);
                    window.location.href = 'tel:03874215440';
                  }}
                  className="group flex cursor-pointer items-center justify-between rounded px-2.5 sm:px-3 py-2.5 text-sm text-[#231F20] transition-colors data-[selected=true]:bg-[#FDF2EF] data-[selected=true]:text-[#E04323] hover:bg-neutral-50"
                >
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 pr-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#E04323]" />
                    <span className="leading-snug">
                      Comunicarse con Secretaría: <strong>(0387) 421-5440</strong>
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" />
                </Command.Item>
              </Command.Group>
            </Command.List>

            {/* Pie del buscador */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-neutral-200 bg-[#F7F6F4] px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs text-neutral-500">
              <span>+300 análisis clínicos y especializados</span>
              <span className="hidden min-[420px]:inline">Mariano Boedo 23, Salta Capital</span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
