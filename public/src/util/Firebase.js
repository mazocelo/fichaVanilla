class Firebase{
    constructor(){
        this.firebaseConfig = {
            apiKey: "AIzaSyCjaATp6bzuudA16Opq5uuLvHQTIgmtkXU",
            authDomain: "rpg-vanilla.firebaseapp.com",
            databaseURL: "https://rpg-vanilla.firebaseio.com",
            projectId: "rpg-vanilla",
            storageBucket: "rpg-vanilla.appspot.com",
            messagingSenderId: "377066790385",
            appId: "1:377066790385:web:1d0ce2a4fc715892f23850",
            measurementId: "G-ENJC9SS7BP"
          };
          
          this.initFirebase()
    }
        initFirebase(){
            
            // Initialize Firebase
            firebase.initializeApp(this.firebaseConfig);
            firebase.analytics();
    }    
    
    getFirebaseRef(){
        return firebase.database().ref('personagens')
    }
    
}