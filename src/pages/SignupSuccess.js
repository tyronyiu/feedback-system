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
import { chevronBackOutline, enterOutline} from 'ionicons/icons';   
import {
 Link
} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';

class RequestAccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            businessName: "",
            firstname: "",
            lastname: "",
            streetAddress: "",
            postcode: "",
            city: "",
            phone: "",
            email: "",
            password: "",
        }
    }


componentDidMount(){
if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    }
}


    handleSubmit = e => {
		e.preventDefault()
		console.log("Im submitting JWT: ",this.state)
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
            Sign up - <IonText color="success">success</IonText>
            </IonTitle>
            </IonToolbar>
            </IonHeader>
            
            <Card 
            title="Thank your for registering!"
            subtitle="Successfully registered"
            content={<>
                Your campaign is ready to use!
                <br/>
                We will contact you shortly regarding usage and billing.
                <br/>
                <br/>
                This is a completely free trial version.
                <br/>
                <br/>
            <Link to="/login">
            <IonButton fill="outline">
                Login
            <IonIcon slot="end" icon={enterOutline}/>
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
export default RequestAccess;
