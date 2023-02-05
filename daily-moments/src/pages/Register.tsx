import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';


const RegisterPage: React.FC = () => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRegister= async() => {
    try {
      setError(false);
      setLoading(true);
      // const credentials = await auth.signInWithEmailAndPassword('test1@gmail.com', 'test1234');
      const credentials = await auth.createUserWithEmailAndPassword(email, password);
      console.log('credentials', credentials);
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
          <IonTitle>Register page</IonTitle>
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
        {error && <IonText color="danger">Registration failed</IonText>}
        <IonButton expand='block' onClick={handleRegister}>Create an account</IonButton>
        <IonButton expand='block' routerLink='/login' fill='default'>Already have an account</IonButton>
        <IonLoading isOpen={loading}/>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
