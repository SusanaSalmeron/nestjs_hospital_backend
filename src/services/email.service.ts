import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';



@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name)

    private client = null
    async initializeEmailClient() {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = await nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return transporter
    }

    getEmailClient = async () => {
        if (!this.client) {
            this.client = await this.initializeEmailClient()
        }
        return this.client
    }

    async sendEmail(email) {
        const emailClient = await this.getEmailClient()
        console.log(emailClient)
        const info = await emailClient.sendMail({
            from: "emailhhcontactus@gmail.com",
            to: email,
            subject: "No replay",
            text: "We have received your inquiry. Our team will contact you shortly",
            html: "<b>We have received your inquiry. Our team will contact you shortly</b>",
        });

        this.logger.log("Message sent: %s", info.messageId);
        this.logger.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}
