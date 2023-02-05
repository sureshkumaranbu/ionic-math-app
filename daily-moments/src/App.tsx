import { IonApp, IonLoading } from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import AppTabs from './AppTabs';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/Register';


const App: React.FC = () => {
  const {loading, auth} = useAuthInit();
  console.log(`rendering App with loggedIn=${auth}`);
  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <Switch>
          <Route exact path='/login'>
            <LoginPage/>
          </Route>
          <Route exact path='/register'>
            <RegisterPage/>
          </Route>
          <Route path="/my">
            <AppTabs />
          </Route>
          <Redirect exact path='/' to='/my/home'/>
          <Route>
            <NotFoundPage/>
          </Route>
        </Switch>  
      </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
