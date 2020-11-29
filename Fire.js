import firebase from 'firebase';

class Fire { 
    constructor(){
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({                
                apiKey: "AIzaSyCyfwW--2Gl488kG1jkwe15hL37KbPkB50",
                authDomain: "chatapp-ec637.firebaseapp.com",
                databaseURL: "https://chatapp-ec637.firebaseio.com",
                projectId: "chatapp-ec637",
                storageBucket: "chatapp-ec637.appspot.com",
                messagingSenderId: "418957918531",
                appId: "1:418957918531:web:df9caccf755e0e2229aff6",
                measurementId: "G-Y3ETRYGYP7"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                firebase.auth().signInAnonymously();
            }
        })
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message);
        });
    }

    parse = message => {
        const { user, text, timestamp} = message.val()
        const { key: _id} = message
        const createAt = new Date(timestamp)

        return {
            _id,
            createAt,
            text,
            user
        }
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("message");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();