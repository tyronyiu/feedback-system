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
IonTextarea,
IonList,
IonItem,
IonLabel,
IonRange,
IonIcon,

} from '@ionic/react';

import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//import Cookies from 'js-cookie'
import { thumbsUp, thumbsDown, } from 'ionicons/icons';   

    const campaignByCampaignId = gql`
        query getCampaign($campaignId: ID!){
        campaignByCampaignId(campaignId: $campaignId){
        name
        prompt
        thanks
        coverImage
        }
        }
    `


const AddEntryWithCommentByCampaignId= gql`
mutation addEntryWithCommentByCampaignId(
    $campaignId: ID!
    $comment: String!,
    $score: Int!
    ){
        addEntryWithCommentByCampaignId(
            campaignId: $campaignId,
            comment: $comment,
            score: $score
        ){
            _id
    }
}
`

const AddEntryByCampaignId= gql`
mutation addEntryByCampaignId(
    $campaignId: ID!
    $score: Int!
    ){
        addEntryByCampaignId(
            campaignId: $campaignId,
            score: $score
        ){
            _id
    }
}
`






function CampaignName({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log("campaignId: ", campaignId)
        console.log(data)
    return (<>{data.campaignByCampaignId.name}</>)
    
}

function Prompt({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    return (<>{data.campaignByCampaignId.prompt}</>)
    
}



function CardBannerImage({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <img alt="" src=""/>;
        console.log(data)
    return (
            <img alt="" src={data.campaignByCampaignId.coverImage}/>
    )
    
}

  
function Entry({campaignId}) {
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



    const [addEntryByCampaignId] = useMutation(AddEntryByCampaignId);
    const [addEntryWithCommentByCampaignId] = useMutation(AddEntryWithCommentByCampaignId);

    let comment;
    let score;

    return(
        <div className="requestAccessInput">
        
 <IonList lines="none">
<form onSubmit={(e) =>{
    console.log("comment: ", comment.value)
    console.log("score: ", score.value)
            e.preventDefault();
    if (comment.value !== ""){
            addEntryWithCommentByCampaignId({ 
                variables: { 
                    comment: comment.value,
                    score: score.value,
                    campaignId: campaignId
                } 
            });
    }else if (comment.value === ""){
            addEntryByCampaignId({ 
                variables: { 
                    score: score.value,
                    campaignId: campaignId
                } 
            });
    }
            window.location.href = `/#/id/${campaignId}/done`
        }} >

<IonItem>
       <IonLabel><b>Score</b></IonLabel>
      </IonItem>

<IonItem mode="ios">
<IonRange style={{width:"125%"}} pin={true} value={100} ref={node => {
            score= node;
        }}>
      <IonIcon slot="start" size="small" icon={thumbsDown} color="red" style={{position:"relative",left:"-0.5em"}}/>
      <IonIcon slot="end" size="small" icon={thumbsUp} color="success" style={{position:"relative", left:"0.5em"}}/>
      </IonRange>
</IonItem>

      <IonItem>
      <IonLabel>
      Comments: 
      </IonLabel>
      </IonItem>

      <IonItem>
      <IonTextarea 
      clearOnEdit={true}
      autoGrow={true}
      inputmode="text"
      placeholder="I really liked it!"
      style={{border: "1px solid rgb(0,0,0,0.3)", borderRadius:"6px", padding:"0.5em"}}
         ref={node => {
            comment= node;
        }}>    
      </IonTextarea>
      </IonItem>
      <IonItem/>

    <IonItem lines="none">
        </IonItem>

        <IonItem lines="none">

        <IonButton
        size="default"
        type="submit"
        expand="block"
        mode="ios"
        style={{width:"100%"}}
        >
        Submit
        </IonButton>
        </IonItem>

        </form>
      </IonList>
        </div>

    )



}


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
					this.props.history.push(`/id/${this.props.match.params.campaign}`)
				}
			})
}






} 

	render(){

  if (localStorage.getItem('token')) {
	return (
		<div className="App">
		<IonPage>
		<IonHeader translucent={true}>
		<IonToolbar>
		<IonTitle>
		<CampaignName campaignId={this.props.match.params.campaign}/>
		</IonTitle>
		</IonToolbar>
		</IonHeader>


		<IonContent fullscreen={true}>
		<IonHeader collapse="condense">
		<IonToolbar>
		<IonTitle size="large">
		<CampaignName campaignId={this.props.match.params.campaign}/>

		</IonTitle>
		</IonToolbar>
		</IonHeader>

		<IonCard>
      <CardBannerImage campaignId={this.props.match.params.campaign}/>
		<IonCardHeader>
		<IonCardSubtitle>
		<CampaignName campaignId={this.props.match.params.campaign}/>
		</IonCardSubtitle>
		<IonCardTitle>
		<Prompt campaignId={this.props.match.params.campaign}/>
		</IonCardTitle>
		</IonCardHeader>

		<IonCardContent>
		<IonCardSubtitle>
		Compliments
		</IonCardSubtitle>

<Entry campaignId={this.props.match.params.campaign}/>




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
					this.props.history.push(`/id/${this.props.match.params.campaign}`)
				}
			})

    return(<h1>error</h1>)}
}

}

export default App;

