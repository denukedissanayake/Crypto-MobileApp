import { transform } from '@babel/core';
import React from 'react';
import { View, Text, Image } from 'react-native'

import { SIZES, COLORS , FONTS, icons} from '../constants';


const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View style={{...containerStyle}}>
            <Text style={{marginLeft: SIZES.base, ...FONTS.h3, color: COLORS.lightGray3 }}>{title}</Text>
            
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}
            >
                <Text style={{ marginLeft: SIZES.base, ...FONTS.h3, color: COLORS.lightGray3 }} >$</Text>
                <Text style={{ marginLeft: SIZES.base,  ...FONTS.h2, color: COLORS.white }} >{displayAmount.toLocaleString()}</Text>
                <Text style={{ marginLeft: SIZES.base,...FONTS.h3, color: COLORS.lightGray3 }} >USD</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}
            >
                {
                    changePct != 0 &&
                    <Image
                        source={icons.upArrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 10,
                            width: 10,
                            alignSelf: 'center',
                            tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                            transform: (changePct> 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                        }}
                    />
                }
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        alignSelf: 'center',
                        color: (changePct == 0) ? COLORS.lightGray3 : (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                        ...FONTS.h3
                }}
                >
                    {changePct.toFixed(2)}%
                </Text>

                <Text
                    style={{
                        marginLeft: SIZES.radius,
                        alignSelf: 'flex-end',
                        color: COLORS.lightGray3,
                        ...FONTS.h5
                    }}
                >
                    7D change
                </Text>
            </View>
             
        </View>
    )
}

export default BalanceInfo