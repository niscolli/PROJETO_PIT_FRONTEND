import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private sendGridApiKey = environment.sendGridApiKey;

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, text: string) {
    const emailData = {
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: 'seuemail@example.com',
      },
      content: [
        {
          type: 'text/plain',
          value: text,
        },
      ],
    };

    return this.http.post('https://api.sendgrid.com/v3/mail/send', emailData, {
      headers: {
        Authorization: `Bearer ${this.sendGridApiKey}`,
      },
    });
  }
}
