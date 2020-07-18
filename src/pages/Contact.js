import React from 'react';
import {
IonPage,
IonContent,
IonHeader,
IonToolbar,
IonList,
IonItem,
IonLabel,
IonInput, 
IonText,
IonTitle,
IonButton,
IonButtons,
IonIcon,
IonTextarea,
} from '@ionic/react';
import { gql } from 'apollo-boost';
import { chevronBackOutline } from 'ionicons/icons';   
//import {
// Link
//} from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import {CSSTransition} from 'react-transition-group';

const AddContactMessage= gql`
    mutation addContactMessage(
    $organisationName: String!,
    $firstname: String!,
    $lastname: String!,
    $phone: String!,
    $email: String!,
    $message: String!,
    ){
        addContactMessage(
    organisationName: $organisationName,
    firstname: $firstname,
    lastname: $lastname,
    phone: $phone,
    email: $email,
    message: $message,
        ){
            _id
        }
    }
`


function ContactForm() {
    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `email=public@public.com&password=1234`
    }

    const url = "https://apollo.simulacron-3.com/login"

    fetch(url,options)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    alert('Email not found, please retry')
                }
                if (response.status === 401) {
                    alert('Email and password do not match, please retry')
                }
            }
            return response
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("jwt data: ",data)
                //document.cookie = 'token=' + data.token
                localStorage.setItem('token', data.token)
            }
        })



    const [addContactMessage] = useMutation(AddContactMessage);

    let organisationName;
    let firstname;
    let lastname;
    let phone;
    let email;
    let message;

    return(
        <div className="requestAccessInput">
        <IonList>
        <form onSubmit={(e) =>{
            e.preventDefault();
            addContactMessage({ 
                variables: { 
                    organisationName: organisationName.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    phone: phone.value,
                    email: email.value,
                    message: message.value,
                } 
            });
            window.location.href = '/#/contact/success'
        }} >

        <IonItem>
        <IonLabel position="floating">
        Your business name:
        </IonLabel>
        <IonInput 
        name="organisationName"
        type="text"
        inputmode="organization-title"
        autocomplete="text"
        autofocus={true}
        required={true}
        clearInput={true}
        ref={node => {
            organisationName = node;
        }}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="floating">
        First name:
        </IonLabel>
        <IonInput 
        name="firstname"
        type="text"
        inputmode="given-name"
        autocomplete="text"
        required={true}
        clearInput={true}
        ref={node => {
            firstname= node;
        }}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="floating">
        Last name:
        </IonLabel>
        <IonInput 
        name="lastname"
        type="text"
        inputmode="family-name"
        autocomplete="text"
        required={true}
        clearInput={true}
        ref={node => {
            lastname = node;
        }}
        />
        </IonItem>
      
        <IonItem>
        <IonLabel position="floating">
        Phone:
        </IonLabel>
        <IonInput 
        name="phone"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        required={true}
        clearInput={true}
        ref={node => {
            phone = node;
        }}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="floating">
        Email:
        </IonLabel>
        <IonInput 
        name="email"
        type="email"
        inputmode="email"
        autocomplete="email"
        required={true}
        clearInput={true}
        ref={node => {
            email = node;
        }}
        />
        </IonItem>

        <IonItem lines="none">
        <IonLabel>
        Message:
        </IonLabel>
        </IonItem>

        <IonItem lines="none">
        <IonTextarea 
      clearOnEdit={true}
      autoGrow={true}
      inputmode="text"
        placeholder="Your message.."
      style={{border: "1px solid rgb(0,0,0,0.3)", borderRadius:"6px", padding:"0.5em"}}
        ref={node => {
            message = node;
        }}
        >
      </IonTextarea>
        </IonItem>

        <IonItem lines="none" className="text-wrap">
        <IonText color="medium">
        <p>
        We appreciate your interest, thank your for contacting us. 
        <br/>
        After you've received our approval email, you can customise your campaign on the dashboard.
        <br/>
        <br/>
        We do our best to come back to you within 24h.
        </p>
        </IonText>
        </IonItem>

   <IonItem lines="none">
        </IonItem>

        <IonItem lines="none">

        <IonButton
        slot="end"
        size="medium"
        type="submit"
        >
        Submit
        </IonButton>
        </IonItem>

<IonItem lines="none">
        </IonItem>
        </form>
        </IonList>
        </div>

    )



}


class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            businessName: "",
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            animate: true
        }
    }


componentDidMount(){
if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    }
}

    render(){
        return(
<CSSTransition appear in={this.state.animate} timeout={200} key="contact" classNames="my-node">
            <IonPage>

            <IonContent fullscreen={true}>

            <IonHeader mode="ios">
            <IonToolbar style={{paddingTop: "1em"}}>
            <IonButtons slot="start">
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push("/"); }, 100) }} slot="start">
            <IonIcon slot="start" icon={chevronBackOutline}/>
            </IonButton>
            </IonButtons>

<IonTitle size="large" style={{marginLeft:"1em"}}>
            Contact us
            </IonTitle>
            </IonToolbar>
            </IonHeader>

            <ContactForm/>

            </IonContent>
            </IonPage>
            </CSSTransition>
        )
    }

}
export default Contact;
