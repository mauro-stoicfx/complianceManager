import { Download, Printer, Shield, FileText } from 'lucide-react';
import { Control } from '../controls_data';

interface AuditReportProps {
  lang: 'es' | 'en';
  controls: Control[];
  domainMaturity: Record<string, number>;
}

export default function AuditReport({ lang, controls, domainMaturity }: AuditReportProps) {
  
  // Calculate general statistics
  const totalControls = controls.length;
  const compliantCount = controls.filter(c => c.status === 'Compliant').length;
  const atRiskCount = controls.filter(c => c.status === 'En riesgo').length;
  const nonCompliantCount = controls.filter(c => c.status === 'Incumplido').length;
  
  const complianceRate = totalControls > 0 ? Math.round((compliantCount / totalControls) * 100) : 0;
  const avgMaturity = (Object.values(domainMaturity).reduce((a, b) => a + b, 0) / 8).toFixed(1);

  // Generate and Download CSV File
  const handleExportCSV = () => {
    // CSV Header row
    const headers = [
      'ID',
      'Domain',
      'Jurisdiction',
      'Source Regulation',
      'Description',
      'Frequency',
      'Next Due Date',
      'Responsible Person',
      'Required Evidence',
      'Status',
      'Maturity Level',
      'Maturity Target',
      'Maturity Justification',
      'Notes'
    ];

    // CSV Rows
    const rows = controls.map(c => [
      c.id,
      c.domain,
      c.jurisdiction,
      c.source_regulation,
      lang === 'es' ? c.description : c.descriptionEn,
      c.frequency,
      c.next_due_date || 'N/A',
      c.responsible_person,
      lang === 'es' ? c.required_evidence : c.required_evidenceEn,
      c.status,
      c.maturity_level.toString(),
      c.maturity_target.toString(),
      lang === 'es' ? c.maturity_justification : c.maturity_justificationEn,
      c.notes || ''
    ]);

    // Format fields with quotes to handle commas/newlines
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(val => `"${val.replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');

    // Create file and download
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `StoicFX_Compliance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Native Browser Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print styles injected in document head when component is rendered */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: #000 !important;
            background: #fff !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          .no-print {
            display: none !important;
          }
          /* Print page break rules */
          .page-break {
            page-break-before: always;
          }
          /* Force colors inside PDF export */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Control panel (Hidden on Print) */}
      <div className="no-print bg-[#151D30]/80 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            {lang === 'es' ? 'Centro de Reportes y Auditoría' : 'Reporting & Audit Hub'}
          </h3>
          <p className="text-xs text-gray-400">
            {lang === 'es' 
              ? 'Descarga informes en formato Excel/CSV para auditorías rápidas o genera un reporte PDF formal listo para el regulador.' 
              : 'Download Excel/CSV spreadsheets for rapid auditing or print a formal PDF report ready for the regulator.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-lg border border-gray-700 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            {lang === 'es' ? 'Exportar a CSV' : 'Export to CSV'}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-md"
          >
            <Printer className="w-4 h-4" />
            {lang === 'es' ? 'Imprimir / PDF' : 'Print / PDF'}
          </button>
        </div>
      </div>

      {/* Printable Report Wrapper */}
      <div className="bg-[#151D30]/85 border border-gray-800 rounded-xl shadow-xl overflow-hidden" id="print-area">
        {/* Decorative page header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-850">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">STOIC FX</h2>
              <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest font-semibold">
                {lang === 'es' ? 'Informe de Cumplimiento Normativo y Madurez' : 'Regulatory Compliance & Maturity Audit Report'}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right text-xs text-blue-100 font-semibold space-y-1">
            <p>{lang === 'es' ? 'Fecha de Generación:' : 'Date Generated:'} {new Date().toLocaleDateString()}</p>
            <p>{lang === 'es' ? 'Entidad:' : 'Entity:'} Stoic FX (Pty) Ltd</p>
            <p>{lang === 'es' ? 'Jurisdicciones:' : 'Jurisdictions:'} FSCA & FSC Mauritius</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-8 space-y-8 bg-[#151D30] text-gray-100 print:text-black print:bg-white">
          
          {/* Section 1: Executive Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white print:text-black border-b border-gray-800 print:border-black pb-2">
              1. {lang === 'es' ? 'Resumen Ejecutivo' : 'Executive Summary'}
            </h3>
            
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0B0F19]/60 print:bg-white border border-gray-850 print:border-black p-4 rounded-xl text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{lang === 'es' ? 'Cumplimiento' : 'Compliance Rate'}</span>
                <span className="text-2xl font-extrabold text-emerald-400 print:text-black block mt-2">{complianceRate}%</span>
              </div>
              <div className="bg-[#0B0F19]/60 print:bg-white border border-gray-850 print:border-black p-4 rounded-xl text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{lang === 'es' ? 'Madurez Promedio' : 'Avg Maturity'}</span>
                <span className="text-2xl font-extrabold text-blue-400 print:text-black block mt-2">{avgMaturity} / 5.0</span>
              </div>
              <div className="bg-[#0B0F19]/60 print:bg-white border border-gray-850 print:border-black p-4 rounded-xl text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{lang === 'es' ? 'Total Obligaciones' : 'Total Obligations'}</span>
                <span className="text-2xl font-extrabold text-white print:text-black block mt-2">{totalControls}</span>
              </div>
              <div className="bg-[#0B0F19]/60 print:bg-white border border-gray-850 print:border-black p-4 rounded-xl text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{lang === 'es' ? 'Vencidas / Alerta' : 'At Risk / Overdue'}</span>
                <span className="text-2xl font-extrabold text-red-400 print:text-black block mt-2">{atRiskCount + nonCompliantCount}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 print:text-black leading-relaxed">
              {lang === 'es' 
                ? 'Este informe consolida el estado de cumplimiento normativo y el nivel de madurez operativa de Stoic FX frente a las regulaciones de la FSCA (Sudáfrica) y la FSC (Mauritius). El sistema está estructurado en base a 8 dominios de control (equivalentes al estándar ISO 27001) y la madurez se mide en base al modelo CMMI (niveles 0 a 5).'
                : 'This report consolidates the regulatory compliance status and operational maturity level of Stoic FX under FSCA (South Africa) and FSC (Mauritius) guidelines. The system is structured upon 8 control domains (aligned with ISO 27001 standards) and maturity is measured using the CMMI framework (levels 0 to 5).'}
            </p>
          </div>

          {/* Section 2: Domain Maturity */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white print:text-black border-b border-gray-800 print:border-black pb-2">
              2. {lang === 'es' ? 'Desglose de Madurez por Dominio' : 'Maturity Breakdown by Domain'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-800 print:border-black text-gray-400 print:text-black font-bold">
                    <th className="py-2">{lang === 'es' ? 'Código de Dominio' : 'Domain Code'}</th>
                    <th className="py-2">{lang === 'es' ? 'Nombre del Dominio' : 'Domain Name'}</th>
                    <th className="py-2 text-center">{lang === 'es' ? 'Total Obligaciones' : 'Total Obligations'}</th>
                    <th className="py-2 text-center">{lang === 'es' ? 'Cumplidos' : 'Compliant'}</th>
                    <th className="py-2 text-center">{lang === 'es' ? 'Madurez Promedio' : 'Average CMMI'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 print:divide-black text-gray-300 print:text-black">
                  {Object.entries(domainMaturity).map(([domId, avg]) => {
                    const domControls = controls.filter(c => c.domain.startsWith(domId));
                    const total = domControls.length;
                    const compliant = domControls.filter(c => c.status === 'Compliant').length;
                    
                    const names = {
                      D1: lang === 'es' ? 'Licenciamiento y Gobierno Corporativo' : 'Licensing and Corporate Governance',
                      D2: lang === 'es' ? 'Solidez Financiera y Capital' : 'Financial Adequacy and Capital',
                      D3: lang === 'es' ? 'KYC / AML / CFT' : 'KYC / AML / CFT',
                      D4: lang === 'es' ? 'Protección al Cliente' : 'Client Protection',
                      D5: lang === 'es' ? 'Formación y Competencia del Equipo' : 'Team Competency and Training',
                      D6: lang === 'es' ? 'Reportes Periódicos a Reguladores' : 'Periodic Regulatory Reporting',
                      D7: lang === 'es' ? 'Tecnología, Datos y Ciberseguridad' : 'Technology, Data and Cybersecurity',
                      D8: lang === 'es' ? 'Vigilancia y Gestión de Cambios' : 'Regulatory Change Surveillance'
                    };
                    const name = names[domId as keyof typeof names] || domId;

                    return (
                      <tr key={domId} className="hover:bg-white/5 print:hover:bg-transparent">
                        <td className="py-2.5 font-bold">{domId}</td>
                        <td className="py-2.5">{name}</td>
                        <td className="py-2.5 text-center">{total}</td>
                        <td className="py-2.5 text-center">{compliant}</td>
                        <td className="py-2.5 text-center font-extrabold text-blue-400 print:text-black">{avg} / 5.0</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Page break before controls table for clean printing layout */}
          <div className="page-break" />

          {/* Section 3: Detailed Obligations Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white print:text-black border-b border-gray-800 print:border-black pb-2">
              3. {lang === 'es' ? 'Inventario Detallado de Obligaciones' : 'Detailed Obligations Ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="border-b border-gray-850 print:border-black text-gray-400 print:text-black font-bold uppercase tracking-wider">
                    <th className="py-2">ID</th>
                    <th className="py-2">{lang === 'es' ? 'Jurisdicción' : 'Jurisdiction'}</th>
                    <th className="py-2">{lang === 'es' ? 'Norma de Origen' : 'Source Regulation'}</th>
                    <th className="py-2 w-1/3">{lang === 'es' ? 'Descripción' : 'Description'}</th>
                    <th className="py-2">{lang === 'es' ? 'Frecuencia' : 'Frequency'}</th>
                    <th className="py-2 text-center">{lang === 'es' ? 'Estado' : 'Status'}</th>
                    <th className="py-2 text-center">{lang === 'es' ? 'Madurez' : 'CMMI'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 print:divide-black text-gray-300 print:text-black">
                  {controls.map(c => {
                    let statusBg = 'text-gray-400';
                    if (c.status === 'Compliant') statusBg = 'text-emerald-400 font-semibold';
                    else if (c.status === 'En riesgo') statusBg = 'text-amber-400 font-semibold';
                    else if (c.status === 'Incumplido') statusBg = 'text-red-400 font-semibold';
                    
                    return (
                      <tr key={c.id} className="hover:bg-white/5 print:hover:bg-transparent">
                        <td className="py-2 font-bold">{c.id}</td>
                        <td className="py-2">{c.jurisdiction}</td>
                        <td className="py-2">{c.source_regulation}</td>
                        <td className="py-2 leading-relaxed">{lang === 'es' ? c.description : c.descriptionEn}</td>
                        <td className="py-2">{c.frequency}</td>
                        <td className={`py-2 text-center ${statusBg}`}>{c.status}</td>
                        <td className="py-2 text-center font-bold">{c.maturity_level}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Signature section */}
          <div className="pt-12 grid grid-cols-2 gap-12 text-center text-xs">
            <div className="space-y-4">
              <div className="border-b border-gray-800 print:border-black h-16 w-3/4 mx-auto" />
              <p className="font-bold text-white print:text-black">Mauro Serrano</p>
              <p className="text-[10px] text-gray-400 print:text-black">{lang === 'es' ? 'Oficial de Cumplimiento de Stoic FX' : 'Stoic FX Compliance Officer'}</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-800 print:border-black h-16 w-3/4 mx-auto" />
              <p className="font-bold text-white print:text-black">{lang === 'es' ? 'Representante Legal / KI' : 'Key Individual / Director'}</p>
              <p className="text-[10px] text-gray-400 print:text-black">{lang === 'es' ? 'Firma de Aceptación' : 'Acknowledge Signature'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
