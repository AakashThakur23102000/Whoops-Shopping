import { View, Image, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ThemeColorsType, ThemeModeType } from '../../store/themeSlice'
import { useSelector } from 'react-redux'
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { projectImages, projectPadding } from '../../config/UIConfig'
import { Button, TextInput } from 'react-native-paper'
import CustomText from '../../utils/CustomText'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const SignIn = () => {
    var colors: ThemeColorsType = useSelector((state: any) => state.theme.colors)
    var selectedThemeMode: ThemeModeType = useSelector((state: any) => state.theme.themeMode)
    var animatedY = useSharedValue(verticalScale((400)))
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedY.value }],
        }
    })
    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.white,
        },
        logoImage: {
            height: verticalScale(280),
            width: "100%",
            resizeMode: "stretch",
        },
        bottomView: {
            height: "100%",
            width: "100%",
            // borderWidth:1,
            // paddingHorizontal: projectPadding.paddingHorizontal,
            // paddingVertical: projectPadding.paddingVertical,
            padding: moderateScale(25),
            rowGap: verticalScale(2),
        },
        defaultTextStyle: {
            color: colors.black,
        },
        submitButton: {
            backgroundColor: colors.primary1000,
            alignSelf: "flex-end",
            width: "50%",
            marginTop: "5%"
        }
    })

    useEffect(() => {
        animatedY.value = withTiming(verticalScale(0), {
            duration: 800,
            easing: Easing.inOut(Easing.cubic),
            reduceMotion: ReduceMotion.System,
        })
    }, [])

    return (
        <>
            <StatusBar
                translucent={true}
                backgroundColor={colors.primary1000}
                barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
            />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    style={styles.screen}
                    behavior='position'
                    keyboardVerticalOffset={0}
                >
                    <Image source={projectImages.projectLogo} style={styles.logoImage} />
                    <Animated.View style={[styles.bottomView, animatedStyles]}>
                        <CustomText
                            customFamily='CormorantUpright'
                            customSize='extra_extra_large'
                            customWeight='700'
                            style={styles.defaultTextStyle}>Login</CustomText>

                        <View>
                            <TextInput
                                mode="outlined"
                                label="User Email"
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                error={true}
                            />
                            <CustomText>Error Text</CustomText>
                        </View>
                        <TextInput
                            mode="outlined"
                            label="User Password"
                            textContentType='password'
                            keyboardType='default'
                            secureTextEntry
                            right={<TextInput.Icon icon={() => <MaterialIcons name="remove-red-eye" size={scale(20)} color={colors.placeHolderColor} />} />}
                        />
                        <Button
                            onPress={() => { console.log("Hii") }}
                            loading={false}
                            mode='elevated'
                            style={styles.submitButton}
                            textColor={selectedThemeMode === "light" ? colors.white : colors.black}
                        >Submit</Button>
                    </Animated.View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
}

export default SignIn