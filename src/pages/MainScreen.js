import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadData} from '../reducers/data'
import PureListView from '../components/PureListView'
import Topic from './Topic'

import {
    View,
    Image,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

const SCHEDULE_IMAGES = [
    {
        active: require('../assets/schedule-23-active.png'),
        inactive: require('../assets/schedule-23.png')
    },
    {
        active: require('../assets/schedule-24-active.png'),
        inactive: require('../assets/schedule-24.png')
    }
]

const API = 'https://api.douban.com/v2/movie/in_theaters'

class MainScreen extends React.Component {
    static propTypes = {
        loadData: PropTypes.func,
        loading: PropTypes.bool.isRequired,
        movies: PropTypes.object.isRequired
    };

    render() {
        const {loading, movies, onSegmentSelected} = this.props
        if (loading || movies.total === 0) {
            return (
                <View style={[styles.container, styles.center]} >
                    <ActivityIndicator size='small' />
                </View>
            )
        }

        return (
            <PureListView data={movies.subjects}
                          title={movies.subjects[0].title}
                          renderRow={this.renderRow}
                          enableEmptySections
                          renderSectionHeader={this.renderSectionHeader} />
        )
    }

    renderRow = (item, index) => {
        if (item.is_rest) {
            return <Topic topic={item} isSubscribed={item.isSubscribed}/>
        }
        return (
            <TouchableOpacity onPress={() => this.goToCarousel(item)}>
                <Topic topic={item} isSubscribed={item.isSubscribed}/>
            </TouchableOpacity>
        )
    }

    renderSectionHeader = (sessionData, sessionTitle) => {
        return (
            <View key={sessionTitle} style={{backgroundColor: '#eeeeee'}}>
                <Text style={[{margin: 6, marginLeft: 8}, styles.font]}>{sessionTitle}</Text>
            </View>
        )
    }

    goToCarousel = (item) => {

    }

    componentDidMount () {
        this.props.loadData(API)
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 28,
        width: 28
    }
})

const mapStateToProps = state => ({
    loading: state.data.loading,
    error: state.data.error,
    movies: state.data.movies
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({loadData}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen)