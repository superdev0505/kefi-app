/**
 * Created by alexei on 6/7/2018.
 */
import React from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    RkText,
    RkStyleSheet,
} from 'react-native-ui-kitten';
import {
    RkSwitch,
} from '../../components';
import {scale,  scaleVertical} from '../../utils/scale';
import * as firebase from "firebase";
import { Entypo } from '@expo/vector-icons';
import { Share } from 'react-native';

export class Legal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: '',
        };
    };

    constructor(props) {
        super(props);
        this.state={
            legaltext:'',
            legalTitle:'',
            legalVersion: '',
        }

    }
    async getLegal() {
        try {
            await   firebase.database().ref('docs/').on('value', (snapshot) => {
                let resultObj = snapshot.val();
                let resultLegal = resultObj.Text;
                let resultTitle = resultObj.Title;
                let resultversion = resultObj.Version;
                this.setState({
                    legaltext: resultLegal,
                    legalTitle: resultTitle,
                    legalVersion:resultversion,
                })
            });
        } catch (error) {
            // console.log(error.toString());
        }
    }

    componentWillMount(){
        this.getLegal();
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentWrapper}>
                    <View style={styles.section}>
                        <View style={[styles.row, styles.heading]}>
                            <RkText rkType='header6'> {this.state.legalTitle}</RkText>
                        </View>
                        <View style={styles.row}>
                            <RkText rkType='header6'>
                                {this.state.legaltext}
                            </RkText>
                        </View>
                        <View style={styles.row}>
                            <RkText rkType='header6'>
                                {this.state.legalVersion}
                            </RkText>
                        </View>
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
        height: scaleVertical(580)

    },
    section: {
        marginBottom: 25,
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
    },
}));