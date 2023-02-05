import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import HomePage from './pages/HomePage';
import { Redirect, Route } from 'react-router-dom';
import SettingsPage from './pages/Settings';
import { useAuth } from './auth';
import FirstStep from './pages/FirstStep';
import Calculation from './pages/Calculation';

const AppTabs: React.FC= () => {
  const {loggedIn} = useAuth();
  if(!loggedIn) {
    return <Redirect to="/login" />
  }
  return (
      <IonRouterOutlet>
        <Route exact path='/my/home'>
          <HomePage />
        </Route>
        <Route exact path='/my/:type/:level'>
            <FirstStep />
        </Route>
        <Route exact path='/my/:type/:level/:subLevel'>
            <Calculation />
        </Route>
        <Route exact path='/my/settings'>
          <SettingsPage />
        </Route>
        <Redirect exact path='/' to='/my/home'/>
      </IonRouterOutlet>
  );
};

export default AppTabs;
