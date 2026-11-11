import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { ANALYSES_DATA } from '../data/analysesData';
import {
  Search,
  Check,
  X,
  Copy,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  Truck
} from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ProfesionalesTab({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('TODAS');
  const [selectedLetter, setSelectedLetter] = useState('TODAS');
  const [visibleCount, setVisibleCount] = useState(50);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);
  const searchInputRef = useRef(null);

  const cleanString = (str) => {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Áreas clínicas institucionales (destacando Embriología y Fertilidad)
  const clinicalAreas = [
    { id: 'TODAS', label: 'Todas las áreas' },
    { id: 'EMBRIOLOGIA', label: 'Embriología y Fertilidad' },
    { id: 'HORMONAS', label: 'Hormonas y Endocrinología' },
    { id: 'GENETICA', label: 'Genética y Biología Molecular' },
    { id: 'INMUNOLOGIA', label: 'Inmunología y Serología' },
    { id: 'QUIMICA', label: 'Química Clínica y Orina' }
  ];

  // Sugerencias de búsqueda habituales en consultorio
  const commonSearches = [
    'Espermograma',
    'Anti-Mullerian',
    'Cariotipo',
    'TSH',
    'Prolactina',
    'PCR',
    'HLA',
    'Glucemia',
    'Urocultivo'
  ];

  // Equipamiento analítico real de Laboratorio Saresa (descripciones concisas)
  const equipments = [
    {
      brand: 'Roche Diagnostics',
      model: 'COBAS e411',
      specialty: 'Inmunoensayos y Fertilidad',
      desc: 'Electroquimioluminiscencia (ECLIA) para hormonas reproductivas, perfil tiroideo y marcadores oncológicos.'
    },
    {
      brand: 'Roche Diagnostics',
      model: 'COBAS b121',
      specialty: 'Gases en Sangre y Medio Interno',
      desc: 'Determinación crítica de gases en sangre, electrolitos, hematocrito y estado ácido-base.'
    },
    {
      brand: 'Wiener Lab',
      model: 'Metrolab CM250',
      specialty: 'Química Clínica Automatizada',
      desc: 'Autoanalizador de acceso aleatorio para perfiles metabólicos, hepatograma, lípidos y función renal.'
    },
    {
      brand: 'Mindray',
      model: 'Mindray BS-200E',
      specialty: 'Bioquímica y Enzimología',
      desc: 'Sistema fotométrico con refrigeración continua para bioquímica clínica y proteínas específicas.'
    },
    {
      brand: 'Diestro',
      model: 'Analizador de Electrolitos ISE',
      specialty: 'Ionograma Sérico y Urinario',
      desc: 'Electrodo de ion selectivo directo para sodio, potasio, cloro, calcio iónico y litio.'
    },
    {
      brand: 'Wiener Lab',
      model: 'Counter 19',
      specialty: 'Hematología Clínica',
      desc: 'Contador hematológico automatizado para hemograma completo con fórmula diferencial y plaquetas.'
    },
    {
      brand: 'Dayto',
      model: 'Lector de Placas ELISA',
      specialty: 'Serología e Inmunología',
      desc: 'Fotometría multicanal para serología infecciosa, autoinmunidad y determinaciones inmunoenzimáticas.'
    },
    {
      brand: 'Olympus',
      model: 'Microscopio Óptico y Fluorescencia',
      specialty: 'Embriología, Andrología y Microbiología',
      desc: 'Óptica de alta resolución e inmunofluorescencia para fertilidad seminal, citología y bacteriología.'
    }
  ];

  // Clasificación clínica de las determinaciones de ANALYSES_DATA
  const catalogItems = useMemo(() => {
    return ANALYSES_DATA.map((name) => {
      const upper = name.toUpperCase();
      const normalized = cleanString(name).toUpperCase();
      const firstChar = normalized.charAt(0);

      let areaId = 'QUIMICA';
      let areaLabel = 'Química Clínica y Rutina';
      let sampleSummary = 'Suero / Sangre venosa';
      let methodSummary = 'Espectrofotometría / Enzimático';

      if (
        upper.includes('ESPERMA') ||
        upper.includes('SEMEN') ||
        upper.includes('ESPERMOGRAMA') ||
        upper.includes('KRUGER') ||
        upper.includes('MULLER') ||
        upper.includes('AMH') ||
        upper.includes('FERTIL') ||
        upper.includes('OVAR') ||
        upper.includes('HCG') ||
        upper.includes('ESTRADIOL') ||
        upper.includes('FSH') ||
        upper.includes('LH') ||
        upper.includes('PROGESTERONA')
      ) {
        areaId = 'EMBRIOLOGIA';
        if (
          upper.includes('ESPERMA') ||
          upper.includes('SEMEN') ||
          upper.includes('ESPERMOGRAMA') ||
          upper.includes('KRUGER')
        ) {
          areaLabel = 'Embriología y Andrología';
          sampleSummary = 'Muestra seminal fresca';
          methodSummary = 'Criterios OMS / Kruger (SAMER)';
        } else {
          areaLabel = 'Embriología y Fertilidad';
          sampleSummary = 'Suero';
          methodSummary = 'Electroquimioluminiscencia (ECLIA)';
        }
      } else if (
        upper.includes('GENES') ||
        upper.includes('PCR') ||
        upper.includes('MLPA') ||
        upper.includes('BIOLOGÍA') ||
        upper.includes('CARIOTIPO') ||
        upper.includes('HLA') ||
        upper.includes('MUTACION') ||
        upper.includes('CROMOSOM') ||
        upper.includes('ADN')
      ) {
        areaId = 'GENETICA';
        areaLabel = 'Genética y Biología Molecular';
        sampleSummary = upper.includes('CARIOTIPO')
          ? 'Sangre con Heparina'
          : 'Sangre con EDTA / Hisopado';
        methodSummary = upper.includes('CARIOTIPO')
          ? 'Citogenética de alta resolución'
          : 'Biología Molecular (PCR / MLPA)';
      } else if (
        upper.includes('AC.') ||
        upper.includes('ANTI-') ||
        upper.includes('AC ') ||
        upper.includes('IGG') ||
        upper.includes('IGM') ||
        upper.includes('IGA')
      ) {
        areaId = 'INMUNOLOGIA';
        areaLabel = 'Inmunología y Serología';
        sampleSummary = 'Suero';
        methodSummary = 'ELISA / IFI / Quimioluminiscencia';
      } else if (
        upper.includes('PSA') ||
        upper.includes('TSH') ||
        upper.includes('T3') ||
        upper.includes('T4') ||
        upper.includes('PROLACTINA') ||
        upper.includes('INSULINA') ||
        upper.includes('TESTOSTERONA') ||
        upper.includes('CORTISOL') ||
        upper.includes('TIRO') ||
        upper.includes('HORMONA') ||
        upper.includes('ALDOSTERONA') ||
        upper.includes('DHEA')
      ) {
        areaId = 'HORMONAS';
        areaLabel = 'Hormonas y Endocrinología';
        sampleSummary = 'Suero';
        methodSummary = 'Electroquimioluminiscencia (ECLIA)';
      } else if (upper.includes('ORINA') || upper.includes('UROCULTIVO')) {
        areaId = 'QUIMICA';
        areaLabel = upper.includes('UROCULTIVO')
          ? 'Microbiología Clínica'
          : 'Química Clínica y Orina';
        sampleSummary =
          upper.includes('24 HS') || upper.includes('24 H')
            ? 'Orina de 24 hs'
            : 'Primera orina matinal';
        methodSummary = upper.includes('UROCULTIVO')
          ? 'Cultivo y antibiograma'
          : 'Físico-químico y sedimento';
      } else if (
        upper.includes('HEMOGRAMA') ||
        upper.includes('PLAQUETAS') ||
        upper.includes('RETICULOCITOS')
      ) {
        areaId = 'QUIMICA';
        areaLabel = 'Hematología Clínica';
        sampleSummary = 'Sangre entera con EDTA';
        methodSummary = 'Citometría automatizada';
      }

      return {
        name,
        cleanName: cleanString(name),
        firstLetter: /[A-Z]/.test(firstChar) ? firstChar : 'OTROS',
        areaId,
        areaLabel,
        sampleSummary,
        methodSummary
      };
    });
  }, []);

  // Construye la ficha clínica concisa al seleccionar un estudio
  const handleSelectStudy = useCallback((item) => {
    if (!item) return;
    const name = item.name;
    const upper = name.toUpperCase();

    let sample = 'Suero o plasma por venopunción (tubo con gel separador).';
    let preparation = 'Ayuno de 8 horas (agua permitida). Evitar actividad física intensa 12 hs antes.';
    let conservation = 'Suero refrigerado (2 a 8 °C) hasta 72 horas.';
    let methodology = 'Química clínica automatizada por espectrofotometría.';
    let turnaround = '24 a 48 horas hábiles.';

    if (
      upper.includes('GENES') ||
      upper.includes('MLPA') ||
      upper.includes('PCR') ||
      upper.includes('CARIOTIPO') ||
      upper.includes('HLA')
    ) {
      sample = upper.includes('CARIOTIPO')
        ? 'Sangre entera estéril con Heparina de Sodio (tubo tapón verde).'
        : 'Sangre entera con EDTA (tubo tapón lila) o hisopado específico.';
      preparation = 'Ayuno mínimo de 4 horas. Presentar pedido médico con diagnóstico presuntivo.';
      conservation = 'Refrigerado entre 4 y 8 °C. No congelar sangre entera.';
      methodology = upper.includes('CARIOTIPO')
        ? 'Cultivo linfocitario y citogenética con bandeo G.'
        : 'Biología Molecular (RT-PCR / MLPA / Tipificación molecular).';
      turnaround = '7 a 15 días hábiles.';
    } else if (upper.includes('AC.') || upper.includes('ANTI-') || upper.includes('AC ')) {
      sample = 'Suero libre de hemólisis (tubo seco con gel separador).';
      preparation = 'Ayuno de 8 horas.';
      conservation = 'Refrigerado (2 a 8 °C) por 5 días o congelado a -20 °C.';
      methodology = 'ELISA, Inmunofluorescencia Indirecta (IFI) o ECLIA.';
      turnaround = '3 a 5 días hábiles.';
    } else if (upper.includes('ORINA') || upper.includes('UROCULTIVO')) {
      sample =
        upper.includes('24 HS') || upper.includes('24 H')
          ? 'Orina completa de 24 horas en recipiente graduado.'
          : 'Primera orina de la mañana (chorro medio en envase estéril).';
      preparation =
        upper.includes('CATECOLAMINAS') || upper.includes('VANILMANDÉLICO')
          ? 'Dieta previa de 3 días sin café, té, mate, chocolate, banana, vainilla ni aspirina.'
          : 'Higiene previa con agua y jabón neutro. Descartar primer chorro y recolectar fracción media.';
      conservation = 'Remitir dentro de las 2 horas o conservar refrigerada (2 a 8 °C).';
      methodology = upper.includes('UROCULTIVO')
        ? 'Cultivo cuantitativo y antibiograma.'
        : 'Examen físico-químico y sedimento microscópico.';
      turnaround = upper.includes('UROCULTIVO') ? '48 a 72 horas hábiles.' : '24 horas hábiles.';
    } else if (
      upper.includes('ESPERMA') ||
      upper.includes('SEMEN') ||
      upper.includes('ESPERMOGRAMA')
    ) {
      sample = 'Muestra seminal completa en frasco estéril.';
      preparation = 'Abstinencia sexual de 3 a 5 días. Recolectar sin preservativos ni lubricantes.';
      conservation = 'Entregar dentro de los 40 minutos de obtenida, protegiendo de cambios térmicos.';
      methodology = 'Criterios OMS, morfología estricta de Kruger y vitalidad (normas SAMER).';
      turnaround = '48 horas hábiles.';
    } else if (upper.includes('PSA')) {
      sample = 'Suero por venopunción.';
      preparation =
        'Ayuno de 8 horas. Abstinencia sexual de 48 hs; evitar ciclismo, tacto o ecografía prostática 72 hs antes.';
      conservation = 'Separar suero dentro de las 3 horas y refrigerar (2 a 8 °C).';
      methodology = 'Electroquimioluminiscencia (ECLIA) en Roche COBAS e411.';
      turnaround = '24 horas hábiles.';
    } else if (upper.includes('PROLACTINA')) {
      sample = 'Suero matinal (extracción entre 7:00 y 9:00 hs).';
      preparation =
        'Ayuno de 8 horas, 2 horas despierto, abstinencia sexual de 48 hs y 20 minutos de reposo en sala.';
      conservation = 'Suero refrigerado (2 a 8 °C).';
      methodology = 'Electroquimioluminiscencia (ECLIA) en Roche COBAS e411.';
      turnaround = '24 horas hábiles.';
    } else if (
      upper.includes('TSH') ||
      upper.includes('T3') ||
      upper.includes('T4') ||
      upper.includes('MULLER') ||
      upper.includes('ESTRADIOL') ||
      upper.includes('FSH') ||
      upper.includes('LH') ||
      upper.includes('CORTISOL') ||
      upper.includes('INSULINA')
    ) {
      sample = 'Suero por venopunción.';
      preparation =
        'Ayuno de 8 horas. Si toma Levotiroxina, realizar la extracción antes de la dosis matinal.';
      conservation = 'Suero refrigerado (2 a 8 °C) hasta 5 días.';
      methodology = 'Electroquimioluminiscencia (ECLIA) en Roche COBAS e411.';
      turnaround = '24 a 48 horas hábiles.';
    }

    setCopied(false);
    setSelectedAnalysis({
      ...item,
      sample,
      preparation,
      conservation,
      methodology,
      turnaround
    });
  }, []);

  // Escucha el evento global cuando se selecciona un estudio desde Inicio o el buscador del Header
  useEffect(() => {
    const handleGlobalSelectStudy = (e) => {
      const detail = e?.detail;
      if (!detail) return;

      const queryName = typeof detail === 'string' ? detail : detail.name || detail.study || '';
      if (!queryName) return;

      const cleanedTarget = cleanString(queryName);
      setSearchQuery(queryName);
      setSelectedArea('TODAS');
      setSelectedLetter('TODAS');
      setVisibleCount(50);

      const matched =
        catalogItems.find((item) => item.cleanName === cleanedTarget) ||
        catalogItems.find((item) => item.cleanName.includes(cleanedTarget));

      if (matched) {
        handleSelectStudy(matched);
      }
    };

    window.addEventListener('saresa:select-study', handleGlobalSelectStudy);
    return () => {
      window.removeEventListener('saresa:select-study', handleGlobalSelectStudy);
    };
  }, [catalogItems, handleSelectStudy]);

  // Filtrado por texto, área clínica e índice alfabético A-Z
  const filteredAnalyses = useMemo(() => {
    const query = cleanString(searchQuery.trim());

    return catalogItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.cleanName.includes(query) ||
        (query === 'anti-mullerian' &&
          (item.cleanName.includes('muller') || item.cleanName.includes('amh'))) ||
        (query === 'glucemia' &&
          (item.cleanName.includes('gluc') || item.cleanName.includes('hba1c')));

      const matchesArea =
        selectedArea === 'TODAS' ||
        item.areaId === selectedArea ||
        (selectedArea === 'HORMONAS' && item.areaId === 'EMBRIOLOGIA');
      const matchesLetter = selectedLetter === 'TODAS' || item.firstLetter === selectedLetter;

      return matchesSearch && matchesArea && matchesLetter;
    });
  }, [catalogItems, searchQuery, selectedArea, selectedLetter]);

  // Copiar indicaciones para el paciente
  const handleCopyPatientInstructions = () => {
    if (!selectedAnalysis) return;
    const text = [
      `Laboratorio Saresa - Estudio: ${selectedAnalysis.name}`,
      `Muestra: ${selectedAnalysis.sample}`,
      `Preparación: ${selectedAnalysis.preparation}`,
      `Informe estimado: ${selectedAnalysis.turnaround}`,
      `Mariano Boedo 23, Salta - Tel: (0387) 421-5440 / WhatsApp: +54 9 387 212-9924`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Indicaciones copiadas al portapapeles');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const getWhatsAppUrl = (studyName) => {
    const text = `Hola Laboratorio Saresa, quisiera consultar por el estudio ${studyName} (indicaciones, derivación o cobertura).`;
    return `https://wa.me/5493872129924?text=${encodeURIComponent(text)}`;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArea('TODAS');
    setSelectedLetter('TODAS');
    setVisibleCount(50);
    searchInputRef.current?.focus();
  };

  return (
    <div className="saresa-portal-medicos">
      <style>{`
        .saresa-portal-medicos {
          font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background-color: #F7F6F4;
          color: #231F20;
          line-height: 1.5;
        }

        [data-theme="dark"] .saresa-portal-medicos {
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }

        /* Encabezado Institucional */
        .med-portal-header {
          background-color: #FFFFFF;
          border-bottom: 1px solid #E5E5E5;
          padding: 22px 0 24px;
        }

        @media (min-width: 640px) {
          .med-portal-header {
            padding: 28px 0 32px;
          }
        }

        [data-theme="dark"] .med-portal-header {
          background-color: var(--color-bg-secondary);
          border-bottom-color: var(--color-border);
        }

        .med-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: #52525B;
          margin-bottom: 12px;
          min-width: 0;
          overflow: hidden;
        }

        [data-theme="dark"] .med-breadcrumb {
          color: var(--color-text-secondary);
        }

        .med-breadcrumb button {
          color: #52525B;
          font-weight: 500;
          flex-shrink: 0;
          transition: color 0.15s ease;
        }

        [data-theme="dark"] .med-breadcrumb button {
          color: var(--color-text-secondary);
        }

        .med-breadcrumb button:hover {
          color: #E04323;
        }

        .med-breadcrumb .current {
          color: #7E1418;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        [data-theme="dark"] .med-breadcrumb .current {
          color: #E04323;
        }

        .med-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          align-items: center;
        }

        @media (min-width: 960px) {
          .med-header-grid {
            grid-template-columns: 1.5fr 1fr;
          }
        }

        .med-portal-title {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: clamp(1.65rem, 2.8vw, 2.2rem);
          font-weight: 700;
          color: #231F20;
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        [data-theme="dark"] .med-portal-title {
          color: var(--color-text-primary);
        }

        .med-portal-subtitle {
          font-size: 0.96rem;
          color: #52525B;
          max-width: 620px;
          line-height: 1.55;
        }

        [data-theme="dark"] .med-portal-subtitle {
          color: var(--color-text-secondary);
        }

        .med-summary-card {
          background-color: #F7F6F4;
          border: 1px solid #E5E5E5;
          border-left: 4px solid #7E1418;
          border-radius: 6px;
          padding: 16px 18px;
        }

        [data-theme="dark"] .med-summary-card {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
          border-left-color: #E04323;
        }

        .med-summary-title {
          font-size: 0.86rem;
          font-weight: 700;
          color: #7E1418;
          margin-bottom: 4px;
        }

        [data-theme="dark"] .med-summary-title {
          color: #F39C12;
        }

        .med-summary-text {
          font-size: 0.84rem;
          color: #52525B;
          line-height: 1.45;
        }

        [data-theme="dark"] .med-summary-text {
          color: var(--color-text-secondary);
        }

        /* Secciones del Portal */
        .med-section {
          padding: 36px 0;
        }

        .med-section-header {
          margin-bottom: 18px;
        }

        .med-section-h2 {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #231F20;
          margin-bottom: 4px;
        }

        [data-theme="dark"] .med-section-h2 {
          color: var(--color-text-primary);
        }

        .med-section-lead {
          font-size: 0.92rem;
          color: #52525B;
        }

        [data-theme="dark"] .med-section-lead {
          color: var(--color-text-secondary);
        }

        /* Vademécum y Buscador A-Z */
        .vademecum-panel {
          background-color: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 6px;
          padding: 14px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .vademecum-panel {
            padding: 20px;
          }
        }

        [data-theme="dark"] .vademecum-panel {
          background-color: var(--color-bg-secondary);
          border-color: var(--color-border);
        }

        .vademecum-search-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (min-width: 768px) {
          .vademecum-search-row {
            flex-direction: row;
            align-items: center;
          }
        }

        .vademecum-input-box {
          position: relative;
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
        }

        .vademecum-input-icon {
          position: absolute;
          left: 14px;
          color: #52525B;
          pointer-events: none;
        }

        .vademecum-input {
          width: 100%;
          padding: 11px 16px 11px 42px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 16px;
          color: #231F20;
          background-color: #FFFFFF;
          border: 1px solid #D4D4D8;
          border-radius: 5px;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        @media (min-width: 640px) {
          .vademecum-input {
            font-size: 0.94rem;
          }
        }

        [data-theme="dark"] .vademecum-input {
          background-color: var(--color-bg-primary);
          border-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .vademecum-input:focus {
          border-color: #E04323;
          box-shadow: 0 0 0 3px rgba(224, 67, 35, 0.12);
        }

        .vademecum-suggestions {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #F0EFED;
        }

        .vademecum-suggestions::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .vademecum-suggestions {
            flex-wrap: wrap;
            overflow-x: visible;
          }
        }

        [data-theme="dark"] .vademecum-suggestions {
          border-top-color: var(--color-border);
        }

        .vademecum-suggestions-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #52525B;
          margin-right: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        [data-theme="dark"] .vademecum-suggestions-label {
          color: var(--color-text-secondary);
        }

        .vademecum-suggestion-btn {
          padding: 6px 11px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #231F20;
          background-color: #F7F6F4;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          flex-shrink: 0;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        @media (min-width: 768px) {
          .vademecum-suggestion-btn {
            padding: 4px 10px;
          }
        }

        [data-theme="dark"] .vademecum-suggestion-btn {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .vademecum-suggestion-btn:hover {
          border-color: #E04323;
          color: #E04323;
        }

        .vademecum-suggestion-btn.active {
          background-color: #E04323;
          border-color: #E04323;
          color: #FFFFFF;
        }

        /* Pestañas de Áreas Clínicas */
        .vademecum-areas-bar {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          gap: 6px;
          margin-top: 14px;
        }

        .vademecum-areas-bar::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .vademecum-areas-bar {
            flex-wrap: wrap;
            overflow-x: visible;
          }
        }

        .vademecum-area-tab {
          padding: 8px 13px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #52525B;
          background-color: #F7F6F4;
          border: 1px solid #E5E5E5;
          border-radius: 5px;
          flex-shrink: 0;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        @media (min-width: 768px) {
          .vademecum-area-tab {
            padding: 7px 13px;
          }
        }

        [data-theme="dark"] .vademecum-area-tab {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
          color: var(--color-text-secondary);
        }

        .vademecum-area-tab:hover {
          color: #231F20;
          border-color: #D4D4D8;
        }

        [data-theme="dark"] .vademecum-area-tab:hover {
          color: var(--color-text-primary);
        }

        .vademecum-area-tab.active {
          background-color: #7E1418;
          border-color: #7E1418;
          color: #FFFFFF;
        }

        /* Índice Alfabético A-Z */
        .vademecum-az-wrap {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #E5E5E5;
        }

        [data-theme="dark"] .vademecum-az-wrap {
          border-top-color: var(--color-border);
        }

        .vademecum-az-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #52525B;
          margin-bottom: 6px;
          display: block;
        }

        [data-theme="dark"] .vademecum-az-label {
          color: var(--color-text-secondary);
        }

        .vademecum-az-list {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          gap: 5px;
        }

        .vademecum-az-list::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .vademecum-az-list {
            flex-wrap: wrap;
            overflow-x: visible;
            gap: 4px;
          }
        }

        .vademecum-az-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 9px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #231F20;
          background-color: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          white-space: nowrap;
          transition: all 0.12s ease;
        }

        @media (min-width: 768px) {
          .vademecum-az-btn {
            min-width: 30px;
            height: 30px;
            padding: 0 7px;
          }
        }

        [data-theme="dark"] .vademecum-az-btn {
          background-color: var(--color-bg-primary);
          border-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .vademecum-az-btn:hover {
          border-color: #E04323;
          color: #E04323;
        }

        .vademecum-az-btn.active {
          background-color: #E04323;
          border-color: #E04323;
          color: #FFFFFF;
        }

        /* Tabla / Listado Clínico Institucional */
        .vademecum-table-container {
          background-color: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 6px;
          overflow: hidden;
        }

        [data-theme="dark"] .vademecum-table-container {
          background-color: var(--color-bg-secondary);
          border-color: var(--color-border);
        }

        .vademecum-table-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 6px 10px;
          padding: 10px 14px;
          background-color: #F7F6F4;
          border-bottom: 1px solid #E5E5E5;
          font-size: 0.8rem;
          color: #52525B;
        }

        @media (min-width: 640px) {
          .vademecum-table-toolbar {
            padding: 10px 18px;
            font-size: 0.84rem;
          }
        }

        .vademecum-toolbar-hint {
          display: none;
        }

        @media (min-width: 640px) {
          .vademecum-toolbar-hint {
            display: inline;
          }
        }

        [data-theme="dark"] .vademecum-table-toolbar {
          background-color: var(--color-bg-tertiary);
          border-bottom-color: var(--color-border);
          color: var(--color-text-secondary);
        }

        .vademecum-table-head {
          display: none;
          grid-template-columns: 2fr 1.1fr 1.2fr 110px;
          gap: 16px;
          padding: 10px 18px;
          background-color: #FAFAFA;
          border-bottom: 1px solid #E5E5E5;
          font-size: 0.78rem;
          font-weight: 700;
          color: #52525B;
        }

        [data-theme="dark"] .vademecum-table-head {
          background-color: var(--color-bg-secondary);
          border-bottom-color: var(--color-border);
          color: var(--color-text-secondary);
        }

        @media (min-width: 860px) {
          .vademecum-table-head {
            display: grid;
          }
        }

        .vademecum-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px 14px;
          border-bottom: 1px solid #E5E5E5;
          align-items: stretch;
          text-align: left;
          width: 100%;
          background-color: transparent;
          transition: background-color 0.12s ease;
          cursor: pointer;
        }

        [data-theme="dark"] .vademecum-row {
          border-bottom-color: var(--color-border);
        }

        .vademecum-desktop-cell,
        .vademecum-desktop-action {
          display: none;
        }

        .vademecum-mobile-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .vademecum-mobile-meta {
          font-size: 0.78rem;
          color: #52525B;
          line-height: 1.35;
          min-width: 0;
          flex: 1;
        }

        [data-theme="dark"] .vademecum-mobile-meta {
          color: var(--color-text-secondary);
        }

        @media (min-width: 860px) {
          .vademecum-row {
            display: grid;
            grid-template-columns: 2fr 1.1fr 1.2fr 110px;
            gap: 16px;
            padding: 12px 18px;
            align-items: center;
          }

          .vademecum-mobile-bottom {
            display: none;
          }

          .vademecum-desktop-cell {
            display: block;
          }

          .vademecum-desktop-action {
            display: flex;
            justify-content: flex-end;
          }
        }

        .vademecum-row:last-child {
          border-bottom: none;
        }

        .vademecum-row:hover {
          background-color: #FDF9F8;
        }

        .vademecum-row:active {
          background-color: #F7F6F4;
        }

        [data-theme="dark"] .vademecum-row:hover {
          background-color: var(--color-bg-tertiary);
        }

        .vademecum-study-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #231F20;
          line-height: 1.35;
        }

        @media (min-width: 860px) {
          .vademecum-study-name {
            font-size: 0.92rem;
            font-weight: 600;
          }
        }

        [data-theme="dark"] .vademecum-study-name {
          color: var(--color-text-primary);
        }

        .vademecum-row:hover .vademecum-study-name {
          color: #E04323;
        }

        .vademecum-cell-meta {
          font-size: 0.84rem;
          color: #52525B;
        }

        [data-theme="dark"] .vademecum-cell-meta {
          color: var(--color-text-secondary);
        }

        .vademecum-ficha-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #E04323;
          background-color: #FFF5F2;
          border: 1px solid rgba(224, 67, 35, 0.25);
          border-radius: 4px;
          transition: all 0.15s ease;
          width: fit-content;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .vademecum-ficha-btn-sm {
          padding: 3px 8px;
          font-size: 0.76rem;
        }

        [data-theme="dark"] .vademecum-ficha-btn {
          background-color: rgba(224, 67, 35, 0.12);
        }

        .vademecum-row:hover .vademecum-ficha-btn {
          background-color: #E04323;
          border-color: #E04323;
          color: #FFFFFF;
        }

        /* Botones institucionales */
        .btn-inst-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #FFFFFF !important;
          background-color: #E04323;
          border: 1px solid #E04323;
          border-radius: 5px;
          transition: background-color 0.15s ease, border-color 0.15s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-inst-primary:hover {
          background-color: #C43417;
          border-color: #C43417;
          color: #FFFFFF !important;
        }

        .btn-inst-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 16px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #231F20;
          background-color: #FFFFFF;
          border: 1px solid #D4D4D8;
          border-radius: 5px;
          transition: border-color 0.15s ease, color 0.15s ease;
          cursor: pointer;
          text-decoration: none;
        }

        [data-theme="dark"] .btn-inst-secondary {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .btn-inst-secondary:hover {
          border-color: #E04323;
          color: #E04323;
        }

        /* Servicio de Derivaciones (Lab-to-Lab) */
        .derivaciones-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-top: 4px solid #7E1418;
          border-radius: 6px;
          padding: 18px 16px;
        }

        @media (min-width: 640px) {
          .derivaciones-card {
            padding: 24px;
          }
        }

        [data-theme="dark"] .derivaciones-card {
          background-color: var(--color-bg-secondary);
          border-color: var(--color-border);
          border-top-color: #E04323;
        }

        .derivaciones-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 16px;
        }

        @media (min-width: 860px) {
          .derivaciones-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 18px;
          }
        }

        .derivaciones-item {
          background-color: #F7F6F4;
          border: 1px solid #E5E5E5;
          border-radius: 5px;
          padding: 14px 16px;
        }

        @media (min-width: 640px) {
          .derivaciones-item {
            padding: 16px 18px;
          }
        }

        [data-theme="dark"] .derivaciones-item {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
        }

        .derivaciones-item-title {
          font-size: 0.96rem;
          font-weight: 700;
          color: #231F20;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        [data-theme="dark"] .derivaciones-item-title {
          color: var(--color-text-primary);
        }

        .derivaciones-item-desc {
          font-size: 0.85rem;
          color: #52525B;
          line-height: 1.5;
        }

        [data-theme="dark"] .derivaciones-item-desc {
          color: var(--color-text-secondary);
        }

        .derivaciones-contact-bar {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid #E5E5E5;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        [data-theme="dark"] .derivaciones-contact-bar {
          border-top-color: var(--color-border);
        }

        .derivaciones-contact-actions {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 8px;
        }

        .derivaciones-contact-btn {
          width: 100%;
          min-width: 0;
          min-height: 42px;
          padding: 9px 12px;
          font-size: 0.82rem;
        }

        .derivaciones-email-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .derivaciones-contact-actions {
            flex-direction: row;
            flex-wrap: wrap;
            width: auto;
            gap: 10px;
          }

          .derivaciones-contact-btn {
            width: auto;
            min-height: 0;
            padding: 9px 16px;
            font-size: 0.88rem;
          }
        }

        /* Equipamiento Analítico */
        .equip-inst-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 640px) {
          .equip-inst-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .equip-inst-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .equip-inst-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 6px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (min-width: 640px) {
          .equip-inst-card {
            padding: 18px;
          }
        }

        [data-theme="dark"] .equip-inst-card {
          background-color: var(--color-bg-secondary);
          border-color: var(--color-border);
        }

        .equip-inst-brand {
          font-size: 0.76rem;
          font-weight: 600;
          color: #7E1418;
          margin-bottom: 2px;
        }

        [data-theme="dark"] .equip-inst-brand {
          color: #F39C12;
        }

        .equip-inst-model {
          font-size: 1.06rem;
          font-weight: 700;
          color: #231F20;
          margin-bottom: 4px;
        }

        [data-theme="dark"] .equip-inst-model {
          color: var(--color-text-primary);
        }

        .equip-inst-specialty {
          font-size: 0.8rem;
          font-weight: 600;
          color: #E04323;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #F0EFED;
        }

        [data-theme="dark"] .equip-inst-specialty {
          border-bottom-color: var(--color-border);
        }

        .equip-inst-desc {
          font-size: 0.84rem;
          color: #52525B;
          line-height: 1.48;
        }

        [data-theme="dark"] .equip-inst-desc {
          color: var(--color-text-secondary);
        }

        /* Modal de Ficha de Determinación (Bottom-sheet en móvil, centrado en >= 600px) */
        .med-dialog-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(35, 31, 32, 0.55);
          z-index: 1200;
        }

        .med-dialog-positioner {
          position: fixed;
          inset: 0;
          z-index: 1201;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          overflow: hidden;
        }

        .med-dialog-content {
          width: 100%;
          max-width: 100%;
          max-height: 88dvh;
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          border-top: 4px solid #E04323;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.22);
          overflow: hidden;
          outline: none;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        @media (min-width: 600px) {
          .med-dialog-positioner {
            align-items: center;
            padding: 16px;
            overflow-y: auto;
          }

          .med-dialog-content {
            max-width: 620px;
            max-height: calc(100dvh - 32px);
            border: 1px solid #E5E5E5;
            border-top: 4px solid #E04323;
            border-radius: 6px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
          }
        }

        [data-theme="dark"] .med-dialog-content {
          background-color: var(--color-bg-secondary);
          border-color: var(--color-border);
          border-top-color: #E04323;
        }

        .med-dialog-header {
          padding: 16px 18px 14px;
          border-bottom: 1px solid #E5E5E5;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          flex-shrink: 0;
        }

        @media (min-width: 600px) {
          .med-dialog-header {
            padding: 20px 22px 16px;
            gap: 14px;
          }
        }

        [data-theme="dark"] .med-dialog-header {
          border-bottom-color: var(--color-border);
        }

        .med-dialog-area-badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          color: #7E1418;
          background-color: #F7F6F4;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 2px 9px;
          margin-bottom: 6px;
        }

        [data-theme="dark"] .med-dialog-area-badge {
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
          color: #F39C12;
        }

        .med-dialog-title {
          font-size: 1.12rem;
          font-weight: 700;
          color: #231F20;
          line-height: 1.3;
        }

        @media (min-width: 600px) {
          .med-dialog-title {
            font-size: 1.22rem;
          }
        }

        [data-theme="dark"] .med-dialog-title {
          color: var(--color-text-primary);
        }

        .med-dialog-close {
          width: 38px;
          height: 38px;
          border-radius: 4px;
          border: 1px solid #E5E5E5;
          color: #52525B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 600px) {
          .med-dialog-close {
            width: 32px;
            height: 32px;
          }
        }

        .med-dialog-close:hover {
          border-color: #E04323;
          color: #E04323;
        }

        .med-dialog-body {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          flex: 1;
        }

        @media (min-width: 600px) {
          .med-dialog-body {
            padding: 18px 22px;
          }
        }

        .med-ficha-row {
          padding-bottom: 12px;
          border-bottom: 1px solid #F0EFED;
        }

        [data-theme="dark"] .med-ficha-row {
          border-bottom-color: var(--color-border);
        }

        .med-ficha-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .med-ficha-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #52525B;
          margin-bottom: 3px;
        }

        [data-theme="dark"] .med-ficha-label {
          color: var(--color-text-secondary);
        }

        .med-ficha-value {
          font-size: 0.92rem;
          color: #231F20;
          line-height: 1.48;
        }

        [data-theme="dark"] .med-ficha-value {
          color: var(--color-text-primary);
        }

        .med-dialog-footer {
          padding: 12px 18px calc(14px + env(safe-area-inset-bottom));
          background-color: #F7F6F4;
          border-top: 1px solid #E5E5E5;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .med-dialog-footer > button,
        .med-dialog-footer > a {
          width: 100%;
          min-height: 44px;
        }

        [data-theme="dark"] .med-dialog-footer {
          background-color: var(--color-bg-tertiary);
          border-top-color: var(--color-border);
        }

        @media (min-width: 600px) {
          .med-dialog-footer {
            padding: 14px 22px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .med-dialog-footer > button,
          .med-dialog-footer > a {
            width: auto;
            min-height: 0;
          }
        }
      `}</style>

      {/* 1. ENCABEZADO INSTITUCIONAL */}
      <header className="med-portal-header">
        <div className="container">
          <nav className="med-breadcrumb" aria-label="Ruta de navegación">
            <button type="button" onClick={() => onNavigate('inicio')}>
              Inicio
            </button>
            <ChevronRight size={14} />
            <span className="current">Médicos y Derivaciones</span>
          </nav>

          <div className="med-header-grid">
            <div>
              <h1 className="med-portal-title">Portal para Profesionales y Derivaciones</h1>
              <p className="med-portal-subtitle">
                Vademécum con más de 300 determinaciones clínicas y especializadas, requisitos de
                muestra y derivaciones para médicos y laboratorios del NOA.
              </p>
            </div>

            <div className="med-summary-card">
              <div className="med-summary-title">+300 Análisis · Calidad PEEC-FBA y SAMER</div>
              <p className="med-summary-text">
                Controles externos PEEC-FBA y acreditación SAMER en Embriología, Medicina
                Reproductiva y Andrología.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* 2. VADEMÉCUM Y BUSCADOR DE PRÁCTICAS A-Z */}
        <section className="med-section">
          <div className="med-section-header">
            <h2 className="med-section-h2">Vademécum de Prácticas (+300 Análisis)</h2>
            <p className="med-section-lead">
              Consulte muestra requerida, preparación del paciente y metodología analítica.
            </p>
          </div>

          <div className="vademecum-panel">
            {/* Buscador Principal */}
            <div className="vademecum-search-row">
              <div className="vademecum-input-box">
                <Search size={18} className="vademecum-input-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="vademecum-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(50);
                  }}
                  placeholder="Buscar determinación (ej: Espermograma, Hormona Antimülleriana, Cariotipo, TSH)..."
                  aria-label="Buscar determinación bioquímica"
                />
              </div>

              {(searchQuery || selectedArea !== 'TODAS' || selectedLetter !== 'TODAS') && (
                <button
                  type="button"
                  className="btn-inst-secondary"
                  onClick={handleResetFilters}
                >
                  <X size={16} />
                  <span>Limpiar</span>
                </button>
              )}
            </div>

            {/* Consultas frecuentes */}
            <div className="vademecum-suggestions">
              <span className="vademecum-suggestions-label">Frecuentes:</span>
              {commonSearches.map((term) => {
                const isActive = cleanString(searchQuery) === cleanString(term);
                return (
                  <button
                    key={term}
                    type="button"
                    className={`vademecum-suggestion-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (isActive) {
                        setSearchQuery('');
                      } else {
                        setSearchQuery(term);
                        setSelectedArea('TODAS');
                        setSelectedLetter('TODAS');
                        setVisibleCount(50);
                      }
                    }}
                  >
                    {term}
                  </button>
                );
              })}
            </div>

            {/* Pestañas de Área Clínica */}
            <div className="vademecum-areas-bar" role="tablist" aria-label="Filtrar por especialidad">
              {clinicalAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedArea === area.id}
                  className={`vademecum-area-tab ${selectedArea === area.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedArea(area.id);
                    setVisibleCount(50);
                  }}
                >
                  {area.label}
                </button>
              ))}
            </div>

            {/* Índice Alfabético A-Z */}
            <div className="vademecum-az-wrap">
              <span className="vademecum-az-label">Índice A–Z:</span>
              <div className="vademecum-az-list">
                <button
                  type="button"
                  className={`vademecum-az-btn ${selectedLetter === 'TODAS' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLetter('TODAS');
                    setVisibleCount(50);
                  }}
                >
                  Todas
                </button>
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    className={`vademecum-az-btn ${selectedLetter === letter ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLetter(letter);
                      setVisibleCount(50);
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabla / Listado Institucional de Prácticas */}
          <div className="vademecum-table-container">
            <div className="vademecum-table-toolbar">
              <span>
                Catálogo activo: <strong>+300 determinaciones clínicas y especializadas</strong>
                {searchQuery || selectedArea !== 'TODAS' || selectedLetter !== 'TODAS'
                  ? ` (${filteredAnalyses.length} coincidencias)`
                  : ''}
              </span>
              <span className="vademecum-toolbar-hint">Haga clic en un estudio para ver su ficha</span>
            </div>

            <div className="vademecum-table-head">
              <div>Determinación</div>
              <div>Muestra sugerida</div>
              <div>Especialidad</div>
              <div style={{ textAlign: 'right' }}>Ficha</div>
            </div>

            <div>
              {filteredAnalyses.slice(0, visibleCount).map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className="vademecum-row"
                  onClick={() => handleSelectStudy(item)}
                >
                  <div className="vademecum-study-name">{item.name}</div>
                  <div className="vademecum-cell-meta vademecum-desktop-cell">{item.sampleSummary}</div>
                  <div className="vademecum-cell-meta vademecum-desktop-cell">{item.areaLabel}</div>
                  <div className="vademecum-desktop-action">
                    <span className="vademecum-ficha-btn">
                      <FileText size={14} />
                      <span>Ver ficha</span>
                    </span>
                  </div>
                  <div className="vademecum-mobile-bottom">
                    <span className="vademecum-mobile-meta">
                      {item.sampleSummary} · {item.areaLabel}
                    </span>
                    <span className="vademecum-ficha-btn vademecum-ficha-btn-sm">
                      <FileText size={13} />
                      <span>Ficha</span>
                    </span>
                  </div>
                </button>
              ))}

              {filteredAnalyses.length === 0 && (
                <div style={{ padding: '36px 20px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.96rem' }}>
                    Sin resultados para la búsqueda actual.
                  </p>
                  <p
                    style={{
                      color: '#52525B',
                      fontSize: '0.88rem',
                      maxWidth: '420px',
                      margin: '0 auto 16px'
                    }}
                  >
                    Consulte directamente a nuestra secretaría técnica por determinaciones especiales.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-inst-secondary"
                      onClick={handleResetFilters}
                    >
                      Ver todo el catálogo
                    </button>
                    <a
                      href={getWhatsAppUrl(searchQuery || 'práctica bioquímica')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-inst-primary text-white"
                      style={{ color: '#FFFFFF' }}
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {visibleCount < filteredAnalyses.length && (
            <div style={{ marginTop: '18px', textAlign: 'center' }}>
              <button
                type="button"
                className="btn-inst-secondary"
                onClick={() => setVisibleCount((prev) => prev + 50)}
              >
                Ver más análisis
              </button>
            </div>
          )}
        </section>

        {/* 3. SERVICIO DE DERIVACIONES (LAB-TO-LAB) */}
        <section className="med-section" style={{ paddingTop: '4px' }}>
          <div className="derivaciones-card">
            <h2 className="med-section-h2">Derivaciones para Médicos y Laboratorios</h2>
            <p className="med-section-lead">
              Recepción y procesamiento de muestras derivadas de profesionales, clínicas y
              laboratorios de Salta y el NOA.
            </p>

            <div className="derivaciones-grid">
              <div className="derivaciones-item">
                <h3 className="derivaciones-item-title">
                  <Truck size={18} style={{ color: '#E04323', flexShrink: 0 }} />
                  <span>Recepción y Cadena de Frío</span>
                </h3>
                <p className="derivaciones-item-desc">
                  Control pre-analítico estandarizado y verificación de estabilidad para muestras
                  remitidas desde el interior.
                </p>
              </div>

              <div className="derivaciones-item">
                <h3 className="derivaciones-item-title">
                  <ShieldCheck size={18} style={{ color: '#E04323', flexShrink: 0 }} />
                  <span>Calidad PEEC-FBA y SAMER</span>
                </h3>
                <p className="derivaciones-item-desc">
                  Controles internos diarios y evaluación externa continua en bioquímica clínica,
                  embriología y fertilidad.
                </p>
              </div>

              <div className="derivaciones-item">
                <h3 className="derivaciones-item-title">
                  <Building2 size={18} style={{ color: '#E04323', flexShrink: 0 }} />
                  <span>Informes Online Validados</span>
                </h3>
                <p className="derivaciones-item-desc">
                  Resultados digitales con validación bioquímica y aviso directo al profesional ante
                  valores críticos.
                </p>
              </div>
            </div>

            <div className="derivaciones-contact-bar">
              <div style={{ fontSize: '0.88rem', color: '#52525B' }}>
                <strong style={{ color: '#231F20' }}>Sede Única y Secretaría Técnica:</strong> Mariano Boedo 23,
                Salta · Lunes a Viernes de 7:30 a 19:30 hs | Sábados de 9:00 a 12:30 hs.
              </div>
              <div className="derivaciones-contact-actions">
                <a href="tel:03874215440" className="btn-inst-secondary derivaciones-contact-btn">
                  <Phone size={15} style={{ flexShrink: 0 }} />
                  <span>(0387) 421-5440</span>
                </a>
                <a href="mailto:laboratoriosaresa@hotmail.com.ar" className="btn-inst-secondary derivaciones-contact-btn">
                  <Mail size={15} style={{ flexShrink: 0 }} />
                  <span className="derivaciones-email-text">laboratoriosaresa@hotmail.com.ar</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECNOLOGÍA Y EQUIPAMIENTO ANALÍTICO */}
        <section className="med-section" style={{ paddingTop: '4px', paddingBottom: '56px' }}>
          <div className="med-section-header">
            <h2 className="med-section-h2">Tecnología y Equipamiento Analítico</h2>
            <p className="med-section-lead">
              Plataformas automatizadas para determinaciones de rutina y alta complejidad.
            </p>
          </div>

          <div className="equip-inst-grid">
            {equipments.map((eq) => (
              <article key={eq.model} className="equip-inst-card">
                <div>
                  <div className="equip-inst-brand">{eq.brand}</div>
                  <h3 className="equip-inst-model">{eq.model}</h3>
                  <div className="equip-inst-specialty">{eq.specialty}</div>
                  <p className="equip-inst-desc">{eq.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL DE FICHA DE DETERMINACIÓN (@radix-ui/react-dialog) */}
      <Dialog.Root
        open={Boolean(selectedAnalysis)}
        onOpenChange={(open) => {
          if (!open) setSelectedAnalysis(null);
        }}
      >
        {selectedAnalysis && (
          <Dialog.Portal>
            <Dialog.Overlay className="med-dialog-overlay" />
            <div className="med-dialog-positioner">
              <Dialog.Content className="med-dialog-content">
                <div className="med-dialog-header">
                  <div>
                    <span className="med-dialog-area-badge">{selectedAnalysis.areaLabel}</span>
                    <Dialog.Title className="med-dialog-title">
                      {selectedAnalysis.name}
                    </Dialog.Title>
                    <Dialog.Description style={{ fontSize: '0.82rem', color: '#52525B', marginTop: '2px' }}>
                      Especificaciones pre-analíticas — Laboratorio Saresa
                    </Dialog.Description>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="med-dialog-close"
                      aria-label="Cerrar ficha"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="med-dialog-body">
                  <div className="med-ficha-row">
                    <div className="med-ficha-label">Tipo de muestra</div>
                    <div className="med-ficha-value">{selectedAnalysis.sample}</div>
                  </div>

                  <div className="med-ficha-row">
                    <div className="med-ficha-label">Preparación del paciente</div>
                    <div className="med-ficha-value">{selectedAnalysis.preparation}</div>
                  </div>

                  <div className="med-ficha-row">
                    <div className="med-ficha-label">Conservación y derivación</div>
                    <div className="med-ficha-value">{selectedAnalysis.conservation}</div>
                  </div>

                  <div className="med-ficha-row">
                    <div className="med-ficha-label">Metodología</div>
                    <div className="med-ficha-value">{selectedAnalysis.methodology}</div>
                  </div>

                  <div className="med-ficha-row">
                    <div className="med-ficha-label">Tiempo estimado de informe</div>
                    <div className="med-ficha-value" style={{ fontWeight: 600, color: '#7E1418' }}>
                      {selectedAnalysis.turnaround}
                    </div>
                  </div>
                </div>

                <div className="med-dialog-footer">
                  <button
                    type="button"
                    className="btn-inst-secondary"
                    onClick={handleCopyPatientInstructions}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Copiado' : 'Copiar indicaciones'}</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(selectedAnalysis.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-inst-primary text-white"
                    style={{ color: '#FFFFFF' }}
                  >
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </div>
  );
}
