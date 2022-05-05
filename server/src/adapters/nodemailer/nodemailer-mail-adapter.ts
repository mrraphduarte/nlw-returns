import { MailAdapter, SendMailAdapter } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f724f8401428af",
        pass: "bfa2c83c1750d8"
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailAdapter) {
        await transport.sendMail({
            from:'Equipe Wedget <eqwedget@gmail.com>',
            to:'Raphael Duarte <raphafold@gmail.com>',
            subject,
            html: body
        })
    }
}