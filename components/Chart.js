import React from 'react';
import { View, Text } from 'react-native'

import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation
} from '@rainbow-me/animated-charts'

import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../constants';

const Chart = ({ contsinerStyle, chartPrices }) => {

    //Points

    // console.log(chartPrices)

    let startUnixTimeStamp = moment().subtract(7, 'day').unix()

    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            X: startUnixTimeStamp + (index + 1) * 3600,
            y: item
        }
    }) : []

    let points = monotoneCubicInterpolation({ data, range: 40 })
    
    const formatView = value => {
        'worklet'

        if (value === '') {
            return ''
        } 
        return `$${Number(value).toFixed(2)}`
        
    }

    const formatDateTime = value => {
        'worklet'

        if (value === '') {
            return ''
        }
        
        var selectedDate = new Date(value * 1000)
        let date = `0${selectedDate.getDate()}`.slice(-2)
        let month = `0${selectedDate.getMonth() + 1}`.slice(-2)
        
        return `${date} / ${month}`
    }

    const formtNumber = (value, roundingPoint) => {
        if (value > 1e9) {
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        } else if (value > 1e9) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        } else if (value > 1e3) {
            return `${(value/ 1e3).toFixed(roundingPoint)}K`
        } else {
            return value.toFixed(roundingPoint)
        }
    }

    const getYAxisLabelValues = () => {
        if (chartPrices != undefined) {
            let minvalue = Math.min(...chartPrices)
            let maxValue = Math.max(...chartPrices)

            let midValue = (minvalue + maxValue) / 2

            let higherMidValue = (maxValue + midValue) / 2
            let lowerMidValue = (minvalue + midValue) / 2
            
            let roundingPoint = 2
            
            return [
                // formtNumber(maxValue, roundingPoint),
                // formtNumber(minvalue, roundingPoint),
                // formtNumber(lowerMidValue, roundingPoint),
                // formtNumber(higherMidValue, roundingPoint)
                '100K', '75K' , '25K', '0K'
            ]
        } else {
            return []
        }
    }
        
    return (
        <View
        style={{...contsinerStyle}}
        >

            {/* Y-Axis-Labels */}

            <View
                style={{
                    position: 'absolute',
                    left: SIZES.padding,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'space-between'
            }}
            >
                {
                    getYAxisLabelValues().map((item, index) => {
                        return (
                            <Text key={index}
                                style= {{
                                    color: COLORS.lightGray3,
                                    ...FONTS.body4
                                }}
                            >
                                {item}
                            </Text>
                        )
                    })
                }
            </View>

            {/* Chart */}
            {
                data.length > 0 ?
                <ChartPathProvider
                    data={{
                        points,
                        smoothingStrategy : 'bezier'
                    }}
                >
                    <ChartPath
                        height={150}
                        width={SIZES.width}
                        stroke={COLORS.lightGreen}
                        strokeWidth={2}
                        />
                        
                        <ChartDot>
                            <View
                                style={{
                                    position: 'absolute',
                                    left: -35,
                                    width: 80,
                                    alignItems: 'center',
                                    backgroundColor: COLORS.transparentBlack1
                            }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 25,
                                        height: 25,
                                        borderRadius: 15,
                                        backgroundColor: COLORS.white
                                }}
                                >
                                    <View
                                        style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 15,
                                            backgroundColor: COLORS.lightGreen
                                    }}
                                    >
                                    </View>
                                </View>

                                <ChartYLabel
                                    format={formatView}
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.body5
                                }}
                                />

                                <ChartXLabel
                                    format={formatDateTime}
                                    style={{
                                    marginTop: 3,
                                    color: COLORS.white,
                                        ...FONTS.body5,
                                    lineHeight: 15
                            }}/>
                            </View>
                        </ChartDot>
                    </ChartPathProvider>
                    :
                    <View
                        style={{
                            color: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text>Chart</Text>
                    </View>
            }
        </View>
    )
}

export default Chart
