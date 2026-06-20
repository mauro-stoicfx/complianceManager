import { useState } from 'react';
import { Award, TrendingUp, AlertCircle, HelpCircle, Save, CheckCircle2 } from 'lucide-react';
import { Control } from '../controls_data';

interface MaturityAssessmentProps {
  lang: 'es' | 'en';
  user: { role: string } | null;
  controls: Control[];
  onUpdateControl: (controlId: string, payload: any) => Promise<void>;
}

const DOMAIN_IDS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'];
const CMMI_LEVELS = [0, 1, 2, 3, 4, 5];

const LEVEL_NAMES = {
  es: [
    'Nivel 0: Inexistente',
    'Nivel 1: Inicial',
    'Nivel 2: Definido',
    'Nivel 3: Implementado',
    'Nivel 4: Medido',
    'Nivel 5: Optimizado'
  ],
  en: [
    'Level 0: Non-existent',
    'Level 1: Initial',
    'Level 2: Defined',
    'Level 3: Implemented',
    'Level 4: Measured',
    'Level 5: Optimized'
  ]
};

const ACTION_SUGGESTIONS = {
  es: {
    0: 'El control no existe. Diseñar e implementar políticas inmediatamente.',
    1: 'El proceso depende de una sola persona. Documentar procedimientos por escrito y asignar responsables formales.',
    2: 'Existe un procedimiento escrito. Ejecutar de forma consistente y guardar bitácoras de evidencia.',
    3: 'El proceso es robusto. Establecer métricas o indicadores clave (KPIs) para medir su efectividad.',
    4: 'El proceso se mide. Implementar ciclos de mejora continua y revisiones trimestrales basadas en datos.',
  },
  en: {
    0: 'Control does not exist. Design and implement policies immediately.',
    1: 'Process depends on a single person. Document procedures in writing and assign formal responsibilities.',
    2: 'Written procedure exists. Execute consistently and maintain historical evidence logs.',
    3: 'Process is robust. Establish metrics or key performance indicators (KPIs) to measure effectiveness.',
    4: 'Process is measured. Implement continuous improvement loops and data-driven quarterly reviews.',
  }
};

