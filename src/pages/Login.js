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
IonTitle,
IonButton,
} from '@ionic/react';
//import { Mutation } from 'react-apollo'
//import { gql } from 'apollo-boost';
import Cookies from 'js-cookie'
import { AUTH_TOKEN } from '../constants'

//const LOGIN_MUTATION = gql`
//  mutation LoginMutation($email: String!, $password: String!) {
//          login(email: $email, password: $password) {
//                    token
//                  }
//        }
//`



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

  _saveUserData = token => {
          localStorage.setItem(AUTH_TOKEN, token)
        }

_confirm = async data => {
const { token } =  data.login 
      this._saveUserData(token)
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
if (localStorage.getItem('token')) {
					this.props.history.push(`/${this.props.match.params.client}/dashboard`)
    }else{
		const options = {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `email=${this.state.email}&password=${this.state.password}`
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
					//document.cookie = 'token=' + data.token
                    localStorage.setItem('token', data.token)
					this.props.history.push(`/${this.props.match.params.client}/dashboard`)
				}
			})
}
        }

    render(){
		const { email, password } = this.state
		return(
			<IonPage>

			<IonHeader translucent={true}>
			<IonToolbar>
			<IonTitle>
			Login	
			</IonTitle>
			</IonToolbar>
			</IonHeader>

			<IonContent fullscreen={true}>

			<IonHeader collapse="condense">
			<IonToolbar>
			<IonTitle size="large">
			Login			
			</IonTitle>
			</IonToolbar>
			</IonHeader>

			<IonList>
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
			onIonChange={e => this.setState({password: e.target.value})} />
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
				onClick={(e) => {
					this.handleSubmit(e)
				}}
				>
				Submit
				</IonButton>
{/*
			)}
			</Mutation>
*/}
			</IonItem>

			</IonList>


			</IonContent>
			</IonPage>
		)
    }

}
export default Login;
