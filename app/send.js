import { Util, Permissions, Notifications, Constants } from 'expo'
const PUSH_ENDPOINT = 'https://exponent-push-server.herokuapp.com/tokens';
import * as firebase from "firebase";
import {notifications} from "./data/raw/notifications";

export const sendPushNotification = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    )

    this.tokens = [];
    await firebase.database().ref('/users').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

            if(this.tokens.indexOf(childSnapshot.val().token) == -1){
                this.tokens.push(childSnapshot.val().token);
            }
        });
    });
    let i=0;
    for(i=0; i<this.tokens.length; i++)
    {
        await fetch('https://exp.host/--/api/v2/push/send', {
            body: JSON.stringify({
                to: tokens[i],
                title: "Notification",
                body: notifications,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
    }
}