import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbackRepository } from "../repositories/feedbacks-repositorys"

interface SubmitFeedbackServiceRequest {
    type:       string
    comment?:    string
    screenshot?: string
}

export class SubmitFeedbackService {

    constructor(private feedbacksRepository: FeedbackRepository, private mailAdapter: MailAdapter) {}

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment && !screenshot){
            throw new Error('Feedback info is required, please take a screenshot or a comment.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        
        await this.feedbacksRepository.create({
            type, comment, screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body:[
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<img src='${screenshot}' alt='${comment}'/>`,
                `<div/>`
            ].join('\n')
        })
    }   


}