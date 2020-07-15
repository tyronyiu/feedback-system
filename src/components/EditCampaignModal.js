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
import {Link} from "react-router-dom";
import { eyeOutline, cloudUploadOutline } from 'ionicons/icons';   
 


const PromptByClientId= gql`
    query promtByClientId($clientId: ID!){
    promptByClientId(clientId: $clientId){
    prompt
	_id
    }
    }
`

 const ThanksByClientId= gql`
        query thanksByClientId($clientId: ID!){
        thanksByClientId(clientId: $clientId){
        thanks
		_id
        }
        }
    `

const UpdatePrompt = gql`
    mutation updatePrompt($clientId: ID!, $updatedPrompt: String!){
        updatePrompt(clientId: $clientId, updatedPrompt: $updatedPrompt){
            prompt    
        }
    }
`

const UpdateThanks = gql`
    mutation updateThanks($clientId: ID!, $updatedThanks: String!){
        updateThanks(clientId: $clientId, updatedThanks: $updatedThanks){
            thanks
        }
    }
`

function Prompt({clientId}) {
  const { loading, error, data, refetch, } = useQuery(PromptByClientId, {
		variables: {clientId: clientId}
	});
const [updatePrompt] = useMutation(UpdatePrompt);
console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

let input;

return (
	<div key={data.promptByClientId._id}>
	<p></p>
	<form
	onSubmit={e => {
		e.preventDefault();
		updatePrompt({ variables: { clientId: clientId, updatedPrompt: input.value } });
		refetch()

	}}
	>
	<IonItem>
	<IonLabel position="floating" className="ion-text-wrap">
	Prompt: {data.promptByClientId.prompt}
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
			<IonIcon slot="end" icon={cloudUploadOutline}/>
	</IonButton>
	</IonItem>
	</form>
	</div>
);
}

function Thanks({clientId}) {
  const { loading, error, data, refetch, } = useQuery(ThanksByClientId, {
		variables: {clientId: clientId}
	});
const [updateThanks] = useMutation(UpdateThanks);
console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

let input;

return (
	<div key={data.thanksByClientId._id}>
	<p></p>
	<form
	onSubmit={e => {
		e.preventDefault();
		updateThanks({ variables: { clientId: clientId, updatedThanks: input.value } });
		refetch()

	}}
	>

<IonItem>
            <IonLabel position="floating" className="ion-text-wrap">
            Thanks Text: {data.thanksByClientId.thanks}
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
			<IonIcon slot="end" icon={cloudUploadOutline}/>
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


            


<Prompt clientId={this.props.clientId} />

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

<Thanks clientId={this.props.clientId} />
            
            <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
            <p>This is the text your customers will see after they've submitted their feedback</p>
            </IonLabel>
            </IonItem>

<IonItem lines="none">
</IonItem>

<IonItem>
<IonLabel className="ion-text-wrap">
            View Campaign: 
            </IonLabel>
</IonItem>

<IonItem lines="none">
<Link to={`/id/${this.props.clientId}`}>
<IonButton size="default" mode="ios">
View
			<IonIcon slot="end" icon={eyeOutline}/>
</IonButton>
</Link>
</IonItem>

            </IonList>
            </IonContent>



{/*
            <Mutation
            mutation={updatePrompt}
            variables={{clientId: this.props.clientId, updatedPrompt: this.state.prompt}}
update={(cache, { data: { updatePrompt} }) => {
        const { prompts } = cache.readQuery({ query: PromptByClientId });
        cache.writeQuery({
          query: PromptByClientId,
            variables: {clientId: this.props.clientId},
          data: { prompts: prompts.concat([updatePrompt]) },
        });
      }}
            >

            {(updatePromptMutation, {data}) =>(
                <IonButton type="submit" onClick={() => {
                    updatePromptMutation();
                    this.setState({
                        showEditCampaignModal: false,
                    }, function() {
                        this.props.parentCallback(this.state.showEditCampaignModal)
                    })}}
                >Save</IonButton>
            )
            }
            </Mutation>
*/}

            </IonModal>
        );
}
}


export default EditCampaignModal;
