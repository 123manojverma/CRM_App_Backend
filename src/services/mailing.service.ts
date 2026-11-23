import { Resend } from 'resend';
import { serverConfig } from '../config/server.config.js';

let resend: Resend;

export class MailerService {

    constructor() {
        resend = new Resend(serverConfig.RESEND_API_KEY);
    }

    async sendEmail(to: string, subject: string, body: string) {
        const { data, error } = await resend.emails.send({
            from: serverConfig.MAIL_FROM,
            to: to,
            subject: subject,
            text: body,
            html: body,
        });

        if (error) {
            console.log({error});
            return {
                success:false
            }
        }
        
        console.log({ data });
        
        return {
            message:'MAIL SENT',
            success:true
        }
    }
}