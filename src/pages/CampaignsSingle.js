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
    IonListHeader,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
} from '@ionic/react';
import { 
    chevronBackOutline, 
    addCircleOutline, 
   // trashOutline,
} from 'ionicons/icons';   
//import {
//    Link
//} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//import ButtonCard from '../components/ButtonCard';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

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
        mutation addCampaignByClientId($clientId: ID!, $campaignName: String!){
        addCampaignByClientId(clientId: $clientId, campaignName: $campaignName){
        name
        prompt
        _id
        }
        }
    `

   const RemoveCampaign= gql`
    mutation removeCampaign($clientId: ID!, $campaignId: ID!){
        removeCampaign(clientId: $clientId, campaignId: $campaignId){
        _id
        }
    }
` 

function CampaignsList({clientId}){
    const history = useHistory();
    var campaignId
    const [removeCampaign] = useMutation(RemoveCampaign, {
        variables: {
            clientId,
            campaignId
        }
    });

    const { loading, error, data, refetch } = useQuery(campaignsByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log("data: ",data)
        return (<>
            {data.campaignsByClientId.map((data) =>
                //<div style={{width: "fit-content"}} key={data._id}>
                //<Link to={`/id/${clientId}/dashboard/${data._id}/in`}>
                <IonItemSliding id={data._id}>
                <IonItem button onClick={() =>{history.push(`/id/${clientId}/dashboard/${data._id}/in`)}}>
                <IonLabel>
                <h2>
                {data.name}
                </h2>
                <p>
                {data.prompt}
                </p>
                </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                <IonItemOption color="danger" expandable
                onClick={() => {
               const slidingitem = document.getElementById(data._id) 
                    slidingitem.close()

            removeCampaign({ 
                variables: { 
                    clientId: clientId,
                    campaignId: data._id
                }
            })
		    refetch()
                

                }}
>
                Delete
                </IonItemOption>
                </IonItemOptions>

                </IonItemSliding>
                //</Link>
                //</div>
            )}
            </>)
}

function AddCampaign({clientId}){
    const [addCampaignByClientId] = useMutation(AddCampaignByClientId);

    let campaignName;
    return(
        <IonList>
				<IonListHeader>
        <IonTitle style={{paddingLeft: "0"}}>
        New Campaign
        </IonTitle>
				</IonListHeader>

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
        name:
        </IonLabel>
        <IonInput 
        name="campaignName"
        type="text"
        inputmode="text"
        autocomplete="text"
        autofocus={true}
        required={true}
        clearInput={true}
        ref={node => {
            campaignName = node;
        }}
        />
        </IonItem>
        <IonItem lines="none">
        <IonButton size="default" type="submit" mode="ios">
        Create campaign
                <IonIcon slot="end" icon={addCircleOutline}/>
        </IonButton>
        </IonItem>

        </form>
        </IonList>
    )
}



class CampaignsSingle extends React.Component {
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
            <IonButton onClick={() =>{this.setState({animate: false});setTimeout(()=>{ this.props.history.push(`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}`); }, 100) }} slot="start">
            <IonIcon slot="start" icon={chevronBackOutline}/>
            </IonButton>
            </IonButtons>

            <IonButtons slot="end">
            {/*
            <IonButton onClick={() =>{this.setState({showAddModal: !this.state.showAddModal})}} slot="end">
            <IonIcon slot="end" icon={trashOutline}/>
            </IonButton>
            */}

            <IonButton onClick={() =>{this.setState({showAddModal: !this.state.showAddModal})}} slot="end">
            <IonIcon slot="end" icon={addCircleOutline}/>
            </IonButton>

            </IonButtons>
            <IonTitle size="large" style={{marginLeft:"1em"}}>
            My Campaigns
            </IonTitle>
            </IonToolbar>
            </IonHeader>


            <IonList inset={true}>
            <CampaignsList clientId={this.props.match.params.client} history={this.props.history}/>
            </IonList>

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
export default CampaignsSingle;
