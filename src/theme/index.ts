import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper'
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native'

const combinedDefaultTheme: typeof PaperDefaultTheme & typeof NavigationDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        background: '#141517',
        error: '#f13a59',
    },
}

export default combinedDefaultTheme