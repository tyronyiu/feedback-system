import React from 'react';
import {
    IonList,
    IonListHeader,
    IonButton,
    IonModal,
    IonIcon,
} from '@ionic/react';
import {  closeCircleOutline } from 'ionicons/icons';   
 
var QRCode = require('qrcode.react');



class ShowQRModal extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            showQRModal: false,
            
        }
	}

	render(){


        return (
            <IonModal
            isOpen={this.props.showQRModal}
            cssClass='editCampaignModal'
            swipeToClose={true}
            >

            <IonButton
            fill="clear"
            style={{marginLeft: "auto", width: "fit-content"}}
            onClick={ () => {
                this.setState({
                    showQRModal: false
                }, function() {
                    this.props.parentCallback(this.state.showQRModal)
                })}}
            >
            <IonIcon slot="icon-only" icon={closeCircleOutline}/> 
            </IonButton>

            <IonList scroll="true" style={{"background": "unset"}}>
            <IonListHeader mode="ios" style={{alignItems: "center"}}>
            Campaign QR Code
            </IonListHeader>
            </IonList>



 <div style={{margin: "auto"}}>
<QRCode value={`https://feedback.agerspace.com/#/id/${this.props.campaignId}`} 
        renderAs="svg"
        size={350}
        bgColor="transparent"
fgColor="var(--ion-color-dark)"
        includeMargin={true}
                />
    </div>

            </IonModal>
        );
}
}


export default ShowQRModal;
