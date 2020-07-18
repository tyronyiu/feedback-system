import React from 'react';
import {
IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonButton,
    IonModal,
    IonContent,
    IonInput,
    IonIcon,
} from '@ionic/react';
import {  closeCircleOutline } from 'ionicons/icons';   
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { eyeOutline, checkmarkOutline } from 'ionicons/icons';   
 
const CampaignByCampaignId= gql`
        query campaignById($campaignId: ID!){
        campaignByCampaignId(campaignId: $campaignId){
        name
        coverImage
        thanks
        prompt
        }
        }
    `


const UpdatePrompt = gql`
    mutation updatePrompt($campaignId: ID!, $updatedPrompt: String!){
        updatePrompt(campaignId: $campaignId, updatedPrompt: $updatedPrompt){
            prompt    
        }
    }
`

const UpdateThanks = gql`
    mutation updateThanks($campaignId: ID!, $updatedThanks: String!){
        updateThanks(campaignId: $campaignId, updatedThanks: $updatedThanks){
            thanks
        }
    }
`

const UpdateCampaignName= gql`
    mutation updateCampaignName($campaignId: ID!, $updatedCampaignName: String!){
        updateCampaignName(campaignId: $campaignId, updatedCampaignName: $updatedCampaignName){
            name
        }
    }
`

function Prompt({campaignId}) {
  const { loading, error, data, refetch, } = useQuery(CampaignByCampaignId, {
		variables: {campaignId: campaignId}
	});
const [updatePrompt] = useMutation(UpdatePrompt);
console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

let input;

return (
	<div key={data.campaignByCampaignId._id}>
	<p></p>
	<form
	onSubmit={e => {
		e.preventDefault();
		updatePrompt({ variables: { campaignId: campaignId, updatedPrompt: input.value } });
		refetch()

	}}
	>
	<IonItem>
	<IonLabel position="floating" className="ion-text-wrap">
	Prompt: {data.campaignByCampaignId.prompt}
	</IonLabel>
	<IonInput 
	name="text"
	type="text"
	inputmode="text"
	autocomplete="text"
	autofocus={true}
	required={true}
	clearInput={true}
autocorrect={true}
autocapitalize={true}
	ref={node => {
		input = node;
	}} 
	/>
	</IonItem>

	<IonItem lines="none">
	<IonButton size="default" type="submit" mode="ios">
	Update prompt
			<IonIcon slot="end" icon={checkmarkOutline}/>
	</IonButton>
	</IonItem>
	</form>
	</div>
);
}

function Thanks({campaignId}) {
  const { loading, error, data, refetch, } = useQuery(CampaignByCampaignId, {
		variables: {campaignId: campaignId}
	});
const [updateThanks] = useMutation(UpdateThanks);
console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

let input;

return (
	<div >
	<p></p>
	<form
	onSubmit={e => {
		e.preventDefault();
		updateThanks({ variables: { campaignId: campaignId, updatedThanks: input.value } });
		refetch()

	}}
	>

<IonItem>
            <IonLabel position="floating" className="ion-text-wrap">
            Thanks Text: {data.campaignByCampaignId.thanks}
            </IonLabel>
            <IonInput 
            name="text"
            type="text"
            inputmode="text"
            autocomplete="text"
            required={true}
            clearInput={true}
autocorrect={true}
autocapitalize={true}
			ref={node => {
				input = node;
			}} 
			 />
            </IonItem>

	<IonItem lines="none">
	<IonButton size="default" type="submit" mode="ios">
	Update thanks
			<IonIcon slot="end" icon={checkmarkOutline}/>
	</IonButton>
	</IonItem>
	</form>
	</div>
);
}


function CampaignName({campaignId}) {
  const { loading, error, data, refetch, } = useQuery(CampaignByCampaignId, {
		variables: {campaignId: campaignId}
	});
const [updateCampaignName] = useMutation(UpdateCampaignName);
console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

let input;

return (
	<div>
	<form
	onSubmit={e => {
		e.preventDefault();
		updateCampaignName({ variables: { campaignId: campaignId, updatedCampaignName: input.value } });
		refetch()

	}}
	>

<IonItem>
            <IonLabel position="floating" className="ion-text-wrap">
            Campaign Name: {data.campaignByCampaignId.name}
            </IonLabel>
            <IonInput 
            name="text"
            type="text"
            inputmode="text"
            autocomplete="text"
            required={true}
            clearInput={true}
autocorrect={true}
autocapitalize={true}
			ref={node => {
				input = node;
			}} 
			 />
            </IonItem>

	<IonItem lines="none">
	<IonButton size="default" type="submit" mode="ios">
	Update Campaign Name
			<IonIcon slot="end" icon={checkmarkOutline}/>
	</IonButton>
	</IonItem>
	</form>
	</div>
);
}








class EditCampaignModal extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            showEditCampaignModal: false,
            prompt: "",
            thanks: "",
            coverImage: "",
        }
	}

    handleSubmit = e => {

    }

    componentDidMount(){
           }

	render(){


        return (
            <IonModal
            isOpen={this.props.showEditCampaignModal}
            cssClass='editCampaignModal'
            swipeToClose={true}
            >
            <IonContent fullscreen={true}>

{/*
            <Query 
            query={PromptByClientId}
            variables={{clientId: this.props.clientId}}
            onCompleted={data =>
                this.setState({prompt: data.promptByClientId.prompt})}
            >
            </Query>

            <Query 
            query={ThanksByClientId}
            variables={{clientId: this.props.clientId}}
            onCompleted={data =>
                this.setState({thanks: data.thanksByClientId.thanks})}
            >
            </Query>
*/}

            <IonButton
            fill="clear"
            style={{float: "right"}}
            onClick={ () => {
                this.setState({
                    showEditCampaignModal: false
                }, function() {
                    this.props.parentCallback(this.state.showEditCampaignModal)
                })}}
            >
            <IonIcon slot="icon-only" icon={closeCircleOutline}/> 
            </IonButton>

            <IonList scroll="true">
            <IonListHeader>
            My Campaign


            </IonListHeader>


            


<Prompt campaignId={this.props.campaignId} />

            <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
            <p>
            A prompt is what you present your customers when asking for feedback. 
            <br/>
            Examples:<br/>
            - "How was your stay?"
            <br/>
            - "Please rate us"
            </p>
            </IonLabel>
            </IonItem>

<IonItem lines="none">
</IonItem>

<Thanks campaignId={this.props.campaignId} />
            
            <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
            <p>This is the text your customers will see after they've submitted their feedback</p>
            </IonLabel>
            </IonItem>

<IonItem lines="none">
</IonItem>

<CampaignName campaignId={this.props.campaignId} />

<IonItem lines="none">
</IonItem>

<IonItem>
<IonLabel className="ion-text-wrap">
            View Campaign: 
            </IonLabel>
</IonItem>

<IonItem lines="none">
<IonButton onClick={() => {this.props.history.push(`/id/${this.props.campaignId}`)}} size="default" mode="ios">
View
			<IonIcon slot="end" icon={eyeOutline}/>
</IonButton>
</IonItem>

            </IonList>
            </IonContent>
            </IonModal>
        );
}
}


export default EditCampaignModal;
