import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../utils/apolloClient'

Vue.use(Vuex)

let cart = JSON.parse(localStorage.getItem('cart'))

export default new Vuex.Store({
    state: {
        products: [],
        currencies: [],
        cart: cart,
        currency: "USD",
        cartOpen: false
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        setCurrencies(state, currencies) {
            state.currencies = currencies
        },
        updateCart(state, newItem) {
            state.cart = newItem
        },
        openCart(state) {
            state.cartOpen = true
        },
        closeCart(state) {
            state.cartOpen = false
        },
        setCurrency(state, newCurrency) {
            state.currency = newCurrency;
        }
    },
    actions: {
        async getProducts({
            commit
        }) {
            const response = await apolloClient.query({
                query: gql `
                    query {  
                    products {
                        id
                        title
                        price(currency: ${this.state.currency})
                        image_url
                        }
                    }
                `,
                update: (data) => data.products,
            })
            commit('setProducts', response.data.products)
        },
        async getCurrencies({
            commit
        }) {
            const response = await apolloClient.query({
                query: gql `
                    query {
                    currency
                    }
                `,
                update: (data) => data.currency
            })
            commit('setCurrencies', response.data.currency)
        },
        addToCart({ commit, getters }, payload) {
            let oldItems = JSON.parse(localStorage.getItem('cart'));

            if (oldItems) {
                let payloadIndex = oldItems.findIndex((item => item.id == payload.id));
                if (getters.getAllIdInCart.indexOf(payload.id) && payloadIndex > -1) {
                    oldItems[payloadIndex].amount++;
                } else {
                    oldItems = [...oldItems, payload];
                }
            } else {
                oldItems = [payload];
            }

            localStorage.setItem('cart', JSON.stringify(oldItems))
            commit('updateCart', oldItems);
            commit('openCart')
        },
        increaseItemSize({commit}, id) {
            let oldItems = JSON.parse(localStorage.getItem('cart'));
            let payloadIndex = oldItems.findIndex((item => item.id == id));
            oldItems[payloadIndex].amount++;
            localStorage.setItem('cart', JSON.stringify(oldItems))
            commit('updateCart', oldItems);
        },
        reduceItemSize({dispatch,commit}, id) {
            let oldItems = JSON.parse(localStorage.getItem('cart'));
            let payloadIndex = oldItems.findIndex((item => item.id == id));
            if(oldItems[payloadIndex].amount === 1) {
                dispatch('removeItem', id)
            } else{
                oldItems[payloadIndex].amount--
            }
            localStorage.setItem('cart', JSON.stringify(oldItems))
            commit('updateCart', oldItems);
        },
        removeItem({commit}, id) {
            let oldItems = JSON.parse(localStorage.getItem('cart'));
            let payloadIndex = oldItems.findIndex((item => item.id == id));
            oldItems.splice(payloadIndex, 1)
            localStorage.setItem('cart', JSON.stringify(oldItems))
            commit('updateCart', oldItems);
        },
        updateCurrency({
            dispatch,
            commit
        }, currency) {
            commit('setCurrency', currency)
            dispatch('getProducts')
        }
    },
    getters: {
        getAllIdInCart({cart}) {
            let total = []
            if (cart) {
                cart.forEach(item => {
                    total.push(item.id)
                })
            }
            return total
        },
        getTotalItemsInCart({cart}) {
            if (cart) {
                return cart.reduce((total, item) => item.amount + total,0);
            }
            else{
                return 0;
            }
        },
        getItemAmountInCart({cart}) {
            return (id) => {
                let index = cart.findIndex((item => item.id == id));
                if (index > -1) {
                    return cart[index].amount;
                }
            }
        },
        getSubTotal({cart}) {
            if (cart) {
                return cart.reduce((total, product) => (product.price * product.amount) + total,0);
            }
            else{
                return 0;
            }
        }
    }
});