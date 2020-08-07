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
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
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
import { useMutation } from '@apollo/react-hooks';


const campaignsByClientId= gql`
        query getCampaigns($clientId: ID!){
        campaignsByClientId(clientId: $clientId){
        name
        prompt
        _id
        }
        }
    `

const AddCampaignByClientId= gql`
        query addCampaignByClientId($clientId: ID!, campaignName: String!){
        addCampaignByClientId(clientId: $clientId, campaignName: $campaignName){
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

function AddCampaign({clientId}){
    const [addCampaignByClientId] = useMutation(AddCampaignByClientId);

    let campaignName;
    return(
        <IonList>
        <form onSubmit={(e) =>{
            e.preventDefault();
            addCampaignByClientId({ 
                variables: { 
                    clientId: clientId,
                    campaignName: campaignName.value
                }
            })
        }}>

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
            campaignName = node;
        }}
        />
        </IonItem>
        </form>
        </IonList>
    )
}



class Campaigns extends React.Component {
    constructor(){
        super();
        this.state = {
            animate: true,
            showAddModal: false,
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
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push("/login"); }, 100) }} slot="start">
            <IonIcon slot="start" icon={chevronBackOutline}/>
            </IonButton>
            </IonButtons>

            <IonButtons slot="end">
            <IonButton onClick={() =>{this.setState({showAddModal: !this.state.showAddModal})}} slot="end">
            <IonIcon slot="end" icon={addCircleOutline}/>
            </IonButton>

            </IonButtons>
            <IonTitle size="large" style={{marginLeft:"1em"}}>
            My Campaigns
            </IonTitle>
            </IonToolbar>
            </IonHeader>


            <CampaignsList clientId={this.props.match.params.client}/>

            <IonModal
            isOpen={this.state.showAddModal}
            cssClass='editCampaignModal'
            swipeToClose={true}
            >
            <AddCampaign clientId={this.props.match.params.client}/>
            </IonModal>

            </IonContent>
            </IonPage>
            </CSSTransition>
        )
    }

}
export default Campaigns;
