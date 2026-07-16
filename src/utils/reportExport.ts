import { jsPDF } from 'jspdf';
// @ts-ignore
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const val = row[header];
      return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (title: string, headers: string[], rows: any[][], filename: string) => {
  const doc = new jsPDF();
  
  // Add Academy Branding
  doc.setFillColor(15, 76, 129); // #0F4C81
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('KYK ACADEMY', 15, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PRO PERFORMANCE REPORTS', 15, 30);
  
  doc.setTextColor(255, 193, 7); // #FFC107
  doc.text(format(new Date(), 'PPPP'), 195, 30, { align: 'right' });

  // Report Title
  doc.setTextColor(15, 76, 129);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), 15, 55);

  // Table
  autoTable(doc, {
    startY: 65,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 15, right: 15 },
    styles: { fontSize: 9, cellPadding: 5 }
  });

  doc.save(`${filename}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};