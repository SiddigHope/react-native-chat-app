import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import { ListItem, TouchableScale, Badge } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { setChannel, setPrivateChannel } from '../redux/actions/channelActions';

const ScreenHeigth = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

class UserList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.unreadCount !== this.props.unreadCount || 
        nextProps.isTyping !== this.props.isTyping;
    }

    handlePress = () => {
        this.props.setChannel(this.props.user);
        this.props.setPrivateChannel(true);
        this.props.navigation.navigate('ChatWindow')
    }

    render() {
        const { user } = this.props;
        console.log('FLATLIST USER');
        // console.log(this.props.isTyping)
        return (
            <ListItem
                Component={TouchableScale}
                friction={90} //
                onPress={this.handlePress}
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                containerStyle={{ backgroundColor: 'transparent' }}
                rightIcon={
                    this.props.unreadCount && this.props.unreadCount.count ? 
                    <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#f80000' }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>{this.props.unreadCount ? this.props.unreadCount.count : null}</Text>
                    </View> : null
                }
                // linearGradientProps={{
                // colors: ['#FF9800', '#F44336'],
                // start: [1, 0],
                // end: [0.2, 0],
                // }}
                // ViewComponent={LinearGradient} // Only if no expos
                leftAvatar={{ rounded: true, source: { uri: user.avatar } }}
                title={user.name}
                titleStyle={{ color: 'white', fontFamily: 'RobotoMono-Regular', fontSize: 14 }}
                subtitleStyle={{ color: 'white' }}
                subtitle={
                    this.props.isTyping && this.props.isTyping.typing ? 
                    <Text style={{ color: '#1DB954', fontFamily: 'RototoMono-Regular', fontSize: 10 }}>Typing..</Text>
                    : null
                }
                chevron={{ color: 'grey' }}
                //badge={<Badge status="error" value={this.props.unreadCount.count} />}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: ScreenHeigth*0.02,
        //borderRadius: 20
        //flexDirection: 'row'
    },
    itemContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        height: ScreenHeigth*0.08
    },
    imageContainer: {
        flex: 0.1,
        marginLeft: ScreenWidth*0.04
    },  
    detailsContainer: {
        flex: 0.7,
        marginLeft: ScreenWidth*0.05
    },
    status: {
        flex: 0.2
    },
    nameText: {
        fontFamily: 'RobotoMono-Medium'
    }
})

export default withNavigation(connect(null, { setPrivateChannel, setChannel })(UserList))