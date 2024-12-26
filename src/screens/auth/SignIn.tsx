import { View, Image, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { ThemeColorsType, ThemeModeType } from '../../store/themeSlice'
import { useSelector } from 'react-redux'
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { projectImages, projectPadding } from '../../config/UIConfig'
import { Button, TextInput } from 'react-native-paper'
import CustomText from '../../utils/CustomText'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const SignIn = () => {
    var colors: ThemeColorsType = useSelector((state: any) => state.theme.colors)
    var selectedThemeMode: ThemeModeType = useSelector((state: any) => state.theme.themeMode)

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
            flex: 1,
            // borderWidth:1,
            // paddingHorizontal: projectPadding.paddingHorizontal,
            // paddingVertical: projectPadding.paddingVertical,
            padding: moderateScale(25),
            rowGap: verticalScale(20)
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
    return (
        <>
            <StatusBar
                translucent={true}
                backgroundColor={colors.primary1000}
                barStyle={selectedThemeMode === "light" ? "dark-content" : "light-content"}
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
                    <View style={styles.bottomView}>
                        <CustomText
                            customFamily='CormorantUpright'
                            customSize='extra_extra_large'
                            customWeight='700'
                            style={styles.defaultTextStyle}>Login</CustomText>

                        <TextInput
                            mode="outlined"
                            label="User Email"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            right={<TextInput.Icon icon={() => <MaterialIcons name="remove-red-eye" size={scale(20)} color={colors.placeHolderColor} />} />}
                        />
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
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
}

export default SignIn