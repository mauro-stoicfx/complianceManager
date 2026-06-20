import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Filter, 
  Search, 
  Layers,
  FileCheck,
  Loader
} from 'lucide-react';
import { Control } from '../controls_data';

interface EvidenceFile {
  id: string;
  control_id: string;
  file_name: string;
  file_path: string;
  uploaded_by: string;
  uploaded_by_name: string;
  approved_by: string | null;
  approved_by_name: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
  validity_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface EvidenceRepositoryProps {
  lang: 'es' | 'en';
  user: { email: string; full_name: string; role: string } | null;
  apiOnline: boolean;
  controls: Control[];
  evidences: EvidenceFile[];
  setEvidences: React.Dispatch<React.SetStateAction<EvidenceFile[]>>;
  onUpdateControls: () => void;
}

export default function EvidenceRepository({
  lang,
  user,
  apiOnline,
  controls,
  evidences,
  setEvidences,
  onUpdateControls
}: EvidenceRepositoryProps) {
  const isSpanish = lang === 'es';
  
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Form states for uploading new evidence
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedControlId, setSelectedControlId] = useState<string>('');
  const [validityDate, setValidityDate] = useState<string>('');
  const [uploadNotes, setUploadNotes] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Review comments modal state
  const [reviewingEvidence, setReviewingEvidence] = useState<EvidenceFile | null>(null);
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [reviewAction, setReviewAction] = useState<'Approved' | 'Rejected' | null>(null);

  // Fetch all evidences
  const fetchEvidences = async () => {
    setLoading(true);
    if (apiOnline) {
      try {
        const res = await fetch('http://localhost:8000/api/evidence');
        if (res.ok) {
          const data = await res.json();
          setEvidences(data);
        }
      } catch (err) {
        console.error("Failed to fetch evidences:", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvidences();
    // Setup interval to poll
    const timer = setInterval(fetchEvidences, 5000);
    return () => clearInterval(timer);
  }, [apiOnline]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedControlId || !selectedFile) {
      alert(isSpanish ? "Por favor selecciona un control y un archivo." : "Please select a control and a file.");
      return;
    }

    setLoading(true);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('control_id', selectedControlId);
    formData.append('file', selectedFile);
    if (validityDate) formData.append('validity_date', validityDate);
    if (uploadNotes) formData.append('notes', uploadNotes);

    const headers: Record<string, string> = {};
    if (user) {
      headers['X-Simulated-Role'] = user.role;
      headers['X-Simulated-User'] = user.email;
    }

    if (apiOnline) {
      try {
        const res = await fetch('http://localhost:8000/api/evidence/upload', {
          method: 'POST',
          headers: headers,
          body: formData
        });
        if (res.ok) {
          setShowUploadModal(false);
          setSelectedControlId('');
          setValidityDate('');
          setUploadNotes('');
          setSelectedFile(null);
          fetchEvidences();
          onUpdateControls();
        } else {
          const errData = await res.json();
          alert(`Error: ${errData.detail || 'Upload failed'}`);
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Network error occurred during upload.");
      }
    } else {
      // Local Mock Upload Mode (In-memory fallback)
      const fileId = Math.random().toString(36).substring(2, 9);
      const mockEvidence: EvidenceFile = {
        id: fileId,
        control_id: selectedControlId,
        file_name: selectedFile.name,
        file_path: `mock_storage/${selectedFile.name}`,
        uploaded_by: user?.email || 'mauro@stoicfx.com',
        uploaded_by_name: user?.full_name || 'Mauro Serrano',
        approved_by: null,
        approved_by_name: null,
        status: 'Pending',
        validity_date: validityDate || null,
        notes: uploadNotes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Update the controls array in parent (via callback or local side effect if needed, but since controls are in memory in app.tsx, we can mock it here or instruct user)
      setEvidences(prev => [mockEvidence, ...prev]);
      
      // Update local controls state directly in Mock mode
      const targetControl = controls.find(c => c.id === selectedControlId);
      if (targetControl) {
        targetControl.status = 'En progreso';
        targetControl.evidence_file_path = mockEvidence.file_path;
        targetControl.last_reviewed = new Date().toISOString().split('T')[0];
      }
      
      setShowUploadModal(false);
      setSelectedControlId('');
      setValidityDate('');
      setUploadNotes('');
      setSelectedFile(null);
      onUpdateControls(); // Refresh parents
    }
    
    setLoading(false);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingEvidence || !reviewAction) return;

    setLoading(true);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (user) {
      headers['X-Simulated-Role'] = user.role;
      headers['X-Simulated-User'] = user.email;
    }

    if (apiOnline) {
      try {
        const res = await fetch(`http://localhost:8000/api/evidence/${reviewingEvidence.id}/review`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            status: reviewAction,
            notes: reviewNotes
          })
        });
        if (res.ok) {
          setReviewingEvidence(null);
          setReviewNotes('');
          setReviewAction(null);
          fetchEvidences();
          onUpdateControls();
        }
      } catch (err) {
        console.error("Review error:", err);
      }
    } else {
      // Local Mock Review Mode
      setEvidences(prev => prev.map(ev => {
        if (ev.id === reviewingEvidence.id) {
          const updated = {
            ...ev,
            status: reviewAction,
            approved_by: user?.email || 'mauro@stoicfx.com',
            approved_by_name: user?.full_name || 'Mauro Serrano',
            notes: reviewNotes || ev.notes,
            updated_at: new Date().toISOString()
          };
          
          // Update the control status
          const targetControl = controls.find(c => c.id === ev.control_id);
          if (targetControl) {
            targetControl.status = reviewAction === 'Approved' ? 'Compliant' : 'Incumplido';
            targetControl.evidence_file_path = reviewAction === 'Approved' ? ev.file_path : null;
            targetControl.last_reviewed = new Date().toISOString().split('T')[0];
          }
          
          return updated;
        }
        return ev;
      }));

      setReviewingEvidence(null);
      setReviewNotes('');
      setReviewAction(null);
      onUpdateControls();
    }

