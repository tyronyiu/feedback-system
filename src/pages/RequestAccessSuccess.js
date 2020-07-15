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
} from '@ionic/react';
import Card from '../components/Card';
import { exitOutline} from 'ionicons/icons';   
import {
 Link
} from "react-router-dom";

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
            <IonPage>
            <IonContent fullscreen={true}>

            <IonHeader collapse="condense" mode="ios">
            <IonToolbar style={{paddingTop: "1em"}}>
            <IonTitle size="large">
            Sign up - Success
            </IonTitle>
            <IonButtons slot="end">
            <Link to="/">
            <IonButton>
            <IonIcon slot="end" icon={exitOutline}/>
            </IonButton>
            </Link>
            </IonButtons>

            </IonToolbar>
            </IonHeader>
            
            <Card 
            title="Thank your for registering!"
            subtitle="Successfully registered"
            content={<>
                Your campaign is being set up.
                <br/>
                We will contact you shortly.
                <br/>
                <br/>
            <Link to="/">
            <IonButton fill="outline">
                Done
            <IonIcon slot="end" icon={exitOutline}/>
            </IonButton>
            </Link>
                </>}
            />

            </IonContent>
            </IonPage>
        )
    }

}
export default RequestAccess;
