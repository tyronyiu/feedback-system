import React from 'react';
import './Login.css';
import {
IonPage,
IonContent,
IonHeader,
IonToolbar,
IonList,
IonItem,
IonLabel,
IonInput, 
IonTitle,
IonButton,
IonButtons,
IonIcon,
} from '@ionic/react';
import { chevronBackOutline} from 'ionicons/icons';   
//import {
// Link
//} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';


class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            animate: true,
        }
    }



componentDidMount(){
if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    }
}

// this.props.history.push(`/`)

    handleSubmit = e => {
		e.preventDefault()
		console.log("Im submitting JWT: ",this.state)

		const options = {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `email=${this.state.email.toLowerCase()}&password=${this.state.password}`
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
					this.props.history.push(`/id/${data.clientId}/campaigns/`)
				}
			})

        }

    render(){
		const { email, password } = this.state
		return(
        <CSSTransition appear in={this.state.animate} timeout={200} key="login" classNames="my-node">
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
            Log In
            </IonTitle>
            </IonToolbar>
			</IonHeader>

        <div className="loginList">
			<IonList>
            <form onSubmit={(e) =>{
					this.handleSubmit(e)
            }} >
			<IonItem>
			<IonLabel position="floating">
			Email:
			</IonLabel>
			<IonInput 
			name="email"
			type="email"
			inputmode="email"
			autocomplete="email"
            autofocus={true}
			required={true}
			clearInput={true}
			value={email} 
			onIonChange={e => this.setState({email: e.target.value})} />
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
			value={password} 
			onIonChange={e => this.setState({password: e.target.value})} 
            onKeyPress={((e) =>{
                if (e.key === 'Enter'){
                    this.handleSubmit(e)
                }
            })}
            />
			</IonItem>

			<IonItem lines="none">
			</IonItem>

			<IonItem lines="none">
{/*
			<Mutation 
			mutation={LOGIN_MUTATION}
			variables={{email, password}}
			onCompleted={data => this._confirm(data)} >
			{mutation => (
*/}
				<IonButton
				slot="end"
				size="medium"
				type="submit"

				>
				Submit
				</IonButton>
{/*
			)}
			</Mutation>
*/}
			</IonItem>

    </form>
			</IonList>
    </div>


			</IonContent>
			</IonPage>
    </CSSTransition>
		)
    }

}
export default Login;
