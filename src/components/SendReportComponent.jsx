import React, { useState } from 'react';
import { generateAuditReport, sendReportEmail, downloadReportPDF, downloadReportCSV } from '../utils/reportGenerator';

/**
 * SendReportModal Component
 * Handles sending audit reports via email or download
 */
export function SendReportModal({ isOpen, onClose, auditData, organizationName }) {
  const [sendMethod, setSendMethod] = useState('email'); // 'email' | 'pdf' | 'csv'
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    if (!recipientEmail.trim()) {
      setError('Please enter a recipient email address');
      return;
    }

    if (!recipientEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const report = generateAuditReport(auditData, organizationName);
      const response = await sendReportEmail(recipientEmail, report, organizationName);

      if (response.success) {
        setSuccess(`Report sent successfully to ${recipientEmail}!`);
        setTimeout(() => {
          setRecipientEmail('');
          onClose();
        }, 2000);
      } else {
        setError(response.error || 'Failed to send report. Please try again.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setError('');

    try {
      const report = generateAuditReport(auditData, organizationName);
      await downloadReportPDF(report, organizationName);
      setSuccess('PDF downloaded successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(`Error generating PDF: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = async () => {
    setIsLoading(true);
    setError('');

    try {
      const report = generateAuditReport(auditData, organizationName);
      downloadReportCSV(report, organizationName);
      setSuccess('CSV downloaded successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(`Error generating CSV: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Send Report</h2>
          <p className="text-slate-600 mt-1">Choose how you'd like to share the audit</p>
        </div>

        {/* Send Method Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {[
            { id: 'email', label: '📧 Email', icon: '✉️' },
            { id: 'pdf', label: '📄 PDF', icon: '📥' },
            { id: 'csv', label: '📊 CSV', icon: '⬇️' },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setSendMethod(method.id);
                setError('');
                setSuccess('');
              }}
              className={`px-4 py-3 font-medium text-sm transition ${
                sendMethod === method.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>

        {/* Content by Send Method */}
        <div className="mb-6">
          {sendMethod === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Recipient Email Address
                </label>
                <input
                  type="email"
                  placeholder="recipient@company.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-slate-500">
                The report will be sent as an HTML email with all metrics and recommendations included.
              </p>
            </div>
          )}

          {sendMethod === 'pdf' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  📄 Download a professional PDF report with all audit findings, recommendations, and financial impact analysis.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Ideal for sharing with stakeholders and executives. Includes charts and formatted tables.
              </p>
            </div>
          )}

          {sendMethod === 'csv' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  📊 Download a CSV file with detailed tool-by-tool analysis for spreadsheet import.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Perfect for data analysis in Excel or Google Sheets. Includes all metrics and recommendations.
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            ✓ {success}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          {sendMethod === 'email' && (
            <button
              onClick={handleSendEmail}
              disabled={isLoading || !recipientEmail.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </button>
          )}

          {sendMethod === 'pdf' && (
            <button
              onClick={handleDownloadPDF}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Download PDF'}
            </button>
          )}

          {sendMethod === 'csv' && (
            <button
              onClick={handleDownloadCSV}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Download CSV'}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/**
 * SendReportButton Component
 * The main button that triggers the send report modal
 */
export function SendReportButton({ auditData, organizationName = 'Your Organization' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!auditData || !auditData.processedTools || auditData.processedTools.length === 0) {
    return null; // Don't show button if no audit data
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition"
      >
        📤 Send Report
      </button>

      <SendReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        auditData={auditData}
        organizationName={organizationName}
      />
    </>
  );
}

/**
 * Usage Example in your component:
 * 
 * import { SendReportButton } from './SendReportComponent';
 * 
 * export function AuditDashboard() {
 *   const [audit, setAudit] = useState(null);
 * 
 *   return (
 *     <div className="space-y-4">
 *       <SendReportButton 
 *         auditData={audit}
 *         organizationName="Acme Corp"
 *       />
 *     </div>
 *   );
 * }
 */