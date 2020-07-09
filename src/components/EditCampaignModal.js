import React from 'react';
import {
IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonButton,
    IonModal,
    IonContent,
} from '@ionic/react';

  
class EditCampaignModal extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            showEditCampaignModal: false
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


                <IonContent>
                <IonList>
                <IonListHeader>
                My Campaign
                </IonListHeader>

                <IonItem>
                <IonLabel>
                <p>Coming soon...</p>
                </IonLabel>
                </IonItem>
                </IonList>
                </IonContent>


                <IonButton onClick={() => {
                    this.setState({
                        showEditCampaignModal: false
                    }, function() {
                        this.props.parentCallback(this.state.showEditCampaignModal)
                    })}}
>Close Modal</IonButton>
                </IonModal>  );
}
}


export default EditCampaignModal;
