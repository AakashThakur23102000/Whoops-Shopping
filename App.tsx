import { StatusBar, Appearance } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationPaths } from './src/config/NavigationPaths'
import SplashScreen from './src/screens/splash_screen/SplashScreen'
import { useDispatch, useSelector } from 'react-redux'
import { setThemeMode, ThemeColorsType, ThemeModeType } from './src/store/themeSlice'
import UseApiHookContextStore from 'useapihook-dexterverse/context/UseApiHookContextStore'
import SignIn from './src/screens/auth/SignIn'
import SignUp from './src/screens/auth/SignUp'


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const App = () => {
  var statusBarHeight = StatusBar.currentHeight;
  const dispatch = useDispatch();
  const isSystemModeEnabled = useSelector((state: any) => state.theme.isSystemModeEnabled);
  var colors: ThemeColorsType = useSelector((state: any) => state.theme.colors)
  var selectedThemeMode: ThemeModeType = useSelector((state: any) => state.theme.themeMode)


  // system theme checker 
  function fetchSystemTheme() {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      return 'systemDark';
    } else {
      return 'systemLight';
    }
  }
  useEffect(() => {
    if (isSystemModeEnabled) {
      // Check initial theme
      dispatch(setThemeMode(fetchSystemTheme()));
      // Add a listener to watch for theme changes
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        const newTheme = colorScheme === 'dark' ? 'systemDark' : 'systemLight';
        dispatch(setThemeMode(newTheme));
      });
      // Cleanup the listener when the component is unmounted
      return () => {
        listener.remove();
      };
    }
  }, [isSystemModeEnabled, dispatch]);




  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={colors.white}
        barStyle={selectedThemeMode === "light" ? "dark-content" : "light-content"}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white
        }}>
        <NavigationContainer>
          <UseApiHookContextStore
            initialProp={{
              // pageNotFoundFu nc:()=>{navigation.navigate('PageNotFound')}
            }}
          >
            <Stack.Navigator
              initialRouteName={NavigationPaths.SPLASH_SCREEN}
              screenOptions={{ headerShown: false, }}
            >
              <Stack.Screen
                name={NavigationPaths.SPLASH_SCREEN}
                component={SplashScreen}
              />
              <Stack.Screen
                name={NavigationPaths.SIGN_IN}
                component={SignIn}
              />
              <Stack.Screen
                name={NavigationPaths.SIGN_UP}
                component={SignUp}
              />
            </Stack.Navigator>
          </UseApiHookContextStore>
        </NavigationContainer>

      </SafeAreaView>
    </>

  )
}

export default App