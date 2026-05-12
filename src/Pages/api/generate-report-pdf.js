import { generatePDFFromReport } from '@/lib/backend-api-routes';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const report = req.body;

    if (!report?.metadata?.reportId) {
      return res.status(400).json({ error: 'Invalid report data' });
    }

    const pdfBuffer = await generatePDFFromReport(report);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="AI-Audit-${report.metadata.reportId}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF error:', error);
    return res.status(500).json({ error: error.message });
  }
}