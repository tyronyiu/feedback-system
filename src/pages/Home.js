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

{/*
    APPLY NOW CARD
*/}
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


{/*
    FEATURES 
    --------
*/}

            <div style={{padding:"1em", paddingLeft:"1.5em"}}>
            <h1 style={{fontWeight:"600"}}>
            Features:  
            </h1>        
            </div>

{/*
    FEATURE #1
*/}
            <IonCard>
            <IonCardHeader>
            <IonCardSubtitle>
            Natural language processing (NLP), sentiment & emotion analysis
            </IonCardSubtitle>           
            <IonCardTitle>
            AI powered analysis
            </IonCardTitle>
            <IonCardSubtitle>
            (Coming Soon)
            </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
            Feedback comments can be analysed with AI technology to gain advanced insights. <br/>
            Basic general sentiment analysis and emotion categorisation can
            tell how well an event was received or how satisfactory a customer
            experience was, without needing score-values.
            </IonCardContent>
            <IonCardHeader>
            <IonCardTitle>
            Language insights
            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            Most relevant words can be categorised into a word cloud, giving you clear overview over specifics of most interactions at a glance. "Good", "Bad" and synonyms provide general context categorisation.
            </IonCardContent>
            </IonCard>


{/*
    FEATURE #2
*/}
<IonCard>
            <IonCardHeader>
            <IonCardSubtitle>
                 
            </IonCardSubtitle>           
            <IonCardTitle>
            AI powered analysis
            </IonCardTitle>
            <IonCardSubtitle>
            (Coming Soon)
            </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
            Feedback comments can be analysed with AI technology to gain advanced insights. <br/>
            Basic general sentiment analysis and emotion categorisation can
            tell how well an event was received or how satisfactory a customer
            experience was, without needing score-values.
            </IonCardContent>
            <IonCardHeader>
            <IonCardTitle>
            Language insights
            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            Most relevant words can be categorised into a word cloud, giving you clear overview over specifics of most interactions at a glance. "Good", "Bad" and synonyms provide general context categorisation.
            </IonCardContent>
            </IonCard>




            <div style={{padding:"1em"}}>
            <h1 style={{fontWeight:"600"}}>
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

{/*
    SHOWCASE IMAGES
*/}

            <div className="flex">
            <img className="flex-image" alt="" src="https://i.ibb.co/1XsMnJ8/Screenshot-2020-07-04-at-20-52-18.png"/>
            <img className="flex-image" alt="" src="https://i.ibb.co/Fxc0bRs/Screenshot-2020-07-04-at-20-52-24.png"/>
            <img className="flex-image" alt="" src="https://i.ibb.co/Cvyq6qB/Screenshot-2020-07-04-at-20-54-42.png"/>
            </div>

            </div>

{/*
    USE CASES
*/}

            <div style={{padding:"1em"}}>
            <h1>
            Use cases:  
            </h1>        

            <IonCard>
            <IonCardHeader>
            <IonCardSubtitle>
            Company internal application
            </IonCardSubtitle>
            <IonCardTitle>
            Employee Feedback
            </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            Having an event or wanna know how things are going directly, yet
            discretly from your employees?
            <br/>
            <br/>
            You can add event specific prompts to comment on, so that no
            matter what, you can gain intelligence insights into your
            operations.
            </IonCardContent>
            <img alt="" style={{filter: "brightness(0.75)"}} src="https://i.ibb.co/FXmTdzy/Screenshot-2020-07-04-at-19-07-48.png"/>
            <IonCardHeader>
            <IonCardSubtitle>
            Advanced insights
            </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
            You can add event specific prompts to comment on, so that no
            matter what, you can gain intelligence insights into your
            operations.
            </IonCardContent>
            </IonCard>
            </div>
            </IonContent>

            </IonPage>
            </div>
        );
}
}

export default Home;
