import React from 'react';
import {
IonPage,
IonContent,
IonHeader,
IonToolbar,
IonTitle,
IonButton,
IonButtons,
IonIcon,
IonText,
} from '@ionic/react';
import Card from '../components/Card';
import { chevronBackOutline, homeOutline} from 'ionicons/icons';   
import {
 Link
} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';

class ContactSuccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                  }
    }


componentDidMount(){
if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    }
}

    render(){
        return(
<CSSTransition appear in={this.state.animate} timeout={200} key="requestAccess" classNames="my-node">
            <IonPage>
            <IonContent fullscreen={true}>

            <IonHeader collapse="condense" mode="ios">
<IonToolbar style={{paddingTop: "1em"}}>
            <IonButtons slot="start">
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push("/"); }, 100) }} slot="start">
            <IonIcon slot="start" icon={chevronBackOutline}/>
            </IonButton>
            </IonButtons>

<IonTitle size="large" style={{marginLeft:"1em"}}>
           <IonText color="success">success</IonText>
            </IonTitle>
            </IonToolbar>
            </IonHeader>
            
            <Card 
            title="Thank your for contacting us!"
            subtitle="Successfully submitted message"
            content={<>
                We received your message and will deal with your request as soon as possible. 
                <br/>
                We will respond to you shortly.
                <br/>
                <br/>
            <Link to="/">
            <IonButton fill="outline">
                Home
            <IonIcon slot="end" icon={homeOutline}/>
            </IonButton>
            </Link>
                </>}
            />

            </IonContent>
            </IonPage>
            </CSSTransition>
        )
    }

}
export default ContactSuccess;
