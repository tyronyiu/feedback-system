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
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
  


const promptByClientId= gql`
    query getPrompt($clientId: ID!){
    promptByClientId(clientId: $clientId){
    prompt
    }
    }
`
 const thanksByClientId= gql`
        query getThanks($clientId: ID!){
        thanksByClientId(clientId: $clientId){
        thanks
        }
        }
    `


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


    componentDidMount(){
           }

	render(){


        return (
            <IonModal
            isOpen={this.props.showEditCampaignModal}
            cssClass='editCampaignModal'
            swipeToClose={true}
            >
            <IonContent >

            <Query 
            query={promptByClientId}
            variables={{clientId: this.props.clientId}}
            onCompleted={data =>
                this.setState({prompt: data.promptByClientId.prompt})}
            >
            </Query>

            <Query 
            query={thanksByClientId}
            variables={{clientId: this.props.clientId}}
            onCompleted={data =>
                this.setState({thanks: data.thanksByClientId.thanks})}
            >
            </Query>

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

            <IonList>
            <IonListHeader>
            My Campaign


            </IonListHeader>

            <IonItem>
            <IonLabel position="floating">
            Prompt:
            </IonLabel>
            <IonInput 
            name="text"
            type="text"
            inputmode="text"
            autocomplete="text"
            autofocus={true}
            required={true}
            clearInput={true}
            value={this.state.prompt} 
            onIonChange={e => this.setState({prompt: e.target.value})} />
            </IonItem>

            <IonItem >
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

            <IonItem>
            <IonLabel position="floating">
            Thanks Text:
            </IonLabel>
            <IonInput 
            name="text"
            type="text"
            inputmode="text"
            autocomplete="text"
            required={true}
            clearInput={true}
            value={this.state.thanks} 
            onIonChange={e => this.setState({prompt: e.target.value})} />
            </IonItem>

            <IonItem >
            <IonLabel className="ion-text-wrap">
            <p>This is the text your customers will see after they've submitted their feedback</p>
            </IonLabel>
            </IonItem>
            </IonList>
            </IonContent>

            {/*
            <IonButton onClick={() => {
                this.setState({
                    showEditCampaignModal: false
                }, function() {
                    this.props.parentCallback(this.state.showEditCampaignModal)
                })}}
            >Close Modal</IonButton>
            */}

            </IonModal>
        );
}
}


export default EditCampaignModal;