export default function MaturityAssessment({ lang, user, controls, onUpdateControl }: MaturityAssessmentProps) {
  const [selectedCell, setSelectedCell] = useState<{ domainId: string; level: number } | null>(null);
  const [editingControlId, setEditingControlId] = useState<string | null>(null);
  
  // Form states for auditing
  const [auditLevel, setAuditLevel] = useState<number>(1);
  const [auditTarget, setAuditTarget] = useState<number>(3);
  const [auditJustification, setAuditJustification] = useState('');
  const [auditNotes, setAuditNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Group controls by Domain ID prefix
  const getDomainControls = (domainId: string) => {
    return controls.filter(c => c.domain.startsWith(domainId));
  };

  // Calculate heatmap data: domainId -> level -> count
  const heatmapData: Record<string, Record<number, number>> = {};
  DOMAIN_IDS.forEach(domId => {
    heatmapData[domId] = {};
    CMMI_LEVELS.forEach(lvl => {
      heatmapData[domId][lvl] = 0;
    });
    
    getDomainControls(domId).forEach(c => {
      const lvl = c.maturity_level;
      if (lvl >= 0 && lvl <= 5) {
        heatmapData[domId][lvl]++;
      }
    });
  });

  // Calculate gaps: controls where maturity_level < maturity_target
  const gapControls = controls.filter(c => c.maturity_level < c.maturity_target);

  // Handle Save Audit
  const handleSaveAudit = async (controlId: string) => {
    setIsSaving(true);
    try {
      const current = controls.find(c => c.id === controlId);
      if (current) {
        await onUpdateControl(controlId, {
          status: current.status,
          maturity_level: auditLevel,
          maturity_justification: auditJustification || 'Auditoría de nivel de madurez',
          notes: auditNotes || current.notes
        });
        setEditingControlId(null);
      }
    } catch (err) {
      console.error("Maturity audit update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Label helpers
  const getDomainLabel = (domainId: string) => {
    const names = {
      D1: lang === 'es' ? 'D1: Licencias y Gobierno' : 'D1: Licensing & Gov',
      D2: lang === 'es' ? 'D2: Solidez y Capital' : 'D2: Capital Adequacy',
      D3: lang === 'es' ? 'D3: KYC / AML' : 'D3: KYC / AML',
      D4: lang === 'es' ? 'D4: Protección Cliente' : 'D4: Client Protection',
      D5: lang === 'es' ? 'D5: Competencia Equipo' : 'D5: Team Competence',
      D6: lang === 'es' ? 'D6: Reportes Regulatorios' : 'D6: Regulatory Reporting',
      D7: lang === 'es' ? 'D7: Seguridad y Datos' : 'D7: Tech & Cybersec',
      D8: lang === 'es' ? 'D8: Vigilancia Normativa' : 'D8: Surveillance'
    };
    return names[domainId as keyof typeof names] || domainId;
  };

  return (
    <div className="space-y-6">
      {/* CMMI Maturity Heatmap */}
      <div className="bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          {lang === 'es' ? 'Mapa de Calor de Madurez CMMI' : 'CMMI Maturity Heatmap'}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {lang === 'es' 
            ? 'Visualiza la distribución de tus controles regulados. Haz clic en cualquier casilla para filtrar las obligaciones.' 
            : 'Visualize the distribution of your regulated controls. Click any grid cell to filter the obligations.'}
        </p>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Header row */}
            <div className="grid grid-cols-9 gap-2 mb-2 text-center text-xs font-bold text-gray-400">
              <div className="text-left font-bold text-gray-300">{lang === 'es' ? 'Dominio' : 'Domain'}</div>
              {CMMI_LEVELS.map(lvl => (
                <div key={lvl} className="p-1 rounded bg-[#0B0F19]/60">
                  L{lvl}
                </div>
              ))}
              <div className="p-1 rounded bg-blue-500/10 text-blue-400">
                {lang === 'es' ? 'Promedio' : 'Avg'}
              </div>
            </div>

            {/* Grid rows */}
            {DOMAIN_IDS.map(domId => {
              const domControls = getDomainControls(domId);
              const sum = domControls.reduce((acc, c) => acc + c.maturity_level, 0);
              const avg = domControls.length > 0 ? (sum / domControls.length).toFixed(1) : '1.0';
              const numericAvg = parseFloat(avg);
              
              return (
                <div key={domId} className="grid grid-cols-9 gap-2 items-center text-center mb-2">
                  {/* Domain Name */}
                  <div className="text-left text-xs font-semibold text-gray-300 truncate" title={getDomainLabel(domId)}>
                    {getDomainLabel(domId)}
                  </div>
                  
                  {/* CMMI Cells */}
                  {CMMI_LEVELS.map(lvl => {
                    const count = heatmapData[domId][lvl];
                    const isSelected = selectedCell?.domainId === domId && selectedCell?.level === lvl;
                    
                    // Heatmap color intensity
                    let cellBg = 'bg-[#0B0F19]/30 border-gray-900';
                    let textClass = 'text-gray-600';
                    if (count > 0) {
                      textClass = 'text-white font-bold';
                      if (lvl === 0) cellBg = 'bg-red-500/25 border-red-500/30';
                      else if (lvl === 1) cellBg = 'bg-orange-500/20 border-orange-500/35';
                      else if (lvl === 2) cellBg = 'bg-amber-500/20 border-amber-500/35';
                      else if (lvl === 3) cellBg = 'bg-blue-500/20 border-blue-500/35';
                      else cellBg = 'bg-emerald-500/25 border-emerald-500/35';
                    }

                    if (isSelected) {
                      cellBg += ' ring-2 ring-blue-500 border-transparent scale-105';
                    }

                    return (
                      <button
                        key={lvl}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCell(null);
                          } else {
                            setSelectedCell({ domainId: domId, level: lvl });
                          }
                        }}
                        className={`p-3 rounded-lg border text-xs transition-all hover:scale-[1.03] ${cellBg} ${textClass}`}
                      >
                        {count}
                      </button>
                    );
                  })}

                  {/* Avg score */}
                  <div className={`p-2 rounded-lg text-xs font-extrabold border ${
                    numericAvg >= 3.0 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {avg}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-850/60 justify-end text-[10px] text-gray-400 font-semibold">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/25 border border-red-500/30" /> {LEVEL_NAMES[lang][0]}</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-500/20 border border-orange-500/30" /> {LEVEL_NAMES[lang][1]}</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30" /> {LEVEL_NAMES[lang][2]}</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" /> {LEVEL_NAMES[lang][3]}</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/25 border border-emerald-500/30" /> {LEVEL_NAMES[lang][4]} / {LEVEL_NAMES[lang][5].split(':')[0]}</div>
        </div>
      </div>

      {/* Selected Cell Filtering Results */}
      {selectedCell && (
        <div className="bg-[#151D30]/80 backdrop-blur border border-blue-500/35 rounded-xl p-5 shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-gray-850 pb-2.5">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              {lang === 'es' ? 'Obligaciones en Filtro Seleccionado' : 'Obligations in Selected Filter'}
            </h4>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              {lang === 'es' ? 'Limpiar Filtro' : 'Clear Filter'}
            </button>
          </div>
          
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {controls.filter(c => c.domain.startsWith(selectedCell.domainId) && c.maturity_level === selectedCell.level).length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-xs italic">
                {lang === 'es' ? 'No hay controles en este nivel de madurez.' : 'No controls at this maturity level.'}
              </div>
            ) : (
              controls
                .filter(c => c.domain.startsWith(selectedCell.domainId) && c.maturity_level === selectedCell.level)
                .map(c => (
                  <div key={c.id} className="bg-[#0B0F19]/55 p-3 rounded-lg border border-gray-850 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-400">{c.id}</span>
                        <span className="text-[10px] text-gray-500 font-medium bg-gray-800 px-1.5 py-0.5 rounded">{c.jurisdiction}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-1">{lang === 'es' ? c.description : c.descriptionEn}</p>
                    </div>
                    {user?.role !== 'team_member' && (
                      <button
                        onClick={() => {
                          setEditingControlId(c.id);
                          setAuditLevel(c.maturity_level);
                          setAuditTarget(c.maturity_target);
                          setAuditJustification(lang === 'es' ? c.maturity_justification : c.maturity_justificationEn);
                          setAuditNotes(c.notes || '');
                        }}
                        className="px-3 py-1 bg-blue-600/10 hover:bg-blue-600/25 border border-blue-500/20 text-blue-400 text-xs font-bold rounded"
                      >
                        {lang === 'es' ? 'Auditar' : 'Audit'}
                      </button>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Split Audit and Action Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Maturity Gap & Auto Action Plans */}
        <div className="lg:col-span-6 bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              {lang === 'es' ? 'Planes de Acción Correctivos' : 'Corrective Action Plans'}
            </span>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded text-xs font-bold">
              {gapControls.length} Gaps
            </span>
          </h3>
          <p className="text-xs text-gray-400">
            {lang === 'es' 
              ? 'Obligaciones donde el nivel de madurez actual está por debajo del objetivo corporativo.' 
              : 'Obligations where current maturity level falls short of corporate targets.'}
          </p>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {gapControls.length === 0 ? (
              <div className="text-center py-12 text-emerald-400 text-sm">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                {lang === 'es' ? '¡Todos los controles cumplen con sus objetivos de madurez!' : 'All controls meet their maturity targets!'}
              </div>
            ) : (
              gapControls.map(c => {
                const rec = ACTION_SUGGESTIONS[lang][c.maturity_level as keyof typeof ACTION_SUGGESTIONS['es']] || '';
                return (
                  <div key={c.id} className="p-4 rounded-xl border border-red-500/20 bg-[#0B0F19]/40 relative overflow-hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-red-400">{c.id}</span>
                          <span className="text-[10px] text-gray-500 font-bold bg-gray-800 px-1.5 py-0.5 rounded">{c.jurisdiction}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-1">
                          {lang === 'es' ? c.description : c.descriptionEn}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block font-bold">{lang === 'es' ? 'Madurez' : 'Maturity'}</span>
                        <span className="text-xs text-gray-300 font-semibold">{c.maturity_level} / <span className="text-emerald-400 font-extrabold">{c.maturity_target}</span></span>
                      </div>
                    </div>

                    {/* Recommendation box */}
                    <div className="mt-3 bg-red-500/5 border border-red-500/10 rounded-lg p-2.5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-red-200 leading-relaxed font-semibold">
                        <strong className="text-red-400">{lang === 'es' ? 'Recomendación:' : 'Action Required:'}</strong> {rec}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Audit Form */}
        <div className="lg:col-span-6 bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            {lang === 'es' ? 'Auditoría CMMI Directa' : 'Direct CMMI Audit'}
          </h3>
          
          {editingControlId ? (
            <div className="space-y-4">
              <div className="bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-850">
                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">{lang === 'es' ? 'Control en Evaluación' : 'Evaluating Control'}</span>
                <span className="text-sm font-extrabold text-blue-400 block mt-1">{editingControlId}</span>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  {lang === 'es' 
                    ? controls.find(c => c.id === editingControlId)?.description 
                    : controls.find(c => c.id === editingControlId)?.descriptionEn
                  }
                </p>
              </div>

              {/* Levels */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {lang === 'es' ? 'Madurez Actual' : 'Current Maturity'}
                  </label>
                  <select
                    value={auditLevel}
                    onChange={(e) => setAuditLevel(parseInt(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-xs text-white"
                  >
                    {CMMI_LEVELS.map(lvl => (
                      <option key={lvl} value={lvl} className="bg-[#151D30]">{LEVEL_NAMES[lang][lvl]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {lang === 'es' ? 'Madurez Objetivo' : 'Target Maturity'}
                  </label>
                  <select
                    value={auditTarget}
                    onChange={(e) => setAuditTarget(parseInt(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-xs text-white"
                    disabled // Target is usually fixed by corporate rules
                  >
                    {CMMI_LEVELS.map(lvl => (
                      <option key={lvl} value={lvl} className="bg-[#151D30]">{LEVEL_NAMES[lang][lvl]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Justification */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'es' ? 'Justificación del Nivel de Madurez' : 'Maturity Level Justification'}
                </label>
                <textarea
                  rows={3}
                  value={auditJustification}
                  onChange={(e) => setAuditJustification(e.target.value)}
                  placeholder={lang === 'es' ? 'Ej: Existe política escrita de ciberseguridad aprobada por junta directiva...' : 'e.g., Written cybersecurity policy approved by board...'}
                  className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 focus:outline-none rounded-lg p-3 text-xs text-white"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'es' ? 'Notas Internas / Auditoría' : 'Internal Notes / Audit logs'}
                </label>
                <textarea
                  rows={2}
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  placeholder={lang === 'es' ? 'Observaciones adicionales...' : 'Additional observations...'}
                  className="w-full bg-[#0B0F19] border border-gray-800 focus:border-blue-500 focus:outline-none rounded-lg p-3 text-xs text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingControlId(null)}
                  className="w-1/2 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-lg transition-colors"
                >
                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  onClick={() => handleSaveAudit(editingControlId)}
                  disabled={isSaving}
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? (lang === 'es' ? 'Guardando...' : 'Saving...') : (lang === 'es' ? 'Guardar Cambios' : 'Save Changes')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 text-gray-500 italic text-center">
              <Award className="w-12 h-12 text-gray-600 mb-3" />
              {lang === 'es' 
                ? 'Selecciona un control en la lista de obligaciones filtradas arriba para auditar su madurez CMMI.' 
                : 'Select a control from the filtered obligations list above to audit its CMMI maturity.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
