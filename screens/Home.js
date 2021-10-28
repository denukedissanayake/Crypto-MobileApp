import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ViewBase
} from 'react-native';

import { connect } from 'react-redux';
import { getHoldings, getCoinMarkets } from '../stores/market/marketAction'
import { useFocusEffect } from '@react-navigation/native'

import { MainLayout } from './';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants'

import { BalanceInfo, IconTextButton, Chart } from '../components'

const Home = ({ getHoldings, getCoinMarkets, myHoldings, coins }) => {

    const [selectedCoin, setSelectedCoin] = React.useState(null)
    
    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarkets()
            // console.log(coins[0]?.sparkline_in_7d?.price)
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)
    
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    
    let perChange = valueChange / (totalWallet - valueChange) * 100

    function renderWaletInfoSection() {
        return (
            <View
                style={{
                    paddingHarizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            >
                <BalanceInfo
                    title="Your Wallet"
                    displayAmount={totalWallet}
                    changePct={perChange}
                    containerStyle={{
                        margingTop: 50
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: 15,
                        margingTop: 50,
                        marginBottom: 25,
                        paddingHarizontal :SIZES.radius
                    }}
                >
                    <IconTextButton
                        label='Transfer'
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius,
                            marginLeft: SIZES.radius,
                        }}
                        onPress={()=>console.log('Pressed')}
                    />

                    <IconTextButton
                        label='Withdraw'
                        icon={icons.Withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius,
                            marginLeft: SIZES.radius,
                        }}
                        onPress={()=>console.log('Pressed')}
                    />
                </View>
            </View>
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Header */}
                {renderWaletInfoSection()}

                {/* Charts */}
                <Chart
                    contsinerStyle={{
                        margingTop: SIZES.padding * 2,
                        height: 150
                    }}
                    chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
                    chartPrices={[]}
                />

                {/* Top Crypto  */}
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        margin: 30,
                        marginLeft: 0,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius }}>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3,
                                fontSize: 18
                            }} >
                                Top Crptocrency
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => {

                        let priceColor = (item.price_change_percentage_7d_in_currency == 0) ?
                            COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ?
                                COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                    
                                }}
                                onPress={()=> setSelectedCoin(item)}
                            >
                                {/* Logo */}
                                <View
                                    style={{
                                        width: 25
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </View>

                                {/* Name */}
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text style={{color: COLORS.white, ...FONTS.h3}}>{item.name}</Text>
                                </View>

                                {/* figures */}

                                <View>
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            textAlign: 'right',
                                            ...FONTS.h4,
                                            marginRight: -20
                                    }}
                                    >$ {item.current_price}</Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                            
                                    }}
                                    >
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_in_currency > 0
                                                        ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                                }}
                                            />
                                        }

                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                marginLeft: 5,
                                                ...FONTS.body5,
                                                lineHeight: 15
                                        }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View
                            style={{
                            marginBottom: 50
                        }}
                        />
                    }
                />
            </View>
        </MainLayout>
    )
}


function mapStateToProps(state) {
    // console.log( state.marketReducer.myHoldings)
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins : state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (
            holdings,
            currency,
            orderBy ,
            sparkline,
            priceChangePerc,
            perPage ,
            page) => {
            return dispatch(getHoldings(holdings, currency,orderBy ,sparkline, priceChangePerc,perPage ,page))
        },
        getCoinMarkets: (
            currency,
            orderBy ,
            sparkline,
            priceChangePerc,
            perPage ,
            page) => {
            return dispatch(getCoinMarkets( currency, orderBy , sparkline, priceChangePerc, perPage ,page))
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)