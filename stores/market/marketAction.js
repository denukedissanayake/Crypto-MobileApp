import axios from "axios";

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN'
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS'
export const GET_HOLDINGS_FALUIRE = 'GET_HOLDINGS_FALUIRE'

export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN'
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS'
export const GET_COIN_MARKET_FALUIRE = 'GET_COIN_MARKET_FALUIRE'

export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN

})

export const getHoldingsSucces = (myHoldings) => ({
    type: GET_HOLDINGS_SUCCESS,
    payload: {myHoldings}

})

export const getHoldingsFaluire = (error) => ({
    type: GET_HOLDINGS_FALUIRE,
    payload: {error}

})

export function getHoldings(
    holdings = [],
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1) {
    
    return dispatch => {
        dispatch(getHoldingsBegin())

        let ids = holdings.map(item => {
            return item.id
        }).join("")

        let APIURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`

        return axios({
            url: APIURL,
            method: 'GET',
            header: {
                Accept: 'application/json'
            }
        }).then(responce => {

            console.log("Get Holdings")
            // console.log(responce)

            if (responce.status == 200) {
                let myHoldings = responce.data.map(item => {
                    let coin = holdings.find(a => a.id == item.id)
                    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
                    
                    return {
                        id: item.is,
                        symbol: item.symbol,
                        name: item.name,
                        image: item.image,
                        current_price: item.current_price,
                        qty: coin.qty,
                        total: coin.qty * item.current_price,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                        holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                        sparkline_in_7d: {
                            valur: item.sparkline_in_7d.map(price => {
                                return price * coin.qty
                            })
                        }

                    }
                })

                dispatch(getHoldingsSucces(myHoldings)) 
            } else {
                dispatch(getHoldingsFaluire(responce.data))
            }
        }).catch(error => {
            dispatch(getHoldingsFaluire(error))
        } )
    }
    
}

export const getCoinMarkeBegin = () => ({
    type : GET_COIN_MARKET_BEGIN
})

export const getCoinMarkeSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: {coins}
})

export const getCoinMarkeFaluire = (error) => ({
    type: GET_COIN_MARKET_FALUIRE,
    payload: {error}
})

export function getCoinMarkets(
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1
) {
    return dispatch => {
        dispatch(getCoinMarkeBegin())

        let APIURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        return axios({
            url: APIURL,
            method: 'GET',
            header: {
                Accept: 'application/json'
            }
        }).then(responce => {

            console.log("Get Coin Market")
            // console.log(responce)

            if (responce.status == 200) {
                dispatch(getCoinMarkeSuccess(responce.data))
            } else {
                dispatch(getCoinMarkeFaluire(responce.data))
            }
        }).catch(error => {
            dispatch(getCoinMarkeFaluire(error))
        })
    }
}