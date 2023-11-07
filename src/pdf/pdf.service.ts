// pdf.service.ts
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path'; // Import the path module

@Injectable()
export class PdfService {
  async generatePdf(data: any): Promise<Buffer> {
    // Construct the full path to your EJS template
    const templatePath = path.join(__dirname, '../../templates/template.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, {
      user: {
        ...data,
      },
    });

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf();

    await browser.close();

    return pdfBuffer;
  }
}
