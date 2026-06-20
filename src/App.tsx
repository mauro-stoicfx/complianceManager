import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Calendar as CalendarIcon, 
  LayoutDashboard, 
  Database, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  LogOut, 
  BookOpen, 
  ChevronDown,
  Layers,
  Sparkles,
  Sliders,
  Globe,
  Download,
  UploadCloud,
  Award,
  FileText
} from 'lucide-react';

import { Control, INITIAL_LOCAL_CONTROLS } from './controls_data';
import EvidenceRepository from './components/EvidenceRepository';
import MaturityAssessment from './components/MaturityAssessment';
import AuditReport from './components/AuditReport';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';

interface CalendarEvent {
  control_id: string;
  description: string;
  jurisdiction: string;
  due_date: string;
  days_remaining: number;
  status: string;
  color: 'green' | 'yellow' | 'red';
}

const DOMAIN_IDS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'];


const TRANSLATIONS = {
  es: {
    title: "Stoic FX",
    tagline: "Compliance Multi-Jurisdicción",
    subTitle: "Universo Regulatorio FSCA & FSC Mauritius",
    dashboard: "Dashboard",
    universe: "Universo Regulatorio",
    calendar: "Calendario",
    apiHealthConnected: "Servidor API: Conectado",
    apiHealthLocal: "Modo Local (In-memory)",
    logout: "Cerrar sesión",
    complianceRate: "Compliance Rate Global",
    target: "Objetivo",
    atRisk: "Controles en Riesgo",
    attentionRequired: "Atención requerida",
    overdue: "Vencimientos Incumplidos",
    actionRequired: "Acción inmediata",
    maturityLevel: "Maturity Level Promedio",
    avgDomains: "Promedio de los 8 dominios regulatorios",
    radarTitle: "Radar de Madurez por Dominio",
    radarSub: "Radar de Madurez CMMI Promedio (Objetivo: ≥3.0)",
    nextDue: "Próximos Vencimientos Críticos",
    noEvents: "No hay eventos ni plazos próximos asignados.",
    dueDate: "Fecha límite",
    daysRemaining: "días",
    overdueAlert: "Vencido hace",
    daysRemainingAlert: "Faltan",
    today: "Hoy",
    searchPlaceholder: "Buscar control, norma o ID...",
    allJurisdictions: "Todas",
    allDomains: "Todos los dominios",
    allStatuses: "Todos los estados",
    showing: "Mostrando",
    of: "de",
    obligations: "obligaciones",
    compliant: "Compliant",
    inProgress: "En progreso",
    atRiskStatus: "En riesgo",
    nonCompliant: "Incumplido",
    evalButton: "Evaluar",
    assessTitle: "Evaluación de Cumplimiento",
    cancel: "Cancelar",
    save: "Guardar Cambios",
    sourceReg: "Norma de Origen",
    description: "Descripción de Obligación",
    evidenceReq: "Evidencia Requerida",
    notes: "Notas Internas",
    justification: "Justificación del Nivel",
    autoLoginAdmin: "Entrar automáticamente como Administrador (Mauro)",
    autoLoginCO: "Entrar como Oficial de Compliance (Simulado)",
    password: "Contraseña",
    username: "Usuario / Correo",
    loginTitle: "Iniciar Sesión",
    fsca: "FSCA",
    fsc: "FSC Mauritius",
    both: "Ambas",
    cmmiLevels: [
      'Nivel 0: Inexistente', 
      'Nivel 1: Inicial', 
      'Nivel 2: Definido', 
      'Nivel 3: Implementado', 
      'Nivel 4: Medido', 
      'Nivel 5: Optimizado'
    ],
    cmmiDescriptions: [
      'El control no existe ni se ha considerado en el negocio.',
      'El proceso existe ad-hoc, depende puramente de una persona y no está documentado.',
      'Existe una política o procedimiento por escrito y hay un responsable asignado.',
      'Se ejecuta consistentemente con evidencia documentada e histórica disponible.',
      'Se mide la efectividad del control utilizando métricas o indicadores clave (KPIs).',
      'Mejora continua e implementada basada en métricas y lecciones aprendidas.'
    ]
  },
  en: {
    title: "Stoic FX",
    tagline: "Multi-Jurisdictional Compliance",
    subTitle: "FSCA & FSC Mauritius Regulatory Universe",
    dashboard: "Dashboard",
    universe: "Regulatory Universe",
    calendar: "Calendar",
    apiHealthConnected: "API Server: Connected",
    apiHealthLocal: "Local Mode (In-memory)",
    logout: "Log out",
    complianceRate: "Global Compliance Rate",
    target: "Target",
    atRisk: "Controls At Risk",
    attentionRequired: "Attention required",
    overdue: "Overdue Obligations",
    actionRequired: "Immediate action",
    maturityLevel: "Average Maturity Level",
    avgDomains: "Average of the 8 regulatory domains",
    radarTitle: "Maturity Radar by Domain",
    radarSub: "Average CMMI Maturity Radar (Target: ≥3.0)",
    nextDue: "Upcoming Critical Deadlines",
    noEvents: "No upcoming events or deadlines assigned.",
    dueDate: "Due date",
    daysRemaining: "days",
    overdueAlert: "Overdue by",
    daysRemainingAlert: "Remaining",
    today: "Today",
    searchPlaceholder: "Search control, regulation or ID...",
    allJurisdictions: "All",
    allDomains: "All domains",
    allStatuses: "All statuses",
    showing: "Showing",
    of: "of",
    obligations: "obligations",
    compliant: "Compliant",
    inProgress: "In progress",
    atRiskStatus: "At risk",
    nonCompliant: "Non-compliant",
    evalButton: "Assess",
    assessTitle: "Compliance Assessment",
    cancel: "Cancel",
    save: "Save Changes",
    sourceReg: "Source Regulation",
    description: "Obligation Description",
    evidenceReq: "Required Evidence",
    notes: "Internal Notes",
    justification: "Level Justification",
    autoLoginAdmin: "Log in automatically as Administrator (Mauro)",
    autoLoginCO: "Log in as Compliance Officer (Simulated)",
    password: "Password",
    username: "User / Email",
    loginTitle: "Log In",
    fsca: "FSCA",
    fsc: "FSC Mauritius",
    both: "Both",
    cmmiLevels: [
      'Level 0: Non-existent', 
      'Level 1: Initial', 
      'Level 2: Defined', 
      'Level 3: Implemented', 
      'Level 4: Measured', 
      'Level 5: Optimized'
    ],
    cmmiDescriptions: [
      'The control does not exist and has not been considered in the business.',
      'The process exists ad-hoc, depends purely on one person, and is undocumented.',
      'There is a written policy or procedure and a responsible person assigned.',
      'It is executed consistently with documented and historical evidence available.',
      'The effectiveness of the control is measured using metrics or key performance indicators (KPIs).',
      'Continuous improvement loop based on metrics and lessons learned.'
    ]
  }
};

