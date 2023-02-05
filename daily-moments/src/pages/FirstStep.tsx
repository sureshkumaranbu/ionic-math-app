import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSlides, IonSlide, IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonRow, IonCol } from '@ionic/react';
import { useAuthInit } from '../auth';
import { useParams, useHistory } from 'react-router';
import { close as closeIcon } from 'ionicons/icons';
interface RouteParams {
  level: string;
  type: string;
}
const FirstStep: React.FC = () => {
  const {auth} = useAuthInit();
  const { type, level } = useParams<RouteParams>();
  const history =  useHistory();
  const handleBack = () => {
    history.goBack();
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonItem>
              <IonLabel>{type}</IonLabel>
              <IonLabel>{level}</IonLabel>
              <IonButtons slot='end'>
                <IonButton onClick={handleBack}>
                  <IonIcon icon={closeIcon} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {[...Array(10)].map((_, index) => (
          <IonRow key={index}>
            <IonCol>
              <IonButton expand='block' routerLink={`/my/${type}/${level}/${index + 1}`}>{index + 1}</IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default FirstStep;
