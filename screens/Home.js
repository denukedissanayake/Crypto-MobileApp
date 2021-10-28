import React from 'react';

import {
    View,
    Text
} from 'react-native';

import { connect } from 'react-redux';
import { getHoldings, getCoinMarkets } from '../stores/market/marketAction'
import { useFocusEffect } from '@react-navigation/native'

import { MainLayout } from './';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants'

import { BalanceInfo, IconTextButton, Chart } from '../components'

const Home = ({ getHoldings, getCoinMarkets, myHoldings, coins }) => {
    
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
                        margingTop: SIZES.padding * 2
                    }}
                    // chartPrices={coins[0]?.sparkline_in_7d?.price}
                    chartPrices={[]}
                />

                {/* Top Crypto  */}
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