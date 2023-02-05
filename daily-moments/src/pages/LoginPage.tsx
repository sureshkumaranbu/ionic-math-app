import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth, provider } from '../firebase';


const LoginPage: React.FC = () => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async(signInType) => {
    try {
      setError(false);
      setLoading(true);
      // const credentials = await auth.signInWithEmailAndPassword('test1@gmail.com', 'test1234');
      if(signInType === 'email') {
        const credentials = await auth.signInWithEmailAndPassword(email, password);
        console.log('credentials', credentials);
      }
      if(signInType === 'google') {
        
        const credentials = await auth.signInWithPopup(provider).then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('credentials', credential);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

        
      // const result = await firebase.auth().signInWithPopup(provider);
      }
      setLoading(false);
    } catch(error) {
      console.log('error:', error)
      setError(true);
      setLoading(false);
    }
    
  }

  if(loggedIn) {
    return <Redirect to="/my/home" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput type='text' defaultValue={email} onIonChange={(event) => setEmail(event.detail.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Password</IonLabel>
            <IonInput type='password' defaultValue={password} onIonChange={(event) => setPassword(event.detail.value)}/>
          </IonItem>
        </IonList>
        {error && <IonText color="danger">Invalid credentials</IonText>}
        <IonButton expand='block' onClick={() => handleLogin('email')}>Login</IonButton>
        <IonButton expand='block' onClick={() => handleLogin('google')}>Login with Google</IonButton>
        <IonButton expand='block' routerLink='/register' fill='default'>dont have an account</IonButton>
        <IonLoading isOpen={loading}/>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
