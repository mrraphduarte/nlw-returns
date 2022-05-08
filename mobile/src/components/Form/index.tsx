import { ArrowArcLeft } from "phosphor-react-native";
import React from "react";
import { 
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'

import { styles } from "./styles"
import { theme } from "../../theme";

import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedbackType } from "../../components/Widget"
import { ScreenShotButton } from "../../components/ScreenShotButton"
import { Button } from "../Button";

interface Props{
    feedbackType: FeedbackType
}


export function Form({ feedbackType }: Props){

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity>
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
            /> 

            <View style={ styles.footer }>
                <ScreenShotButton 
                    screenshot=""
                    ontakeShot={() =>{}}
                    onRemoveShot={() =>{}}
                />

                <Button 
                    isLoading={ false }
                />
            </View>

        </View>
    )
}