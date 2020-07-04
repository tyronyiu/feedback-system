import React from 'react';
import './Home.css';
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


      <div style={{padding:"1em"}}>
<h1>
      Instant availability & customisation 
      </h1>

      <IonText color="medium" mode="ios">
      <p>
      You let us know a few details and we deliver your feedback campaign in less than 24h.
      </p>

      <p>
      We adapt your feedback campaign with to your brand by including a visual stimulation, so that you can make your campaign truly yours!
      </p>

      {/*<hr style={{height:"0",border:"0.5px solid"}}/>*/}
      </IonText>
     
      <div className="flex">
      <img className="flex-image" alt="" src="https://i.ibb.co/1XsMnJ8/Screenshot-2020-07-04-at-20-52-18.png"/>
      <img className="flex-image" alt="" src="https://i.ibb.co/Fxc0bRs/Screenshot-2020-07-04-at-20-52-24.png"/>
      <img className="flex-image" alt="" src="https://i.ibb.co/Cvyq6qB/Screenshot-2020-07-04-at-20-54-42.png"/>
      </div>

      </div>

      </IonContent>

      </IonPage>
      </div>
  );
}
}

export default Home;
