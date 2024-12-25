import { Image, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeColorsType, ThemeModeType } from '../../store/themeSlice'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { projectImages } from '../../config/UIConfig'
import useApiHook from 'useapihook-dexterverse'
import { APP_VERSION_CHECKER } from '../../api/ApiFunctions'
import DeviceInfo from 'react-native-device-info'
import { NavigationPaths } from '../../config/NavigationPaths'
import { CommonActions } from '@react-navigation/native'

const SplashScreen = ({navigation}:any) => {

    var colors: ThemeColorsType = useSelector((state: any) => state.theme.colors)
    var selectedThemeMode: ThemeModeType = useSelector((state: any) => state.theme.themeMode)

    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white
        },
        splashImageStyle: {
            width: scale(240),
            height: scale(180),
            borderRadius: scale(40),
            resizeMode: "stretch"
        }
    })


    useApiHook({
        apiCallingFunction: APP_VERSION_CHECKER,
        apiCallingFunctionQuery: [],
        apiPayload: [],
        runOnTimeOfScreenMount: true,
        initialLoadingState: true,
        apiCustomReturnFunction: (data: any) => {
            const [major1, minor1] = DeviceInfo.getVersion().split('.').map(Number);
            const [major2, minor2] = data?.current_version.split('.').map(Number);
            if (major1 > major2 || (major1 === major2 && minor1 > minor2)) {
                console.log("-Current Version is greater-")
                return data;
            }
            if (major1 < major2 || (major1 === major2 && minor1 < minor2)) {
                console.log("-Current version is smaller-")
                return data;
            }
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: NavigationPaths.SIGN_IN }],
                })
              );            console.log("-Current version is equal-")
            return data;
        },
        onErrorReturnFunction: (err: any) => {
            return err;
        },
    });

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