// pdf.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';
import * as fs from 'fs';
// import * as path from 'path'; // Import the path module

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get('generate')
  async generatePdf() {
    const data = { first_name: 'Mizan', age: 16 }; // Provide the data for your EJS template
    const pdfBuffer = await this.pdfService.generatePdf(data);
    // You can send the PDF as a response or save it to a file, send it via email, etc.
    // Save the PDF to a file
    fs.writeFileSync('pdfs/proposal.pdf', pdfBuffer);

    // Optionally, you can return a success message to the client
    return { message: 'PDF saved successfully' };
  }
}
