import React from 'react';
import './Login.css';
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
import { chevronBackOutline, addCircleOutline } from 'ionicons/icons';   
import {
 Link
} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ButtonCard from '../components/ButtonCard';


   const campaignsByClientId= gql`
        query getCampaigns($clientId: ID!){
        campaignsByClientId(clientId: $clientId){
        name
        prompt
        _id
        }
        }
    `

function CampaignsList({clientId}){
    const { loading, error, data } = useQuery(campaignsByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log("data: ",data)
    return (<>
        {data.campaignsByClientId.map((data) =>
        <div style={{width: "fit-content"}} key={data._id}>
            <Link to={`/id/${clientId}/dashboard/${data._id}/in`}>
        <ButtonCard title={data.name} 
           subtitle={data.prompt}
           />
            </Link>
        </div>
    )}
    </>)
    
}




class CampaignsSingle extends React.Component {
    constructor(){
        super();
        this.state = {
            animate: true,
        }
    }



componentDidMount(){
    console.log("campaign: ",this.props.match.params.campaign)
if (localStorage.getItem('token')){
        var decoded = jwt_decode(localStorage.getItem('token'));
        console.log(decoded);  
            if (decoded.email === "public@public.com"){
                localStorage.removeItem('token');
                this.props.history.push(`/login/`)
            }
        }
}



    render(){
		return(
        <CSSTransition appear in={this.state.animate} timeout={200} key="campaigns" classNames="my-node">
			<IonPage>
			<IonContent fullscreen={true}>

			<IonHeader collapse="condense" mode="ios">
<IonToolbar style={{paddingTop: "1em"}}>
            <IonButtons slot="start">
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push(`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}`); }, 100) }} slot="start">
            <IonIcon slot="start" icon={chevronBackOutline}/>
            </IonButton>
            </IonButtons>

<IonButtons slot="end">
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push(`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}`); }, 100) }} slot="end">
            <IonIcon slot="end" icon={addCircleOutline}/>
            </IonButton>
            </IonButtons>

<IonTitle size="large" style={{marginLeft:"1em"}}>
            My Campaigns
            </IonTitle>
            </IonToolbar>
			</IonHeader>


            <CampaignsList clientId={this.props.match.params.client}/>

      
			</IonContent>
			</IonPage>
    </CSSTransition>
		)
    }

}
export default CampaignsSingle;