    setLoading(false);
  };

  const startReview = (ev: EvidenceFile, action: 'Approved' | 'Rejected') => {
    setReviewingEvidence(ev);
    setReviewAction(action);
    setReviewNotes(ev.notes || '');
  };

  const handleDownload = (ev: EvidenceFile) => {
    if (apiOnline) {
      window.open(`http://localhost:8000/api/evidence/download/${ev.id}`, '_blank');
    } else {
      alert(isSpanish 
        ? `Modo Local: Descargando archivo simulado "${ev.file_name}"\n(Para descargas reales, inicia el backend FastAPI)` 
        : `Local Mode: Downloading simulated file "${ev.file_name}"\n(Start the FastAPI backend for real downloads)`
      );
    }
  };

  // Filter evidence files
  const filteredEvidences = evidences.filter(ev => {
    const matchStatus = filterStatus === 'All' || ev.status === filterStatus;
    const matchSearch = searchTerm === '' || 
      ev.control_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ev.uploaded_by_name && ev.uploaded_by_name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const canReview = user && ['admin', 'compliance_officer'].includes(user.role.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header section with Stats & Upload button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#151D30]/35 border border-gray-850 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            {isSpanish ? "Repositorio de Evidencias" : "Evidence Repository"}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isSpanish 
              ? "Carga, validación y control de soporte documental regulatorio" 
              : "Upload, validation and control of regulatory documentary support"}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-650 hover:bg-blue-600 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-lg hover:shadow-blue-500/10 transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          {isSpanish ? "Cargar Evidencia" : "Upload Evidence"}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#151D30]/25 border border-gray-850 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">Total</span>
            <span className="text-xl font-bold text-white">{evidences.length}</span>
          </div>
        </div>

        <div className="bg-[#151D30]/25 border border-gray-850 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">{isSpanish ? "Pendientes" : "Pending"}</span>
            <span className="text-xl font-bold text-amber-400">
              {evidences.filter(e => e.status === 'Pending').length}
            </span>
          </div>
        </div>

        <div className="bg-[#151D30]/25 border border-gray-850 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">{isSpanish ? "Aprobadas" : "Approved"}</span>
            <span className="text-xl font-bold text-emerald-400">
              {evidences.filter(e => e.status === 'Approved').length}
            </span>
          </div>
        </div>

        <div className="bg-[#151D30]/25 border border-gray-850 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-red-400">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">{isSpanish ? "Rechazadas" : "Rejected"}</span>
            <span className="text-xl font-bold text-red-400">
              {evidences.filter(e => e.status === 'Rejected').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#151D30]/15 border border-gray-850 p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-550" />
          <input
            type="text"
            placeholder={isSpanish ? "Buscar por control, archivo u oficial..." : "Search by control, file or officer..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {['All', 'Pending', 'Approved', 'Rejected'].map((statusOption) => {
            const labelMap: Record<string, string> = {
              'All': isSpanish ? 'Todos' : 'All',
              'Pending': isSpanish ? 'Pendientes' : 'Pending',
              'Approved': isSpanish ? 'Aprobados' : 'Approved',
              'Rejected': isSpanish ? 'Rechazados' : 'Rejected',
            };
            
            return (
              <button
                key={statusOption}
                onClick={() => setFilterStatus(statusOption)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === statusOption
                    ? 'bg-blue-650 text-white'
                    : 'bg-[#151D30] text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {labelMap[statusOption]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#151D30]/15 border border-gray-850 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-850 bg-[#0B0F19]/40 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">{isSpanish ? "Control ID" : "Control ID"}</th>
                <th className="px-6 py-4">{isSpanish ? "Archivo" : "File Name"}</th>
                <th className="px-6 py-4">{isSpanish ? "Cargado Por" : "Uploaded By"}</th>
                <th className="px-6 py-4">{isSpanish ? "Fecha Carga" : "Upload Date"}</th>
                <th className="px-6 py-4">{isSpanish ? "Validez" : "Expiration"}</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-850 text-xs">
              {loading && filteredEvidences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <Loader className="w-5 h-5 animate-spin mx-auto text-blue-500" />
                    <span className="block mt-2">Cargando evidencias...</span>
                  </td>
                </tr>
              ) : filteredEvidences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-650" />
                    {isSpanish ? "No se encontraron evidencias que coincidan." : "No matching evidence found."}
                  </td>
                </tr>
              ) : (
                filteredEvidences.map((ev) => {
                  const uploadDate = new Date(ev.created_at).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US');
                  const expDate = ev.validity_date 
                    ? new Date(ev.validity_date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US')
                    : (isSpanish ? 'No vence' : 'Does not expire');
                  
                  const isExpired = ev.validity_date && new Date(ev.validity_date) < new Date();

                  // Status pill colors
                  const statusColors = {
                    Pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                    Approved: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                    Rejected: 'bg-red-500/10 text-red-400 border border-red-500/20',
                  };

                  return (
                    <tr key={ev.id} className="hover:bg-[#151D30]/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-400">
                        {ev.control_id}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <button 
                            onClick={() => handleDownload(ev)}
                            className="text-blue-400 hover:text-blue-300 font-medium hover:underline text-left truncate" 
                            title={isSpanish ? "Abrir/Descargar documento" : "View/Download document"}
                          >
                            {ev.file_name}
                          </button>
                        </div>
                        {ev.notes && (
                          <p className="text-[10px] text-gray-450 italic mt-0.5 ml-6 truncate max-w-[200px]">
                            {ev.notes}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {ev.uploaded_by_name}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {uploadDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${isExpired ? 'text-red-400 font-semibold flex items-center gap-1' : 'text-gray-400'}`}>
                          {expDate}
                          {isExpired && <span title={isSpanish ? 'Expirada' : 'Expired'}><AlertCircle className="w-3.5 h-3.5" /></span>}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[ev.status]}`}>
                          {isSpanish 
                            ? (ev.status === 'Pending' ? 'Pendiente' : ev.status === 'Approved' ? 'Aprobada' : 'Rechazada')
                            : ev.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDownload(ev)}
                            className="p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
                            title={isSpanish ? "Descargar evidencia" : "Download evidence"}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {ev.status?.toLowerCase() === 'pending' && canReview && (
                            <>
                              <button
                                onClick={() => startReview(ev, 'Approved')}
                                className="p-1.5 hover:bg-emerald-500/10 rounded text-emerald-550 hover:text-emerald-400 transition-colors border border-emerald-500/15"
                                title={isSpanish ? "Aprobar evidencia" : "Approve evidence"}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => startReview(ev, 'Rejected')}
                                className="p-1.5 hover:bg-red-500/10 rounded text-red-550 hover:text-red-400 transition-colors border border-red-500/15"
                                title={isSpanish ? "Rechazar evidencia" : "Reject evidence"}
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#151D30] border border-gray-850 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            <div className="px-6 py-5 border-b border-gray-850 flex items-center justify-between">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-400" />
                {isSpanish ? "Subir Evidencia Documental" : "Upload Documentary Evidence"}
              </h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition-colors text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {/* Control selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider">
                  {isSpanish ? "Asociar a Obligación (Control)" : "Link to Obligation (Control)"}
                </label>
                <select
                  required
                  value={selectedControlId}
                  onChange={(e) => setSelectedControlId(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="">{isSpanish ? "-- Selecciona control regulatorio --" : "-- Select regulatory control --"}</option>
                  {controls.map(c => (
                    <option key={c.id} value={c.id}>
                      [{c.id}] {c.jurisdiction} - {c.description.substring(0, 70)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Expiration date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider">
                  {isSpanish ? "Fecha de Vencimiento de Validez (Opcional)" : "Validity Expiration Date (Optional)"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={validityDate}
                    onChange={(e) => setValidityDate(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Upload Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider">
                  {isSpanish ? "Notas o Comentarios de Carga" : "Upload Notes or Comments"}
                </label>
                <textarea
                  placeholder={isSpanish ? "Ej: Copia firmada por el director residente en Mauritius..." : "e.g., Signed copy by resident director..."}
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* File Dropzone/input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider">
                  {isSpanish ? "Archivo" : "File"}
                </label>
                <div className="border-2 border-dashed border-gray-800 hover:border-blue-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors relative">
                  <input
                    required
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 mx-auto text-gray-550 mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="text-xs text-blue-450 font-bold">{selectedFile.name}</p>
                      <p className="text-[10px] text-gray-500 mt-1">({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-300 font-semibold">
                        {isSpanish ? "Haz clic o arrastra para cargar archivo" : "Click or drag to upload file"}
                      </p>
                      <p className="text-[10px] text-gray-550 mt-1">PDF, PNG, JPG o DOCX (max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-800 hover:bg-gray-800 text-xs font-semibold rounded-lg text-gray-450 hover:text-white transition-colors"
                >
                  {isSpanish ? "Cancelar" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-650 hover:bg-blue-600 active:scale-95 text-xs font-semibold rounded-lg text-white shadow-lg transition-all"
                >
                  {loading ? (isSpanish ? "Subiendo..." : "Uploading...") : (isSpanish ? "Confirmar Carga" : "Confirm Upload")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW ACTION DIALOG */}
      {reviewingEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#151D30] border border-gray-850 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className={`absolute top-0 left-0 w-full h-[3px] ${reviewAction === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            
            <div className="px-6 py-5 border-b border-gray-850 flex items-center justify-between">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gray-400" />
                {isSpanish ? "Revisión de Evidencia" : "Evidence Review"} ({reviewAction === 'Approved' ? (isSpanish ? 'Aprobar' : 'Approve') : (isSpanish ? 'Rechazar' : 'Reject')})
              </h3>
              <button 
                onClick={() => setReviewingEvidence(null)}
                className="text-gray-400 hover:text-white transition-colors text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div className="bg-[#0B0F19] p-3 rounded-lg border border-gray-850 space-y-1">
                <div className="text-[10px] text-gray-500 uppercase font-bold">{isSpanish ? "Archivo a revisar" : "Review File"}</div>
                <div className="text-xs text-white font-medium">{reviewingEvidence.file_name}</div>
                <div className="text-[10px] text-blue-400 font-bold block mt-1">{isSpanish ? "Asociado a control:" : "Associated to control:"} {reviewingEvidence.control_id}</div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider">
                  {isSpanish ? "Notas de la decisión (Auditoría)" : "Notes of Decision (Audit Trial)"}
                </label>
                <textarea
                  required
                  placeholder={isSpanish ? "Escribe la justificación para esta decisión..." : "Write justification for this decision..."}
                  value={reviewNotes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0B0F19] border border-gray-850 focus:border-blue-500 rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingEvidence(null)}
                  className="px-4 py-2 border border-gray-800 hover:bg-gray-800 text-xs font-semibold rounded-lg text-gray-450 hover:text-white transition-colors"
                >
                  {isSpanish ? "Cancelar" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 text-xs font-semibold rounded-lg text-white shadow-lg transition-all active:scale-95 ${
                    reviewAction === 'Approved' 
                      ? 'bg-emerald-650 hover:bg-emerald-600 shadow-emerald-500/10' 
                      : 'bg-red-650 hover:bg-red-600 shadow-red-500/10'
                  }`}
                >
                  {loading 
                    ? (isSpanish ? "Guardando..." : "Saving...") 
                    : (reviewAction === 'Approved' ? (isSpanish ? "Confirmar Aprobación" : "Confirm Approval") : (isSpanish ? "Confirmar Rechazo" : "Confirm Rejection"))
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
