import React from 'react';
import {
IonLabel,
IonIcon,
    IonItem,
    IonPopover,
    IonList,
    IonListHeader,
    IonButton,
} from '@ionic/react';
import {enterOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';   
import { Link } from "react-router-dom";
  
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
                <Link to="/login" style={{width:"fit-content"}}>
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

      </div>
  );
}
}


export default MenuButtonHomePage;
