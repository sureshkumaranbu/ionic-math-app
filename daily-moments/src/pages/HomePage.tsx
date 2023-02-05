import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSlides, IonSlide, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useAuthInit } from '../auth';
const HomePage: React.FC = () => {
  // const [entries, setEntries] = useState<Entry[]>([]);
  // useEffect(() => {
  //   const entriesRef = firestore.collection('entries');
  //   return entriesRef.orderBy('date', 'desc').onSnapshot(({docs}) => setEntries(docs.map(toEntry)));
  // }, [])
  // function formatDate(isoString) {
  //   return new Date(isoString).toLocaleDateString('en-us', {
  //     day: 'numeric', month: 'short', year: 'numeric'
  //   });
  // }
  const today = new Date();
  const date = today.toLocaleDateString();
  const time = today.toLocaleTimeString();
  const day = today.toLocaleString('default', { weekday: 'long' }); 
  const {auth} = useAuthInit();
  const slidesOpts = {
    initialSlide: 0,
    speed: 500
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonItem>
              <IonLabel>Hello {auth?.user?.displayName}</IonLabel>
              <IonLabel>{day} {date} {time}</IonLabel>
          </IonItem>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSlides options={slidesOpts}>
          <IonSlide>
            <IonButton routerLink='/my/addition/easy'>Addition Easy</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/addition/medium'>Addition Medium</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/addition/hard'>Addition Hard</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/addition/expert'>Addition Expert</IonButton>
          </IonSlide>
        </IonSlides>
        <IonSlides options={slidesOpts}>
          <IonSlide>
            <IonButton routerLink='/my/subtraction/easy'>Subtraction Easy</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/subtraction/medium'>Subtraction Medium</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/subtraction/hard'>Subtraction Hard</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/subtraction/expert'>Subtraction Expert</IonButton>
          </IonSlide>
        </IonSlides>
        <IonSlides options={slidesOpts}>
          <IonSlide>
            <IonButton routerLink='/my/multiplication/easy'>Multiplication Easy</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/multiplication/medium'>Multiplication Medium</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/multiplication/hard'>Multiplication Hard</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/multiplication/expert'>Multiplication Expert</IonButton>
          </IonSlide>
        </IonSlides>
        <IonSlides options={slidesOpts}>
          <IonSlide>
            <IonButton routerLink='/my/division/easy'>Division Easy</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/division/medium'>Division Medium</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/division/hard'>Division Hard</IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton routerLink='/my/division/expert'>Division Expert</IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