export default function App() {
  // Language State
  const [lang, setLang] = useState<'es' | 'en'>('en');
  const t = TRANSLATIONS[lang];

  // Authentication & Users state
  const [user, setUser] = useState<{ email: string; full_name: string; role: string } | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [apiOnline, setApiOnline] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'universe' | 'calendar' | 'evidence' | 'intelligence' | 'maturity' | 'reports'>('dashboard');

  // Core compliance data states
  const [controls, setControls] = useState<Control[]>(INITIAL_LOCAL_CONTROLS);
  const [evidences, setEvidences] = useState<any[]>([]);
  const [changes, setChanges] = useState<any[]>([]);
  const [selectedChange, setSelectedChange] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [actionTakenText, setActionTakenText] = useState('');
  const [affectedControlsSelected, setAffectedControlsSelected] = useState<string[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters State
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('All');
  const [filterDomain, setFilterDomain] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Collapsed domains state (true = collapsed, false = expanded)
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});

  const toggleDomainCollapse = (domainId: string) => {
    setCollapsedDomains(prev => ({
      ...prev,
      [domainId]: !prev[domainId]
    }));
  };

  // Assessment edit form state
  const [editStatus, setEditStatus] = useState<'Compliant' | 'En progreso' | 'En riesgo' | 'Incumplido'>('En progreso');
  const [editMaturity, setEditMaturity] = useState<number>(1);
  const [editJustification, setEditJustification] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Fetch from backend API if online
  const checkBackendHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) {
        setApiOnline(true);
        fetchControlsFromBackend();
        fetchEvidencesFromBackend();
        fetchChangesFromBackend();
      } else {
        setApiOnline(false);
      }
    } catch {
      setApiOnline(false);
    }
  };

  const fetchEvidencesFromBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/evidence`);
      if (res.ok) {
        const data = await res.json();
        setEvidences(data);
      }
    } catch (err) {
      console.error("Backend evidences fetch error: ", err);
    }
  };

  const fetchChangesFromBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/intelligence/changes`);
      if (res.ok) {
        const data = await res.json();
        setChanges(data);
      }
    } catch (err) {
      console.error("Backend changes fetch error: ", err);
    }
  };

  const fetchControlsFromBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/controls`);
      if (res.ok) {
        const data = await res.json();
        // Backend maps directly, we sync
        const synced = INITIAL_LOCAL_CONTROLS.map(localItem => {
          const backendItem = data.find((d: any) => d.id === localItem.id);
          if (backendItem) {
            return {
              ...localItem,
              status: backendItem.status,
              maturity_level: backendItem.maturity_level,
              maturity_justification: backendItem.maturity_justification,
              notes: backendItem.notes,
              last_reviewed: backendItem.last_reviewed
            };
          }
          return localItem;
        });
        setControls(synced);
      }
    } catch (err) {
      console.error("Backend fetch error: ", err);
    }
  };

  useEffect(() => {
    checkBackendHealth();
    // Re-check periodically
    const timer = setInterval(checkBackendHealth, 10000);
    return () => clearInterval(timer);
  }, []);

  // Compute Calendar Events
  useEffect(() => {
    const computed = controls
      .filter(c => c.next_due_date)
      .map(c => {
        const due = new Date(c.next_due_date!);
        const today = new Date();
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let color: 'green' | 'yellow' | 'red' = 'green';
        if (diffDays < 0 || c.status === 'Incumplido') color = 'red';
        else if (diffDays <= 30 || c.status === 'En riesgo') color = 'yellow';

        return {
          control_id: c.id,
          description: lang === 'es' ? c.description : c.descriptionEn,
          jurisdiction: c.jurisdiction,
          due_date: c.next_due_date!,
          days_remaining: diffDays,
          status: c.status,
          color
        };
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

    setEvents(computed);
  }, [controls, lang]);

  // Compute Dashboard Metrics
  const totalCount = controls.length;
  const compliantCount = controls.filter(c => c.status === 'Compliant').length;
  const atRiskCount = controls.filter(c => c.status === 'En riesgo').length;
  const overdueCount = events.filter(e => e.color === 'red').length;
  const complianceRate = totalCount > 0 ? Math.round((compliantCount / totalCount) * 100) : 0;

  // Calculate Average Maturity Score by Domain
  const getDomainMaturityAverages = () => {
    const averages: { [key: string]: number } = {};
    DOMAIN_IDS.forEach(domId => {
      const domControls = controls.filter(c => c.domain.startsWith(domId));
      if (domControls.length > 0) {
        const sum = domControls.reduce((acc, c) => acc + c.maturity_level, 0);
        averages[domId] = parseFloat((sum / domControls.length).toFixed(1));
      } else {
        averages[domId] = 1.0;
      }
    });
    return averages;
  };

  const domainMaturity = getDomainMaturityAverages();

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim()) {
      setUser({
        email: loginEmail,
        full_name: loginEmail.toLowerCase().includes('mauro') ? 'Mauro Serrano' : 'User Member',
        role: loginEmail.toLowerCase().includes('mauro') ? 'admin' : 'compliance_officer'
      });
    }
  };

  // Open Drawer for Control assessment
  const handleOpenAssess = (control: Control) => {
    setSelectedControl(control);
    setEditStatus(control.status);
    setEditMaturity(control.maturity_level);
    setEditJustification(lang === 'es' ? control.maturity_justification : control.maturity_justificationEn);
    setEditNotes(control.notes || '');
    setIsDrawerOpen(true);
  };

  // Save Control Assessment
  const handleSaveAssessment = async () => {
    if (!selectedControl) return;

    const payload = {
      status: editStatus,
      maturity_level: editMaturity,
      maturity_justification: editJustification || 'Manual assessment update',
      notes: editNotes
    };

    if (apiOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/controls/${selectedControl.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          setControls(prev => prev.map(c => {
            if (c.id === updated.id) {
              return {
                ...c,
                status: updated.status,
                maturity_level: updated.maturity_level,
                maturity_justification: lang === 'es' ? updated.maturity_justification : c.maturity_justification,
                maturity_justificationEn: lang === 'en' ? updated.maturity_justification : c.maturity_justificationEn,
                notes: updated.notes,
                last_reviewed: updated.last_reviewed
              };
            }
            return c;
          }));
        }
      } catch (err) {
        console.error("Failed to update control on API", err);
      }
    } else {
      // Local state fallback
      setControls(prev => prev.map(c => {
        if (c.id === selectedControl.id) {
          return {
            ...c,
            status: editStatus,
            maturity_level: editMaturity,
            maturity_justification: lang === 'es' ? editJustification : c.maturity_justification,
            maturity_justificationEn: lang === 'en' ? editJustification : c.maturity_justificationEn,
            notes: editNotes,
            last_reviewed: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      }));
    }

    setIsDrawerOpen(false);
    setSelectedControl(null);
  };

  // Dynamic Custom SVG Radar Chart component
  const RadarChart = () => {
    const dataKeys = DOMAIN_IDS;
    const scores = dataKeys.map(k => domainMaturity[k] || 1.0);
    const maxVal = 5;
    
    // Polar coordinates math
    const cx = 150;
    const cy = 150;
    const r = 100;
    
    const points = scores.map((score, i) => {
      const angle = (i * 2 * Math.PI) / dataKeys.length - Math.PI / 2;
      const x = cx + (r * (score / maxVal)) * Math.cos(angle);
      const y = cy + (r * (score / maxVal)) * Math.sin(angle);
      return { x, y, label: dataKeys[i], val: score };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <div className="flex flex-col items-center justify-center">
        <svg width="300" height="300" className="drop-shadow-lg">
          {/* Radial Grid lines */}
          {[1, 2, 3, 4, 5].map((lvl) => {
            const gridPoints = dataKeys.map((_, i) => {
              const angle = (i * 2 * Math.PI) / dataKeys.length - Math.PI / 2;
              const x = cx + (r * (lvl / maxVal)) * Math.cos(angle);
              const y = cy + (r * (lvl / maxVal)) * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={lvl}
                points={gridPoints}
                fill="none"
                stroke="#1E293B"
                strokeWidth="1"
              />
            );
          })}

          {/* Spine Rays */}
          {dataKeys.map((_, i) => {
            const angle = (i * 2 * Math.PI) / dataKeys.length - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#1E293B"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled Radar Area */}
          <polygon
            points={polygonPoints}
            fill="rgba(59, 130, 246, 0.25)"
            stroke="#3B82F6"
            strokeWidth="2.5"
            className="transition-all duration-500 ease-in-out"
          />

          {/* Labels & Data Dots */}
          {points.map((p, i) => {
            const angle = (i * 2 * Math.PI) / dataKeys.length - Math.PI / 2;
            const labelX = cx + (r + 18) * Math.cos(angle);
            const labelY = cy + (r + 12) * Math.sin(angle);
            
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill="#60A5FA"
                  stroke="#0B0F19"
                  strokeWidth="1.5"
                  className="transition-all duration-300 hover:scale-150"
                />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {p.label} ({p.val})
                </text>
              </g>
            );
          })}
        </svg>
        <span className="text-xs text-gray-400 mt-2 font-medium">{t.radarSub}</span>
      </div>
    );
  };

  // Filter Logic
  const filteredControls = controls.filter(c => {
    const matchJurisdiction = filterJurisdiction === 'All' || c.jurisdiction === filterJurisdiction || c.jurisdiction === 'Ambas';
    const matchDomain = filterDomain === 'All' || c.domain.startsWith(filterDomain);
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    
    const descText = lang === 'es' ? c.description.toLowerCase() : c.descriptionEn.toLowerCase();
    const sourceText = c.source_regulation.toLowerCase();
    const idText = c.id.toLowerCase();
    
    const matchSearch = searchTerm === '' || 
      idText.includes(searchTerm.toLowerCase()) ||
      descText.includes(searchTerm.toLowerCase()) ||
      sourceText.includes(searchTerm.toLowerCase());
    return matchJurisdiction && matchDomain && matchStatus && matchSearch;
  });

  // Render Login view if user is not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
        {/* Language switch on Login page */}
        <div className="absolute top-4 right-4 z-55 flex items-center gap-1.5 bg-[#151D30]/90 border border-gray-800 rounded-lg px-3 py-1.5 text-xs shadow-md">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as 'es' | 'en')}
            className="bg-transparent border-none text-gray-300 focus:outline-none cursor-pointer font-semibold text-xs"
          >
            <option value="es" className="bg-[#151D30]">Español</option>
            <option value="en" className="bg-[#151D30]">English</option>
          </select>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#151D30]/80 backdrop-blur-xl border border-gray-880 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{t.title}</h1>
            <p className="text-sm text-gray-400 mt-1">{t.tagline}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.username}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej: mauro@stoicfx.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.password}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-3 text-sm transition-all shadow-lg hover:shadow-blue-500/10 active:scale-[0.98]"
            >
              {t.loginTitle}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-800/60 pt-4 flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => {
                setUser({ email: 'mauro@stoicfx.com', full_name: 'Mauro Serrano', role: 'admin' });
              }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> {t.autoLoginAdmin}
            </button>
            <button
              onClick={() => {
                setUser({ email: 'compliance@stoicfx.com', full_name: 'Compliance Officer', role: 'compliance_officer' });
              }}
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              {t.autoLoginCO}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-[#151D30]/65 backdrop-blur-md border-b border-gray-850 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
            <Shield className="w-5.5 h-5.5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">{t.title}</span>
              <span className="text-[10px] bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-500/10 uppercase">Compliance</span>
              <span className="text-[10px] text-gray-500 font-bold ml-1">v1.3.0</span>
            </div>
            <p className="text-xs text-gray-400">{t.subTitle}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-[#0B0F19]/90 border border-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> {t.dashboard}
          </button>
          <button
            onClick={() => setActiveTab('universe')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'universe' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> {t.universe}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'calendar' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" /> {t.calendar}
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'evidence' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> {lang === 'es' ? 'Evidencias' : 'Evidence'}
          </button>
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all relative ${
              activeTab === 'intelligence' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> {lang === 'es' ? 'Inteligencia D8' : 'D8 Intelligence'}
            {changes.filter(c => c.status === 'Unreviewed').length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-[#0B0F19]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('maturity')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'maturity' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> {lang === 'es' ? 'Madurez CMMI' : 'CMMI Maturity'}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'reports' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> {lang === 'es' ? 'Informes' : 'Reports'}
          </button>
        </nav>

        {/* User profile dropdown & health state */}
        <div className="flex items-center gap-3">
          {/* Simulated Role Switcher (Development Mode) */}
          {user && (
            <div className="flex items-center gap-1.5 bg-[#151D30] border border-amber-500/25 rounded-lg px-2.5 py-1.5 text-xs shadow-md">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={user.role}
                onChange={(e) => {
                  const r = e.target.value;
                  setUser({
                    email: r === 'admin' ? 'mauro@stoicfx.com' : r === 'compliance_officer' ? 'compliance@stoicfx.com' : 'member@stoicfx.com',
                    full_name: r === 'admin' ? 'Mauro Serrano' : r === 'compliance_officer' ? 'Compliance Officer' : 'Team Member',
                    role: r
                  });
                }}
                className="bg-transparent border-none text-amber-400 focus:outline-none cursor-pointer font-bold text-xs"
              >
                <option value="admin" className="bg-[#151D30] text-white">Rol: Admin</option>
                <option value="compliance_officer" className="bg-[#151D30] text-white">Rol: Compliance Officer</option>
                <option value="team_member" className="bg-[#151D30] text-white">Rol: Team Member</option>
              </select>
            </div>
          )}

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-[#151D30] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs shadow">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as 'es' | 'en')}
              className="bg-transparent border-none text-gray-300 focus:outline-none cursor-pointer font-semibold text-xs"
            >
              <option value="es" className="bg-[#151D30]">Español</option>
              <option value="en" className="bg-[#151D30]">English</option>
            </select>
          </div>

          {/* API Health indicator */}
          <div className="flex items-center gap-2 bg-[#151D30] border border-gray-800 rounded-full px-3 py-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-gray-400 font-medium">{apiOnline ? t.apiHealthConnected : t.apiHealthLocal}</span>
          </div>

          <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white">{user.full_name}</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">{user.role}</span>
            </div>
            <button
              onClick={() => setUser(null)}
              className="p-2 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
              title={t.logout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 relative overflow-x-hidden">
        {/* Glow Backdrop */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

        {/* TAB 1: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top row cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Compliance Rate Progress Card */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.complianceRate}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold text-white">{complianceRate}%</span>
                  <span className="text-xs text-gray-400">{t.target}: ≥95%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${complianceRate}%` }} 
                  />
                </div>
              </div>

              {/* At Risk Obligations */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.atRisk}</span>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold text-white">{atRiskCount}</span>
                  <span className="text-xs text-amber-400">{t.attentionRequired}</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 font-medium">
                  {lang === 'es' ? 'Controles con plazos críticos cercanos' : 'Controls with approaching deadlines'}
                </p>
              </div>

              {/* Overdue Obligations */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.overdue}</span>
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold text-white">{overdueCount}</span>
                  <span className="text-xs text-red-400">{t.actionRequired}</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 font-medium">
                  {lang === 'es' ? 'Requieren justificación / actualización' : 'Require justification or updates'}
                </p>
              </div>

              {/* Maturity Level Global Indicator */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.maturityLevel}</span>
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold text-white">
                    {(Object.values(domainMaturity).reduce((a, b) => a + b, 0) / DOMAIN_IDS.length).toFixed(1)}
                  </span>
                  <span className="text-xs text-blue-400">CMMI: ≥3.0</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 font-medium">{t.avgDomains}</p>
              </div>
            </div>

            {/* Radar chart & critical lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Maturity Score Radar Panel */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 lg:col-span-1 flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-white">{t.radarTitle}</h3>
                  <span className="text-xs text-gray-400">CMMI (0-5)</span>
                </div>
                <RadarChart />
              </div>

              {/* Next due tasks & active warnings */}
              <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 lg:col-span-2 space-y-4">
                <h3 className="font-bold text-base text-white">{t.nextDue}</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">{t.noEvents}</div>
                  ) : (
                    events.slice(0, 5).map(e => (
                      <div 
                        key={e.control_id}
                        className="bg-[#0B0F19] border border-gray-850 hover:border-gray-800 rounded-lg p-4 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            e.color === 'red' ? 'bg-red-500' : e.color === 'yellow' ? 'bg-amber-400' : 'bg-emerald-500'
                          }`} />
                          <div>
                            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">{e.control_id} · {e.jurisdiction}</span>
                            <h4 className="text-sm font-semibold text-white mt-0.5 line-clamp-1">{e.description}</h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-xs text-gray-400 block">{t.dueDate}</span>
                            <span className="text-sm font-bold text-gray-200">{e.due_date}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-md text-xs font-semibold ${
                            e.color === 'red' ? 'bg-red-500/10 text-red-400' : e.color === 'yellow' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {e.days_remaining < 0 
                              ? `${t.overdueAlert} ${Math.abs(e.days_remaining)} d` 
                              : e.days_remaining === 0 
                              ? t.today 
                              : `${t.daysRemainingAlert} ${e.days_remaining} ${t.daysRemaining}`
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGULATORY UNIVERSE */}
        {activeTab === 'universe' && (
          <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 space-y-6 animate-fadeIn">
            {/* Filter bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-850 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Jurisdiction filter */}
                <div className="flex items-center gap-1.5 bg-[#0B0F19] border border-gray-800 rounded-lg p-1">
                  {['All', 'FSCA', 'FSC Mauritius'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilterJurisdiction(opt)}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                        filterJurisdiction === opt 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {opt === 'All' ? t.allJurisdictions : opt}
                    </button>
                  ))}
                </div>

                {/* Domain filter */}
                <select
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className="bg-[#0B0F19] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">{t.allDomains}</option>
                  <option value="D1">D1 — {lang === 'es' ? 'Licenciamiento y gobierno corporativo' : 'Licensing & corporate governance'}</option>
                  <option value="D2">D2 — {lang === 'es' ? 'Solidez financiera y capital' : 'Financial soundness & capital'}</option>
                  <option value="D3">D3 — {lang === 'es' ? 'KYC / AML / CFT' : 'KYC / AML / CFT'}</option>
                  <option value="D4">D4 — {lang === 'es' ? 'Protección al cliente' : 'Client protection'}</option>
                  <option value="D5">D5 — {lang === 'es' ? 'Formación del equipo' : 'Staff training & competence'}</option>
                  <option value="D6">D6 — {lang === 'es' ? 'Reportes periódicos' : 'Regulatory reporting'}</option>
                  <option value="D7">D7 — {lang === 'es' ? 'Tecnología y ciberseguridad' : 'Technology & cybersecurity'}</option>
                  <option value="D8">D8 — {lang === 'es' ? 'Vigilancia normativa' : 'Regulatory monitoring'}</option>
                </select>

                {/* Status filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#0B0F19] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">{t.allStatuses}</option>
                  <option value="Compliant">Compliant</option>
                  <option value="En progreso">{t.inProgress}</option>
                  <option value="En riesgo">{t.atRiskStatus}</option>
                  <option value="Incumplido">{t.nonCompliant}</option>
                </select>
              </div>

              {/* Control stats */}
              <div className="text-xs text-gray-400 font-medium">
                {t.showing} <span className="text-white font-bold">{filteredControls.length}</span> {t.of} <span className="text-white font-bold">{controls.length}</span> {t.obligations}
              </div>
            </div>

            {/* Universe Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-850">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B0F19] border-b border-gray-850 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-4">{lang === 'es' ? 'Jurisdicción' : 'Jurisdiction'}</th>
                    <th className="py-4 px-4 w-1/3">{lang === 'es' ? 'Obligación / Descripción' : 'Obligation / Description'}</th>
                    <th className="py-4 px-4">{lang === 'es' ? 'Norma' : 'Regulation'}</th>
                    <th className="py-4 px-4">{lang === 'es' ? 'Estado' : 'Status'}</th>
                    <th className="py-4 px-4">{lang === 'es' ? 'Madurez CMMI' : 'CMMI Maturity'}</th>
                    <th className="py-4 px-4 text-right">{lang === 'es' ? 'Acción' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 text-xs text-gray-300">
                  {filteredControls.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-500 font-medium">
                        {lang === 'es' ? 'Ningún control coincide con los filtros seleccionados.' : 'No controls match the selected filters.'}
                      </td>
                    </tr>
                  ) : (
                    DOMAIN_IDS.map(domainId => {
                      const domainControls = filteredControls.filter(c => c.domain.startsWith(domainId));
                      if (domainControls.length === 0) return null;

                      // Calculate average maturity for these controls
                      const sum = domainControls.reduce((acc, c) => acc + c.maturity_level, 0);
                      const avgMaturity = (sum / domainControls.length).toFixed(1);
                      
                      // Get Domain Display Name
                      let domainName = "";
                      if (domainId === 'D1') domainName = lang === 'es' ? 'D1 — Licenciamiento y gobierno corporativo' : 'D1 — Licensing & Corporate Governance';
                      else if (domainId === 'D2') domainName = lang === 'es' ? 'D2 — Solidez financiera y capital' : 'D2 — Financial Soundness & Capital';
                      else if (domainId === 'D3') domainName = lang === 'es' ? 'D3 — KYC / AML / CFT' : 'D3 — KYC / AML / CFT';
                      else if (domainId === 'D4') domainName = lang === 'es' ? 'D4 — Protección al cliente' : 'D4 — Client Protection';
                      else if (domainId === 'D5') domainName = lang === 'es' ? 'D5 — Formación del equipo' : 'D5 — Staff Training & Competence';
                      else if (domainId === 'D6') domainName = lang === 'es' ? 'D6 — Reportes periódicos' : 'D6 — Regulatory Reporting';
                      else if (domainId === 'D7') domainName = lang === 'es' ? 'D7 — Tecnología y ciberseguridad' : 'D7 — Technology & Cybersecurity';
                      else if (domainId === 'D8') domainName = lang === 'es' ? 'D8 — Vigilancia normativa' : 'D8 — Regulatory Change Monitoring';

                      const isCollapsed = !!collapsedDomains[domainId];

                      return (
                        <React.Fragment key={domainId}>
                          {/* Group Header Row */}
                          <tr 
                            onClick={() => toggleDomainCollapse(domainId)}
                            className="bg-[#151D30]/90 border-b border-gray-800 hover:bg-[#1E293B] cursor-pointer transition-colors select-none"
                          >
                            <td colSpan={7} className="py-3 px-4 font-bold text-sm text-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={`transition-transform duration-200 transform ${isCollapsed ? '-rotate-90' : ''}`}>
                                    <ChevronDown className="w-4 h-4 text-blue-400" />
                                  </span>
                                  <span>{domainName}</span>
                                  <span className="text-xs text-gray-400 font-normal">
                                    ({domainControls.length} {lang === 'es' ? 'controles' : 'controls'})
                                  </span>
                                </div>
                                <div className="text-xs font-semibold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/10">
                                  {lang === 'es' ? 'Madurez promedio' : 'Average maturity'}: {avgMaturity}
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Individual Controls Rows */}
                          {!isCollapsed && domainControls.map((c) => (
                            <tr key={c.id} className="hover:bg-[#1C2841]/40 transition-colors">
                              <td className="py-4 px-4 font-bold text-blue-400">{c.id}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  c.jurisdiction === 'FSCA' 
                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/25' 
                                    : c.jurisdiction === 'FSC Mauritius'
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                }`}>
                                  {c.jurisdiction === 'FSCA' ? t.fsca : c.jurisdiction === 'FSC Mauritius' ? t.fsc : t.both}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-semibold text-white">{lang === 'es' ? c.description : c.descriptionEn}</div>
                                <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">
                                  {lang === 'es' ? 'Evidencia' : 'Evidence'}: {lang === 'es' ? c.required_evidence : c.required_evidenceEn}
                                </div>
                              </td>
                              <td className="py-4 px-4 font-medium text-gray-400">{c.source_regulation}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center w-max gap-1 ${
                                  c.status === 'Compliant' 
                                    ? 'bg-emerald-500/10 text-emerald-400' 
                                    : c.status === 'En progreso'
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : c.status === 'En riesgo'
                                    ? 'bg-amber-500/10 text-amber-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                  {c.status === 'En progreso' ? t.inProgress : c.status === 'En riesgo' ? t.atRiskStatus : c.status === 'Incumplido' ? t.nonCompliant : t.compliant}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5">
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span 
                                        key={star} 
                                        className={`w-1.5 h-3 rounded-sm ${
                                          star <= c.maturity_level ? 'bg-blue-500' : 'bg-gray-800'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="font-bold text-gray-200">Lvl {c.maturity_level}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <button
                                  onClick={() => handleOpenAssess(c)}
                                  className="bg-[#0B0F19] hover:bg-blue-600 border border-gray-800 hover:border-blue-500 text-gray-300 hover:text-white px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all active:scale-95"
                                >
                                  {t.evalButton}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-850 pb-5">
              <div>
                <h3 className="font-bold text-lg text-white">{lang === 'es' ? 'Cronograma de Vencimientos' : 'Deadlines Schedule'}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {lang === 'es' ? 'Línea de tiempo de plazos obligatorios ordenados por proximidad' : 'Timeline of mandatory deadlines ordered by proximity'}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.compliant}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> {lang === 'es' ? 'Por Vencer (≤30 días)' : 'Upcoming (≤30 days)'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> {lang === 'es' ? 'Riesgo / Vencido' : 'Risk / Overdue'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500 font-medium">{t.noEvents}</div>
              ) : (
                events.map((e) => (
                  <div 
                    key={e.control_id}
                    className={`bg-[#0B0F19] border ${
                      e.color === 'red' ? 'border-red-500/35 hover:border-red-500/60' : e.color === 'yellow' ? 'border-amber-500/35 hover:border-amber-500/60' : 'border-gray-850 hover:border-gray-750'
                    } rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:shadow-lg`}
                  >
                    {/* Corner accent glow */}
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full pointer-events-none opacity-10 ${
                      e.color === 'red' ? 'bg-red-500' : e.color === 'yellow' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-blue-400">{e.control_id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        e.jurisdiction === 'FSCA' 
                          ? 'bg-purple-500/10 text-purple-400' 
                          : e.jurisdiction === 'FSC Mauritius'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {e.jurisdiction === 'FSCA' ? t.fsca : e.jurisdiction === 'FSC Mauritius' ? t.fsc : t.both}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white leading-snug line-clamp-2 h-10 mb-4">{e.description}</h4>

                    <div className="border-t border-gray-850 pt-4 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">{t.dueDate}</span>
                        <span className="text-xs font-bold text-gray-200">{e.due_date}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">{lang === 'es' ? 'Acción' : 'Status'}</span>
                        <span className={`text-xs font-bold ${
                          e.color === 'red' ? 'text-red-400 animate-pulse' : e.color === 'yellow' ? 'text-amber-400 font-semibold' : 'text-emerald-400'
                        }`}>
                          {e.days_remaining < 0 
                            ? `${t.overdueAlert} ${Math.abs(e.days_remaining)}d` 
                            : e.days_remaining === 0 
                            ? t.today 
                            : `${t.daysRemainingAlert} ${e.days_remaining} ${t.daysRemaining}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <EvidenceRepository 
            lang={lang}
            user={user}
            apiOnline={apiOnline}
            controls={controls}
            evidences={evidences}
            setEvidences={setEvidences}
            onUpdateControls={fetchControlsFromBackend}
          />
        )}

        {activeTab === 'intelligence' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Stats/Actions Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 shadow-lg">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5.5 h-5.5 text-blue-400" />
                  {lang === 'es' ? 'Vigilancia e Inteligencia Normativa (D8)' : 'Regulatory Surveillance & Intelligence (D8)'}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {lang === 'es' 
                    ? 'Monitoreo automatizado de cambios legislativos en la FSCA (Sudáfrica) y la FSC (Mauritius).' 
                    : 'Automated monitoring of legislative changes at the FSCA (South Africa) and FSC (Mauritius).'}
                </p>
              </div>
              <button
                onClick={async () => {
                  setIsScanning(true);
                  if (apiOnline) {
                    try {
                      const res = await fetch(`${API_BASE_URL}/api/cron/monitor-d8`, { method: 'POST' });
                      if (res.ok) {
                        await fetchChangesFromBackend();
                      }
                    } catch (err) {
                      console.error("Monitor execution failed:", err);
                    }
                  } else {
                    // Simulate local scan
                    setTimeout(() => {
                      const mockChanges = [
                        {
                          id: 'mock-1',
                          title: 'FSCA Board Notice: Amendment of Continuous Professional Development (CPD) Guidelines',
                          jurisdiction: 'FSCA',
                          source_url: 'https://www.fsca.co.za/Regulatory%20Frameworks/Pages/Board-Notices.aspx',
                          summary: 'The FSCA has published an amendment regarding the submission process for CPD hours. FSPs are now required to maintain digital certificates on record for at least 5 years and report via the new online portal by June 15th annually.',
                          impact_level: 'Medium',
                          status: 'Unreviewed',
                          affects_controls: ['D5-F01'],
                          detected_at: new Date().toISOString(),
                          created_at: new Date().toISOString(),
                          updated_at: new Date().toISOString()
                        },
                        {
                          id: 'mock-2',
                          title: 'FSC Mauritius Circular: New Capital Adequacy Requirements for OTC Derivative Dealers',
                          jurisdiction: 'FSC Mauritius',
                          source_url: 'https://www.fscmauritius.org/en/regulatory-framework/circulars',
                          summary: 'New regulatory directives mandate Investment Dealers (including Full Service Dealers) to maintain an increased minimum unimpaired capital requirement and submit a revised quarterly Capital Adequacy Return starting next quarter.',
                          impact_level: 'High',
                          status: 'Unreviewed',
                          affects_controls: ['D2-M01', 'D6-M01'],
                          detected_at: new Date().toISOString(),
                          created_at: new Date().toISOString(),
                          updated_at: new Date().toISOString()
                        }
                      ];
                      setChanges(prev => {
                        const existing = new Set(prev.map(c => c.title));
                        const added = mockChanges.filter(c => !existing.has(c.title));
                        return [...added, ...prev];
                      });
                    }, 1200);
                  }
                  setTimeout(() => setIsScanning(false), 1200);
                }}
                disabled={isScanning}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-95 animate-pulse"
              >
                <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning 
                  ? (lang === 'es' ? 'Escaneando Sitios...' : 'Scanning Portals...') 
                  : (lang === 'es' ? 'Ejecutar Monitoreo Normativo' : 'Run Regulatory Scan')}
              </button>
            </div>

            {/* Split Screen list & detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Panel: Changes list */}
              <div className="lg:col-span-5 bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-5 shadow-lg space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-gray-800 pb-3">
                  <span>{lang === 'es' ? 'Alertas Detectadas' : 'Detected Alerts'}</span>
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {changes.length} Total
                  </span>
                </h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {changes.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm">
                      <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      {lang === 'es' ? 'No se han detectado alertas normativas aún. Ejecute un escaneo.' : 'No regulatory alerts detected yet. Run a scan.'}
                    </div>
                  ) : (
                    changes.map(change => {
                      const isUnreviewed = change.status === 'Unreviewed';
                      const isHigh = change.impact_level === 'High';
                      const isMedium = change.impact_level === 'Medium';
                      
                      return (
                        <div
                          key={change.id}
                          onClick={() => {
                            setSelectedChange(change);
                            setActionTakenText(change.action_taken || '');
                            setAffectedControlsSelected(change.affects_controls || []);
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                            selectedChange?.id === change.id
                              ? 'bg-blue-500/10 border-blue-500 shadow-md animate-pulse'
                              : 'bg-[#0B0F19]/60 hover:bg-[#0B0F19] border-gray-850'
                          }`}
                        >
                          {/* Top indicator color */}
                          <div className={`absolute top-0 left-0 w-1.5 h-full ${
                            isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-blue-400'
                          }`} />

                          <div className="flex items-start justify-between gap-2 pl-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded">
                              {change.jurisdiction}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {isUnreviewed && (
                                <span className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                                  {lang === 'es' ? 'Nuevo' : 'New'}
                                </span>
                              )}
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isHigh 
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/10' 
                                  : isMedium 
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' 
                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/10'
                              }`}>
                                {change.impact_level}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-sm font-semibold text-white mt-2 pl-2 line-clamp-2">
                            {change.title}
                          </h4>
                          
                          <p className="text-xs text-gray-400 mt-2 pl-2 line-clamp-2">
                            {change.summary}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-gray-500 mt-3 pl-2 border-t border-gray-850/60 pt-2">
                            <span>{new Date(change.detected_at).toLocaleDateString()}</span>
                            <span>{change.status === 'Reviewed' ? (lang === 'es' ? 'Revisado' : 'Reviewed') : (lang === 'es' ? 'Pendiente' : 'Pending')}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Panel: Change Details & Review Form */}
              <div className="lg:col-span-7 bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg">
                {selectedChange ? (
                  <div className="space-y-5">
                    <div className="flex items-start justify-between border-b border-gray-800 pb-4">
                      <div>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                          {selectedChange.jurisdiction}
                        </span>
                        <h3 className="text-lg font-bold text-white">{selectedChange.title}</h3>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        selectedChange.impact_level === 'High' 
                          ? 'bg-red-500/15 text-red-400 border border-red-500/10' 
                          : selectedChange.impact_level === 'Medium' 
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/10' 
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/10'
                      }`}>
                        {lang === 'es' ? 'Impacto' : 'Impact'}: {selectedChange.impact_level}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Summary */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                          {lang === 'es' ? 'Resumen Normativo' : 'Regulatory Summary'}
                        </span>
                        <p className="text-sm text-gray-200 leading-relaxed bg-[#0B0F19]/40 p-4 rounded-xl border border-gray-850">
                          {selectedChange.summary}
                        </p>
                      </div>

                      {/* Source URL */}
                      {selectedChange.source_url && (
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                            {lang === 'es' ? 'Enlace Oficial' : 'Official Source Link'}
                          </span>
                          <a 
                            href={selectedChange.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 font-medium hover:underline break-all inline-flex items-center gap-1 bg-[#0B0F19]/30 px-3 py-2 rounded-lg border border-gray-850"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            {selectedChange.source_url}
                          </a>
                        </div>
                      )}

                      {/* Affected Controls */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                          {lang === 'es' ? 'Controles del Universo Afectados' : 'Affected Regulatory Controls'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {affectedControlsSelected.length === 0 ? (
                            <span className="text-xs text-gray-500 italic">{lang === 'es' ? 'Ningún control vinculado' : 'No controls linked'}</span>
                          ) : (
                            affectedControlsSelected.map(cid => (
                              <span key={cid} className="text-xs bg-blue-500/15 text-blue-300 border border-blue-500/25 rounded px-2.5 py-1 font-bold">
                                {cid}
                              </span>
                            ))
                          )}
                        </div>

                        {selectedChange.status === 'Unreviewed' && user.role !== 'team_member' && (
                          <div className="grid grid-cols-4 gap-2 mt-2 bg-[#0B0F19]/40 p-3 rounded-xl border border-gray-850 max-h-[140px] overflow-y-auto">
                            {controls.map(c => {
                              const isChecked = affectedControlsSelected.includes(c.id);
                              return (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setAffectedControlsSelected(prev => prev.filter(id => id !== c.id));
                                    } else {
                                      setAffectedControlsSelected(prev => [...prev, c.id]);
                                    }
                                  }}
                                  className={`px-2 py-1.5 text-left text-xs font-bold rounded-lg border transition-all truncate ${
                                    isChecked
                                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                                      : 'bg-[#0B0F19] border-gray-800 text-gray-400 hover:text-white'
                                  }`}
                                  title={lang === 'es' ? c.description : c.descriptionEn}
                                >
                                  {c.id}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Action Taken */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                          {lang === 'es' ? 'Acciones a tomar / Impacto en Stoic FX' : 'Actions Taken / Impact on Stoic FX'}
                        </span>
                        {selectedChange.status === 'Reviewed' ? (
                          <p className="text-sm text-gray-300 bg-[#0B0F19]/40 p-4 rounded-xl border border-gray-850 italic">
                            {selectedChange.action_taken}
                          </p>
                        ) : (
                          user.role === 'team_member' ? (
                            <span className="text-xs text-gray-500 italic">
                              {lang === 'es' ? 'Requiere rol Administrador o Compliance Officer para redactar medidas.' : 'Requires Admin or Compliance Officer role to outline action taken.'}
                            </span>
                          ) : (
                            <textarea
                              rows={3}
                              placeholder={lang === 'es' ? 'Ej: Se requiere actualizar la política de CPD (D5-F01) y solicitar reporte a los KIs...' : 'e.g., Update CPD policy (D5-F01) and request certification from KIs...'}
                              value={actionTakenText}
                              onChange={(e) => setActionTakenText(e.target.value)}
                              className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 focus:outline-none rounded-xl p-3 text-sm text-white transition-colors"
                            />
                          )
                        )}
                      </div>

                      {/* Submit review */}
                      {selectedChange.status === 'Unreviewed' && user.role !== 'team_member' && (
                        <button
                          onClick={async () => {
                            const payload = {
                              action_taken: actionTakenText || 'Revisado y analizado por el oficial de cumplimiento.',
                              affects_controls: affectedControlsSelected
                            };
                            
                            if (apiOnline) {
                              try {
                                const res = await fetch(`${API_BASE_URL}/api/intelligence/changes/${selectedChange.id}/review`, {
                                  method: 'PUT',
                                  headers: { 
                                    'Content-Type': 'application/json',
                                    'X-Simulated-Role': user.role,
                                    'X-Simulated-User': user.email
                                  },
                                  body: JSON.stringify(payload)
                                });
                                if (res.ok) {
                                  const updated = await res.json();
                                  setChanges(prev => prev.map(c => c.id === updated.id ? updated : c));
                                  setSelectedChange(updated);
                                  // Update affected controls status local sync
                                  fetchControlsFromBackend();
                                }
                              } catch (err) {
                                console.error("Failed to submit review:", err);
                              }
                            } else {
                              // Local sync
                              setChanges(prev => prev.map(c => {
                                if (c.id === selectedChange.id) {
                                  return {
                                    ...c,
                                    status: 'Reviewed',
                                    action_taken: payload.action_taken,
                                    affects_controls: payload.affects_controls,
                                    updated_at: new Date().toISOString()
                                  };
                                }
                                return c;
                              }));
                              
                              // Change status of local controls
                              if (payload.affects_controls.length > 0) {
                                setControls(prev => prev.map(ctrl => {
                                  if (payload.affects_controls.includes(ctrl.id)) {
                                    return {
                                      ...ctrl,
                                      status: 'En riesgo',
                                      notes: `Afectado por cambio regulatorio: ${selectedChange.title}. Requiere revisión.`
                                    };
                                  }
                                  return ctrl;
                                }));
                              }
                              
                              setSelectedChange((prev: any) => ({
                                ...prev,
                                status: 'Reviewed',
                                action_taken: payload.action_taken,
                                affects_controls: payload.affects_controls,
                                updated_at: new Date().toISOString()
                              }));
                            }
                          }}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
                        >
                          {lang === 'es' ? 'Marcar como Revisado y Aplicar a Controles' : 'Mark as Reviewed & Link to Controls'}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-gray-500 italic">
                    <Sparkles className="w-12 h-12 text-gray-600 mb-3" />
                    {lang === 'es' ? 'Seleccione una alerta de la lista para ver su detalle y realizar el análisis' : 'Select an alert from the list to view details and perform analysis'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maturity' && (
          <MaturityAssessment
            lang={lang}
            user={user}
            controls={controls}
            onUpdateControl={async (controlId, payload) => {
              if (apiOnline) {
                try {
                  const res = await fetch(`${API_BASE_URL}/api/controls/${controlId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    setControls(prev => prev.map(c => {
                      if (c.id === updated.id) {
                        return {
                          ...c,
                          status: updated.status,
                          maturity_level: updated.maturity_level,
                          maturity_justification: lang === 'es' ? updated.maturity_justification : c.maturity_justification,
                          maturity_justificationEn: lang === 'en' ? updated.maturity_justification : c.maturity_justificationEn,
                          notes: updated.notes,
                          last_reviewed: updated.last_reviewed
                        };
                      }
                      return c;
                    }));
                  }
                } catch (err) {
                  console.error("Failed to update control from CMMI audit", err);
                }
              } else {
                setControls(prev => prev.map(c => {
                  if (c.id === controlId) {
                    return {
                      ...c,
                      status: payload.status,
                      maturity_level: payload.maturity_level,
                      maturity_justification: lang === 'es' ? payload.maturity_justification : c.maturity_justification,
                      maturity_justificationEn: lang === 'en' ? payload.maturity_justification : c.maturity_justificationEn,
                      notes: payload.notes || c.notes,
                      last_reviewed: new Date().toISOString().split('T')[0]
                    };
                  }
                  return c;
                }));
              }
            }}
          />
        )}

        {activeTab === 'reports' && (
          <AuditReport
            lang={lang}
            controls={controls}
            domainMaturity={domainMaturity}
          />
        )}
      </main>

      {/* ASSESSMENT DRAWER / SIDEBAR (SLIDES FROM RIGHT) */}
      {isDrawerOpen && selectedControl && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-md bg-[#151D30] border-l border-gray-850 shadow-2xl flex flex-col h-full animate-slideIn">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-850 flex items-center justify-between bg-[#0B0F19]/40">
              <div>
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{selectedControl.id} · {selectedControl.jurisdiction}</span>
                <h3 className="font-bold text-base text-white mt-1">{t.assessTitle}</h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-white text-lg p-2 rounded-lg hover:bg-gray-800/40"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Obligation details info box */}
              <div className="bg-[#0B0F19] border border-gray-850 rounded-xl p-4 space-y-3">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{t.sourceReg}</span>
                  <span className="text-xs text-gray-300 font-semibold">{selectedControl.source_regulation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{t.description}</span>
                  <span className="text-xs text-white leading-relaxed">{lang === 'es' ? selectedControl.description : selectedControl.descriptionEn}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{t.evidenceReq}</span>
                  <span className="text-xs text-gray-300 italic">{lang === 'es' ? selectedControl.required_evidence : selectedControl.required_evidenceEn}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{lang === 'es' ? 'Estado de Cumplimiento' : 'Compliance Status'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'Compliant', color: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/5' },
                    { val: 'En progreso', color: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/5' },
                    { val: 'En riesgo', color: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/5' },
                    { val: 'Incumplido', color: 'border-red-500/30 text-red-400 hover:bg-red-500/5' }
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setEditStatus(s.val as any)}
                      className={`border rounded-lg py-2.5 px-3 text-xs font-semibold text-center transition-colors ${
                        editStatus === s.val 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : `bg-[#0B0F19] ${s.color}`
                      }`}
                    >
                      {s.val === 'En progreso' ? t.inProgress : s.val === 'En riesgo' ? t.atRiskStatus : s.val === 'Incumplido' ? t.nonCompliant : t.compliant}
                    </button>
                  ))}
                </div>
              </div>

              {/* Maturity Score Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{lang === 'es' ? 'Nivel de Madurez (CMMI)' : 'Maturity Level (CMMI)'}</label>
                  <span className="text-sm font-extrabold text-blue-400">Lvl {editMaturity}</span>
                </div>
                
                {/* 0 to 5 slider */}
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={editMaturity}
                  onChange={(e) => setEditMaturity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                {/* Legend describing selected level */}
                <div className="bg-[#0B0F19] border border-gray-850 p-3.5 rounded-lg">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    {t.cmmiLevels[editMaturity]}
                  </span>
                  <span className="text-xs text-gray-400 leading-relaxed block mt-1">
                    {t.cmmiDescriptions[editMaturity]}
                  </span>
                </div>
              </div>

              {/* Maturity Justification */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{t.justification}</label>
                <textarea
                  value={editJustification}
                  onChange={(e) => setEditJustification(e.target.value)}
                  placeholder={lang === 'es' ? "Detalla brevemente por qué consideras que el control tiene este nivel..." : "Briefly describe why you consider the control is at this level..."}
                  rows={3}
                  className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Evidence Documents List */}
              <div className="space-y-3 pt-4 border-t border-gray-850">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {lang === 'es' ? 'Evidencias del Control' : 'Control Evidence Files'}
                </label>
                
                {/* Evidences list */}
                <div className="space-y-2">
                  {evidences.filter(ev => ev.control_id === selectedControl.id).length === 0 ? (
                    <p className="text-xs text-gray-500 italic">
                      {lang === 'es' ? 'No hay evidencias cargadas para este control.' : 'No evidence uploaded for this control.'}
                    </p>
                  ) : (
                    evidences.filter(ev => ev.control_id === selectedControl.id).map(ev => {
                      const statusColors: Record<string, string> = {
                        Pending: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
                        Approved: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
                        Rejected: 'text-red-400 bg-red-500/10 border border-red-500/20',
                      };
                      return (
                        <div key={ev.id} className="flex items-center justify-between p-2.5 bg-[#0B0F19] border border-gray-850 rounded-lg text-xs">
                          <div className="flex flex-col truncate max-w-[70%]">
                            <span className="text-white font-semibold truncate" title={ev.file_name}>{ev.file_name}</span>
                            <span className="text-[10px] text-gray-550 block mt-0.5">
                              {new Date(ev.created_at).toLocaleDateString()} · {ev.uploaded_by_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${statusColors[ev.status] || ''}`}>
                              {lang === 'es' ? (ev.status === 'Pending' ? 'Pendiente' : ev.status === 'Approved' ? 'Aprobada' : 'Rechazada') : ev.status}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (apiOnline) {
                                  window.open(`${API_BASE_URL}/api/evidence/download/${ev.id}`, '_blank');
                                } else {
                                  alert(lang === 'es' ? 'Descarga simulada en modo local.' : 'Simulated download in local mode.');
                                }
                              }}
                              className="p-1 text-gray-400 hover:text-white"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Inline upload input */}
                <div className="bg-[#0B0F19]/40 border border-gray-850/60 rounded-xl p-3 space-y-2 mt-2">
                  <span className="text-[10px] font-bold text-gray-450 block">
                    {lang === 'es' ? 'Cargar Nueva Evidencia' : 'Upload New Evidence'}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="drawer-file-upload"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const formData = new FormData();
                          formData.append('control_id', selectedControl.id);
                          formData.append('file', file);
                          
                          const headers: Record<string, string> = {};
                          if (user) {
                            headers['X-Simulated-Role'] = user.role;
                            headers['X-Simulated-User'] = user.email;
                          }

                          if (apiOnline) {
                            try {
                              const res = await fetch(`${API_BASE_URL}/api/evidence/upload`, {
                                method: 'POST',
                                headers: headers,
                                body: formData
                              });
                              if (res.ok) {
                                fetchEvidencesFromBackend();
                                fetchControlsFromBackend();
                              } else {
                                const err = await res.json();
                                alert(`Error: ${err.detail}`);
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          } else {
                            // Local mock
                            const fileId = Math.random().toString(36).substring(2, 9);
                            const mockEv = {
                              id: fileId,
                              control_id: selectedControl.id,
                              file_name: file.name,
                              file_path: `mock_storage/${file.name}`,
                              uploaded_by: user?.email || 'mauro@stoicfx.com',
                              uploaded_by_name: user?.full_name || 'Mauro Serrano',
                              approved_by: null,
                              approved_by_name: null,
                              status: 'Pending',
                              validity_date: null,
                              notes: 'Direct drawer upload',
                              created_at: new Date().toISOString(),
                              updated_at: new Date().toISOString()
                            };
                            setEvidences(prev => [mockEv, ...prev]);
                            selectedControl.status = 'En progreso';
                            selectedControl.evidence_file_path = mockEv.file_path;
                            setEditStatus('En progreso');
                          }
                        }
                      }}
                    />
                    <label
                      htmlFor="drawer-file-upload"
                      className="flex-1 bg-[#0B0F19] hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg py-2 text-center text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      {lang === 'es' ? 'Seleccionar archivo' : 'Select file'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{t.notes}</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder={lang === 'es' ? "Observaciones adicionales..." : "Additional comments..."}
                  rows={2}
                  className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-gray-850 bg-[#0B0F19]/40 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-1/2 bg-[#0B0F19] hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-lg py-2.5 text-xs font-semibold transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleSaveAssessment}
                className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 text-xs font-semibold transition-colors active:scale-95 shadow-md"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
