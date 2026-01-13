import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {}

  generateStepByStepPdf(
    screenshots: string[],
    title: string = 'User Guide'
  ) {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    let y = margin;

    // Title
    pdf.setFontSize(18);
    pdf.text(title, pageWidth / 2, y, { align: 'center' });
    y += 15;

    screenshots.forEach((img, index) => {
      if (index !== 0) {
        pdf.addPage();
        y = margin;
      }

      // Step title
      pdf.setFontSize(14);
      pdf.text(`Step ${index + 1}`, margin, y);
      y += 8;

      // Image
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = 150;

      pdf.addImage(
        img,
        'PNG',
        margin,
        y,
        imgWidth,
        imgHeight
      );
    });

    pdf.save('step-by-step-guide.pdf');
  }
}
