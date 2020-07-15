import React from 'react';
import './App.css';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonButton,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonCardSubtitle,
} from '@ionic/react';
import Chips from "./components/Chips";
import List from './components/List';
import Comments from './components/Comments';
import { useQuery } from '@apollo/react-hooks';
//import { useMutation } from '@apollo/react-hooks';
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost';
import {Link} from "react-router-dom";
import moment from 'moment';
//import Cookies from 'js-cookie'

    const clientById = gql`
        query getClients($clientId: ID!){
        clientById(clientId: $clientId){
        name
        cardBannerImage
        }
        }
    `

const promptByClientId= gql`
    query getPrompt($clientId: ID!){
    promptByClientId(clientId: $clientId){
    prompt
    }
    }
`

const addEntry= gql`
mutation addEntry(
    $entryId: ID!,
    $clientId: ID!
    $time: Float!
    ){
        addEntry(
            entryId: $entryId,
            clientId: $clientId,
            time: $time
        ){
            _id
    }
}
`


const AddCommentByClientId= gql`
mutation addCommentByClientId(
    $entryId: ID!,
    $clientId: ID!,
    $comment: String!
    ){
        addCommentByClientId(
        entryId: $entryId,
        clientId: $clientId,
        comment: $comment
        ){
            comment 
            _id
            client{
                _id
                name
        }
    }
}
`

const addScoreByClientId= gql`
mutation addScoreByClientId(
    $entryId: ID!,
    $clientId: ID!,
    $score: Int!
    ){
        addScoreByClientId(
        entryId: $entryId,
        clientId: $clientId,
        score: $score
        ){
           score 
            _id
            client{
                _id
                name
        }
    }
}
`

const addComplimentByClientId= gql`
mutation addComplimentByClientId(
    $entryId: ID!,
    $clientId: ID!,
    $love: Boolean!
    $service: Boolean!
    $products: Boolean!
    ){
        addComplimentByClientId(
        entryId: $entryId,
        clientId: $clientId,
        love: $love
        service: $service
        products: $products
        ){
            _id
            client{
                _id
                name
        }
    }
}
`





function CompanyName({clientId}){
    const { loading, error, data } = useQuery(clientById,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    return (<>{data.clientById.name}</>)
    
}

function CardBannerImage({clientId}){
    const { loading, error, data } = useQuery(clientById,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <img alt="" src=""/>;
        console.log(data)
    return (
            <img alt="" src={data.clientById.cardBannerImage}/>
    )
    
}

  
function Prompt({clientId}){
    const { loading, error, data } = useQuery(promptByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    return data.promptByClientId.prompt
}


var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};



class App extends React.Component {
	constructor(props){
		super(props);
        this.state = {
        entryId: "",
		comment: "",
        score: 100,
        compliments: {"love":{active:false},"service":{active:false},"products":{active:false}},
        cardBannerImage: ""
        }
	}


callbackFunction = (childData) => {
          this.setState({comment: childData})
}
callbackFunctionCompliments = (childData) => {
          this.setState({compliments: childData})
}
callbackFunctionScore = (childData) => {
          this.setState({score: childData})
}


    componentDidMount(){
        this.setState({
            entryId: ID(),

        }, function(){
        console.log("initial: ", this.state)
        })


if (localStorage.getItem('token')) {
	const options = {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: "email=public@public.com&password=1234"
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
					localStorage.setItem('token', data.token)
					this.props.history.push(`/id/${this.props.match.params.client}`)
				}
			})
}






} 





handleSubmit() {
    console.log("just submitted: ",this.state)
}


	render(){

      

    











if (localStorage.getItem('token')) {
	return (
		<div className="App">
		<IonPage>
		<IonHeader translucent={true}>
		<IonToolbar>
		<IonTitle>
		<CompanyName clientId={this.props.match.params.client}/>
		</IonTitle>
		</IonToolbar>
		</IonHeader>


		<IonContent fullscreen={true}>
		<IonHeader collapse="condense">
		<IonToolbar>
		<IonTitle size="large">
		<CompanyName clientId={this.props.match.params.client}/>

		</IonTitle>
		</IonToolbar>
		</IonHeader>

		<IonCard>
		<CardBannerImage clientId={this.props.match.params.client}/>
		<IonCardHeader>
		<IonCardSubtitle>
		<CompanyName clientId={this.props.match.params.client}/>
		</IonCardSubtitle>
		<IonCardTitle>
		<Prompt clientId={this.props.match.params.client}/>
		</IonCardTitle>
		</IonCardHeader>

		<IonCardContent>
		<IonCardSubtitle>
		Compliments
		</IonCardSubtitle>

		<Chips value={this.state.compliments} parentCallback = {this.callbackFunctionCompliments} />
		<List value={this.state.score} parentCallback = {this.callbackFunctionScore} />
		<Comments value={this.state.comment} parentCallback = {this.callbackFunction}/>

		<Mutation
		mutation={addEntry}
		variables={{ entryId: this.state.entryId, clientId: this.props.match.params.client, time: moment().valueOf()}}>
		{EntryMutation =>

			<Mutation
			mutation={addScoreByClientId}
			variables={{ entryId: this.state.entryId, clientId: this.props.match.params.client, score: this.state.score}}>
			{ScoreMutation =>

				<Mutation
				mutation={addComplimentByClientId}
				variables={{ entryId: this.state.entryId, clientId: this.props.match.params.client, love: this.state.compliments.love.active, service: this.state.compliments.service.active, products: this.state.compliments.products.active}}>
				{ComplimentMutation =>

					<Mutation
					mutation={AddCommentByClientId}
					variables={{ entryId: this.state.entryId, clientId: this.props.match.params.client, comment: this.state.comment}}>
					{CommentMutation => 

						<Link to={`/id/${this.props.match.params.client}/done`}>
						<IonButton expand="block" onClick={() => {
							EntryMutation();
							if (this.state.comment !== ""){ CommentMutation()} ;
							if (this.state.compliments.love.active === true || this.state.compliments.service.active === true || this.state.compliments.products.active === true){ ComplimentMutation()} ;
							ScoreMutation() ; this.handleSubmit()
						}}>
						Submit
						</IonButton>
						</Link>
					}
					</Mutation>
				}
		</Mutation>
}
	</Mutation>
}
	</Mutation>


	</IonCardContent>
	</IonCard>

	</IonContent>

	</IonPage>
	</div>
);
}else{
//    
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
					localStorage.setItem('token', data.token)
					this.props.history.push(`/id/${this.props.match.params.client}`)
				}
			})

    return(<h1>error</h1>)}
}

}

export default App;

