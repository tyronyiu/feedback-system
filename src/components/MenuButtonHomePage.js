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
import {enterOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';   
import {
Link
} from "react-router-dom";
  
class MenuButtonHomePage extends React.Component {
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
EDIT CAMPAIGN (POPOVER)
*/}
                <Link to={`/${this.props.clientId}/login/`} style={{width:"fit-content"}}>
                <IonItem button={true} onClick={()=>{
                    this.setState({
                        showPopover: { open: !this.state.showPopover.open },
                        
                    })
                }}>
                <IonIcon icon={enterOutline} slot="start"/>
                <IonLabel>
                Log In
                </IonLabel>

                </IonItem>
      </Link>



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


export default MenuButtonHomePage;
