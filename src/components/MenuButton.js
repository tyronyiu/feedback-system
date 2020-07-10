import React from 'react';
import {
IonLabel,
IonIcon,
    IonItem,
    IonPopover,
    IonList,
    IonListHeader,
    IonAlert,
    IonButton,
    IonModal,
    IonContent,
} from '@ionic/react';
import { helpCircleOutline, personCircleOutline, exitOutline, ellipsisVerticalCircleOutline, createOutline} from 'ionicons/icons';   

 
class MenuButton extends React.Component {
	constructor(props){
		super(props);
        this.state = {
 showPopover: {
                open: false,
                event: undefined
            },
            showEditCampaignModal: false,
            showLogOutAlert: false,
            showUserAccountModal: false,
        }
	}


    componentDidMount(){
    }

	render(){
  return (
      <div>
                <IonPopover
                isOpen={this.state.showPopover.open}
                cssClass='my-custom-class'
                event={this.state.showPopover.event}
                onDidDismiss={(e) => this.setState({ showPopover:{open: !this.state.showPopover, event: null} })}
                mode="ios"
                >

                <IonList>
                <IonListHeader>
                Menu 
                </IonListHeader>

                {/*
USER ACCOUNT (POPOVER)
*/}
                <IonItem button={true} onClick={()=>{
                    this.setState({
                        showPopover: { open: !this.state.showPopover.open },
                        showUserAccountModal: !this.state.showUserAccountModal
                    })
                }}>
                <IonIcon icon={personCircleOutline} slot="start"/>
                <IonLabel>
                Account
                </IonLabel>

                </IonItem>


                {/*
EDIT CAMPAIGN (POPOVER)
*/}
                <IonItem button={true} onClick={()=>{
                    this.setState({
                        showPopover: { open: !this.state.showPopover.open },
                        showEditCampaignModal: !this.state.showEditCampaignModal
                    }, function(){
          this.props.parentCallback(this.state.showEditCampaignModal);
                    })
                }}>
                <IonIcon icon={createOutline} slot="start"/>
                <IonLabel>
                Campaign
                </IonLabel>

                </IonItem>

                {/*
TUTORIAL (POPOVER)
*/}
                <IonItem button={true} onClick={()=>{
                   }}>
                <IonIcon icon={helpCircleOutline} slot="start"/>
                <IonLabel>
                Tutorial
                </IonLabel>

                </IonItem>


                {/*
SHOW LOGOUT ALERT (POPOVER)
*/}
                <IonItem button={true} onClick={()=>{
                    this.setState({showLogOutAlert: !this.state.showLogOutAlert})
                }}>
                <IonIcon icon={exitOutline} slot="start"/>
                <IonLabel>
                Log Out
                </IonLabel>
                </IonItem>

                </IonList>
                </IonPopover>
                <IonButton slot="end" onClick={ (e) => this.setState({showPopover:{open: !this.state.showPopover.open, event: e.nativeEvent}}) }>
                <IonIcon slot="end" icon={ellipsisVerticalCircleOutline} />

                </IonButton>







                {/*
LOGOUT ALERT 
*/}
                <IonAlert
                isOpen={this.state.showLogOutAlert}
                onDidDismiss={() => this.setState({
                    showLogOutAlert: !this.state.showLogOutAlert,
                }) }
                cssClass='my-custom-class'
                header={'Log out'}
                message={'Are you sure you want to log out?'}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: blah => {

                        }
                    },
                    {
                        text: 'Logout',
                        cssClass: 'alertLogoutButton',
                        handler: () => {
                            localStorage.removeItem('token')
							window.location.reload();
                        }
                    }
                ]}
                />


                {/*
USER ACCOUNT MODAL
*/}
                <IonModal
                isOpen={this.state.showUserAccountModal}
                cssClass='editCampaignModal'
                swipeToClose={true}
                >
                <IonContent>

                <IonList>
                <IonListHeader>
                Account
                </IonListHeader>

                <IonItem>
                <IonLabel>
                <p>Coming soon...</p>
                </IonLabel>
                </IonItem>
                </IonList>
                </IonContent>
                <IonButton onClick={() => this.setState({showUserAccountModal: !this.state.showUserAccountModal}) }>Close Modal</IonButton>
                </IonModal>


      </div>
  );
}
}


export default MenuButton;
