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
} from '@ionic/react';
import { gql } from 'apollo-boost';
import { chevronBackOutline } from 'ionicons/icons';   
//import {
// Link
//} from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import {CSSTransition} from 'react-transition-group';

const AddRegisteredClient = gql`
    mutation addRegisteredClient(
    $organisationName: String!,
    $campaignName: String!
    $firstname: String!,
    $lastname: String!,
    $streetAddress: String!,
    $postcode: String!,
    $city: String!,
    $phone: String!,
    $email: String!,
    $password: String!,
    ){
        addRegisteredClient(
    organisationName: $organisationName,
    campaignName: $campaignName,
    firstname: $firstname,
    lastname: $lastname,
    streetAddress: $streetAddress,
    postcode: $postcode,
    city: $city,
    phone: $phone,
    email: $email,
    password: $password,
        ){
            _id
        }
    }
`


function RegisterClient() {
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



    const [addRegisteredClient] = useMutation(AddRegisteredClient);

    let organisationName;
    let campaignName;
    let firstname;
    let lastname;
    let streetAddress;
    let postcode;
    let city;
    let phone;
    let email;
    let password;

    return(
        <div className="requestAccessInput">
        <IonList>
        <form onSubmit={(e) =>{
            e.preventDefault();
            addRegisteredClient({ 
                variables: { 
                    organisationName: organisationName.value,
                    campaignName: campaignName.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    streetAddress: streetAddress.value,
                    postcode: postcode.value,
                    city: city.value,
                    phone: phone.value,
                    email: email.value,
                    password: password.value,
                } 
            });
            window.location.href = '/#/signup/success'
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
        Feedback campaign name:
        </IonLabel>
        <IonInput 
        name="campaignName"
        type="text"
        inputmode="text"
        autocomplete="text"
        placeholder="My awesome campaign"
        autofocus={true}
        required={true}
        clearInput={true}
        ref={node => {
            campaignName = node;
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
        Street & no:
        </IonLabel>
        <IonInput 
        name="street-address"
        type="text"
        inputmode="text"
        autocomplete="street-address"
        required={true}
        clearInput={true}
        ref={node => {
            streetAddress = node;
        }}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="floating">
        Postcode:
        </IonLabel>
        <IonInput 
        name="postcode"
        type="text"
        inputmode="text"
        autocomplete="postal-code"
        required={true}
        clearInput={true}
        ref={node => {
            postcode = node;
        }}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="floating">
        City:
        </IonLabel>
        <IonInput 
        name="city"
        type="text"
        inputmode="text"
        autocomplete="country-name"
        required={true}
        clearInput={true}
        ref={node => {
            city = node;
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

        <IonItem>
        <IonLabel position="floating">
        Password:
        </IonLabel>
        <IonInput 
        name="password"
        type="password"
        clearInput={true}
        clearOnEdit={true}
        required={true}
        autocomplete="new-password"
        ref={node => {
            password = node;
        }}
        onKeyPress={((e) =>{
            if (e.key === 'Enter'){
                e.preventDefault();
                addRegisteredClient({ 
                    variables: { 
                        organisationName: organisationName.value,
                        firstname: firstname.value,
                        lastname: lastname.value,
                        streetAddress: streetAddress.value,
                        postcode: postcode.value,
                        city: city.value,
                        phone: phone.value,
                        email: email.value,
                        password: password.value,
                    } 
                });
            window.location.href = '/#/signup/success'
            }
        })}
        />
        </IonItem>



        <IonItem lines="none" className="text-wrap">
        <IonText color="medium">
        <p>
        These details will be used to create your campaign.
        <br/>
        After you've received our approval email, you can customise your campaign on the dashboard.
        <br/>
        <br/>
        We do our best to review your campaign within 24h.
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

        </form>
        </IonList>
        </div>

    )



}


class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
<CSSTransition appear in={this.state.animate} timeout={200} key="requestAccess" classNames="my-node">
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
            Sign up
            </IonTitle>
            </IonToolbar>
            </IonHeader>

            <RegisterClient />

            </IonContent>
            </IonPage>
            </CSSTransition>
        )
    }

}
export default Signup;
