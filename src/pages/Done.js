import React from 'react';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonCardSubtitle,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

    const campaignByCampaignId = gql`
        query getCampaign($campaignId: ID!){
        campaignByCampaignId(campaignId: $campaignId){
        name
        prompt
        thanks
        coverImage
        }
        }
    `

function CampaignName({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    return (<>{data.campaignByCampaignId.name}</>)
}


function CardBannerImage({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
            <img alt="banner" src={data.campaignByCampaignId.coverImage}/>
    )
    
}
  

function Thanks({campaignId}){
    const { loading, error, data } = useQuery(campaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    return data.campaignByCampaignId.thanks
}




class Done extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: ""
        }
	}



	render(){

  return (
      <div className="App">
      <IonPage>
      <IonHeader translucent={true}>
      <IonToolbar>
      <IonTitle>
      <CampaignName campaignId={this.props.match.params.client}/>
      </IonTitle>
      </IonToolbar>
      </IonHeader>


      <IonContent fullscreen={true}>
      <IonHeader collapse="condense">
      <IonToolbar>
      <IonTitle size="large">
      <CampaignName campaignId={this.props.match.params.client}/>

      </IonTitle>
      </IonToolbar>
      </IonHeader>

      <IonCard>
      <CardBannerImage campaignId={this.props.match.params.client}/>
      <IonCardHeader>
      <IonCardSubtitle>
      <CampaignName campaignId={this.props.match.params.client}/>
      </IonCardSubtitle>
      <IonCardTitle>
      <Thanks campaignId={this.props.match.params.client}/>
      </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>


      </IonCardContent>
      </IonCard>

      </IonContent>

      </IonPage>
      </div>
  );
}
}

export default Done;
