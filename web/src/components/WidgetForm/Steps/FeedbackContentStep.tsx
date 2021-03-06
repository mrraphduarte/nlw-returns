import { ArrowArcLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent } : FeedbackContentStepProps){
    
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    
    const feedbackTypesInfo = feedbackTypes[feedbackType]
    
    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault()

        setIsSendingFeedback(true)

        await api.post('/feedbacks',{
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false)

        onFeedbackSent()
    }
    
    return (
        <>
            <header>
                <button 
                    type="button" 
                    onClick={onFeedbackRestartRequested}
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" title="Voltar as opções de feedback"
                >
                    <ArrowArcLeft weight="bold" className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypesInfo.image.source} alt={feedbackTypesInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypesInfo.title}
                </span>
               
                <CloseButton />
            </header> 

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-zinc-400 focus:ring-zinc-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}

                    />

                    <button
                        type="submit"
                        disabled={(comment.length === 0 && screenshot === null) || isSendingFeedback}
                        className="p-2 bg-zinc-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-zinc-500 transition-colors disabled:opacity-50 disabled:hover:bg-zinc-500"
                    >
                        {
                            isSendingFeedback 
                                ?
                                    <Loading />
                                : 'Enviar feedback'
                        }
                    </button>
                </footer>
            </form>
        </>
    )
}