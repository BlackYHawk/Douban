/**
 * Created by heyong on 2017/1/2.
 */
import React, { Component } from 'react'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {createStore, applyMiddleware} from 'redux'
import {AsyncStorage} from 'react-native'
import apiRequest from './helper/apiRequestMiddleware'
import Home from './pages/MainScreen'

const createStoreWithMiddleware = applyMiddleware(thunk, apiRequest)(createStore)
const store = autoRehydrate()(createStoreWithMiddleware)(reducers)
persistStore(store, {storage: AsyncStorage})

import {
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    View
} from 'react-native'
import { StackNavigator } from 'react-navigation';

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const NAV_BAR_HEIGHT = (Platform.OS === 'ios' ? 44 : 56)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19

const StackNav = StackNavigator({
    Home : {screen : Home}
}, {
    initialRouteName: 'Home', // 默认显示界面
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
})

export default class extends Component {
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    I'm in the Drawer!
                </Text>
            </View>
        );
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor='transparent'
                        style={{height: STATUS_BAR_HEIGHT}}
                        translucent={ABOVE_LOLIPOP}
                    />
                    <StackNav />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});