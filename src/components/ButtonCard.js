import React from 'react';
import './ButtonCard.css';
import {
IonCard,
IonCardHeader,
IonCardTitle,
IonCardSubtitle,
IonCardContent,
IonIcon,
} from '@ionic/react';
  
class ButtonCard extends React.Component {
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
<IonCard mode="ios" button={true} className="buttonCard fitContentCard blobCard"
                onClick={() => { this.setState({ showEditCampaignModal: !this.state.showEditCampaignModal },function(){
          this.props.parentCallback(this.state.showEditCampaignModal);
})}} >
                <IonCardHeader>
      { this.props.title &&
                <IonCardTitle>
      {this.props.title}
                </IonCardTitle>
      }
      { this.props.subtitle &&
                <IonCardSubtitle>
                {this.props.subtitle} 
      { this.props.icon &&
                <IonIcon icon={this.props.icon} color="primary" style={{marginBottom: "-2px"}}/>
      }
                </IonCardSubtitle>
      }
                </IonCardHeader>
      { this.props.content &&
          <IonCardContent>
          {this.props.content}
          </IonCardContent>
      }
          </IonCard>

  );
}
}

export default ButtonCard;
