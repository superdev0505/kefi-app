import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends
} from '../../components';
import {scale,  scaleVertical} from '../../utils/scale';
import * as firebase from "firebase";
import { Entypo } from '@expo/vector-icons';
import { Share } from 'react-native';
import {  WebBrowser } from 'expo';
import { registerForPushNotificationsAsync } from '../../register';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';


export class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: '',
        };
    };

  constructor(props) {
    super(props);

    this.state = {
      sendPush: true,
      shouldRefresh: false,
      twitterEnabled: true,
      googleEnabled: false,
      facebookEnabled: true,
      reminderYear: {key: 1, value: 'Am'},
      reminderMonth: 7,
      reminderDay: 30,
      isDateTimePickerVisible: false,
      setTime:'',
      pickerTime:new Date(),
      shareVisible: false,
    }
    this._handlePressButtonAsync = this._handlePressButtonAsync.bind(this);
  }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date.toString());
        this._hideDateTimePicker();
        
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const timestamp =  hour * 60 + minute;
        this.setState({
            setTime: hour + ':' + minute,
            pickerTime: date,
        });

        console.log("date:", date.toString(), "hour:",hour, "min:", minute, "local:", date.toLocaleTimeString());
        registerForPushNotificationsAsync();
        AsyncStorage.getItem('user_id', (err, userId) => {
            firebase.database().ref('/reminderTime/'+ userId).set({
                rTime: timestamp,
                ViewedTour: true, 
                userId: userId,
            })
        });

    };
    onCancel() {
        this.setState({shareVisible:false});
    }
    onOpen() {
        Share.share({
            message: 'Check out kefilife360.com and download your daily dose of Kefi!',
            url: 'kikivale.com',
            title: 'Wow, did you see that?'
        }, {
            // Android only:
            dialogTitle: 'Check out kefilife360.com and download your daily dose of Kefi!',
            // iOS only:
            excludedActivityTypes: [
                'Check out kefilife360.com and download your daily dose of Kefi!'
            ]
        })
    }

    signOut() {
        AsyncStorage.clear();
        this.props.navigation.navigate('homeAnimation');
    }
    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('http://kefilife365.com/');
        this.setState({ result });
    };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
        <View style={styles.section}>
            <View style={[styles.expireDateBlock]}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode="time"
                    date={this.state.pickerTime}
                    is24Hour={true}
                />
            </View>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header6'>SETTINGS</RkText>
          </View>
          <TouchableOpacity
              delayPressIn={70}
              activeOpacity={0.8} style={styles.row}
              onPress={() => this._showDateTimePicker()}>
              <RkText rkType='header6'>Time Reminder</RkText>
              <RkText rkType='header6'>{this.state.setTime} {<Entypo name='chevron-right' style={styles.rightArrow}/>}</RkText>
          </TouchableOpacity>
          <TouchableOpacity
                delayPressIn={70}
                activeOpacity={0.8} style={styles.row}
                onPress={() => this.onOpen()}>
              <RkText rkType='header6'>Share the app</RkText>
              <RkText rkType='header6'> {<Entypo name='chevron-right' style={styles.rightArrow}/>} </RkText>
          </TouchableOpacity>
            <TouchableOpacity
                delayPressIn={70}
                activeOpacity={0.8} style={styles.row}
                onPress={() => this._handlePressButtonAsync()}>
                <RkText rkType='header6'>About</RkText>
                <RkText rkType='header6'> {<Entypo name='chevron-right' style={styles.rightArrow}/>} </RkText>
            </TouchableOpacity>
          <TouchableOpacity
              delayPressIn={70}
              activeOpacity={0.8} style={styles.row}
              onPress={() => this.props.navigation.navigate('legal')}>
            <RkText rkType='header6'>Legal</RkText>
            <RkText rkType='header6'> {<Entypo name='chevron-right' style={styles.rightArrow}/>} </RkText>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
            <RkButton rkType='stretch'
                      style={styles.save}
                      onPress={() => this.signOut()}>
                <RkText> Sign Out</RkText>
            </RkButton>
        </View>
        </View>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: '#ffffff',
    },
    contentWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        height: scaleVertical(580),
    },
    header: {
        paddingVertical: 25
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: scaleVertical(20),
        paddingTop: 30,
        justifyContent: 'space-around',
    },
    save: {
        marginVertical: 10,
        height:60,
        backgroundColor: '#ddd',
        borderRadius: 45,
        width:scale(280),
    },
    section: {
        marginBottom: 25,
    },
    rightArrow: {
      fontSize: 22
    },
    heading: {
        paddingBottom: 12.5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 17.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border.base,
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
}));