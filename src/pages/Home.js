import React from 'react';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonButton,
IonText,
IonCardSubtitle,
} from '@ionic/react';

class Home extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: ""
        }
	}



	render(){

  return (
      <div className="Home">
      <IonPage>
      <IonHeader translucent={true}>
      <IonToolbar>
      <IonTitle>
      Ager Feedback System
      </IonTitle>
      </IonToolbar>
      </IonHeader>


      <IonContent fullscreen={true}>
      <IonHeader collapse="condense">
      <IonToolbar>
      <IonTitle size="large">
      Ager 
      </IonTitle>
      </IonToolbar>
      </IonHeader>

      <IonCard>
      <img alt="" style={{filter: "brightness(0.75)"}} src="https://i.ibb.co/FXmTdzy/Screenshot-2020-07-04-at-19-07-48.png"/>
      <IonCardHeader>
      <IonCardSubtitle>
      Ager Feedback System
      </IonCardSubtitle>
      <IonCardTitle>
      Apply now
      </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        We are officially launching the beta round for our new feedback system.
      <br/>
        It provides instant feedback with an incredibly intuitive user interface. 
<br/>
<br/>
      <a href="mailto:contactager@gmail.com">
    <IonButton>
        Contact us
      </IonButton>
      </a>


      </IonCardContent>
      </IonCard>

      </IonContent>

      </IonPage>
      </div>
  );
}
}

export default Home;
