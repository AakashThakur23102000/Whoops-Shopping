import { Image, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeColorsType, ThemeModeType } from '../../store/themeSlice'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { projectImages } from '../../config/UIConfig'

const SplashScreen = () => {

    var colors: ThemeColorsType = useSelector((state: any) => state.theme.colors)
    var selectedThemeMode: ThemeModeType = useSelector((state: any) => state.theme.themeMode)
    
    const styles = ScaledSheet.create({
        screen:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:colors.white
        },
        splashImageStyle:{
            width:scale(240),
            height:scale(180),
            borderRadius:scale(40),
            resizeMode:"stretch"
        }
    })
    
    return (
        <View style={styles.screen}>
            <Image 
            source={projectImages.projectLogo}
            style={styles.splashImageStyle}
            />
        </View>
    )
}


export default SplashScreen