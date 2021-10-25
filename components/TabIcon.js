import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

import { FONTS, COLORS } from '../constants'

const TabIcon = ({focused, icon, label, isTrade, iconStyle}) => {
    if (isTrade) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.black
                }}
            >
            <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.white,
                        ...iconStyle
                    }}
                />
                <Text
                    style={{
                        color: !focused ? COLORS.white : COLORS.secondary,
                        ...FONTS.h4
                    }}
                >
                    {label}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={styles.tab_icon}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? COLORS.white : COLORS.secondary,
                        ...iconStyle
                    }}
                />
                <Text
                    style={{
                        color: focused ? COLORS.white : COLORS.secondary,
                        ...FONTS.h4
                    }}
                >
                    {label}
                </Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    tab_text: {
        color: COLORS.white
    },
    tab_icon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default TabIcon