import { ArrowArcLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { 
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system';


import { styles } from "./styles"
import { theme } from "../../theme";

import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedbackType } from "../../components/Widget"
import { ScreenShotButton } from "../../components/ScreenShotButton"
import { Button } from "../Button";
import { api } from "../../libs/api";

interface Props{
    feedbackType: FeedbackType
    onFeedbackTypeCanceled: () => void
    onFeedbackTypeSent: () => void
}


export function Form({ feedbackType, onFeedbackTypeCanceled, onFeedbackTypeSent }: Props){

    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string|null>(null)
    const [comment, setComment] = useState("")
    
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    }

    function handleScreenshotRemove(){
        setScreenshot(null)
    }

    async function handleSendFeedback(){
        if(isSendingFeedback) return

        setIsSendingFeedback(true)

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })

            onFeedbackTypeSent()
        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ onFeedbackTypeCanceled }>
                    <ArrowArcLeft 
                        size={24}
                        weight='bold'
                        color={ theme.colors.text_secondary }
                    />
                </TouchableOpacity>

                <View style={ styles.titleContainer }>
                    <Image 
                        source={ feedbackTypeInfo.image }
                        style={ styles.image }
                    />
                    <Text style={ styles.titleText }>
                        { feedbackTypeInfo.title }
                    </Text>
                </View>

            </View>

            <TextInput 
                multiline
                style={ styles.input }
                placeholder="Algo não esta funcionando bem? Queremos corrigir. Conte com detalhes o que esta acontecendo."
                placeholderTextColor={ theme.colors.text_secondary }
                autoCorrect={false}
                onChangeText={ setComment }
           /> 

            <View style={ styles.footer }>
                <ScreenShotButton 
                    screenshot= { screenshot }
                    ontakeShot= { handleScreenshot }
                    onRemoveShot= { handleScreenshotRemove}
                />

                <Button 
                    onPress={handleSendFeedback}
                    isLoading={ isSendingFeedback }
                />
            </View>

        </View>
    )
}