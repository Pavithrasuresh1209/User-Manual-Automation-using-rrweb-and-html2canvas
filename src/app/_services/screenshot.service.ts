// _services/screenshot.service.ts
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() {}

  // Capture an element and return the image as a base64 string
  async capture(element: HTMLElement): Promise<string> {
    const canvas = await html2canvas(element, { useCORS: true });
    return canvas.toDataURL('image/png');
  }
}
