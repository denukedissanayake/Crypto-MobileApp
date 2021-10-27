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

import { BalanceInfo } from '../components'

const Home = ({ getHoldings, getCoinMarkets, myHoldings, coins }) => {
    
    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarkets()
        },[],)
    )

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
                    displayAmount="45,000"
                    changePct={2.30}
                    containerStyle={{
                        margingTop: 50
                    }}
                />
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


                {/* Top Crypto  */}
            </View>
        </MainLayout>
    )
}


function mapStateToProps(state) {
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