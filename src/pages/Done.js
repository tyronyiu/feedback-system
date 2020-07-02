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

    const clientById = gql`
        query getClients($clientId: ID!){
        clientById(clientId: $clientId){
        name
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




function CompanyName({clientId}){
    const { loading, error, data } = useQuery(clientById,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return data.clientById.name
}
  

function Thanks({clientId}){
    const { loading, error, data } = useQuery(thanksByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
        console.log(data.thanksByClientId)
    return data.thanksByClientId.thanks
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
      <CompanyName clientId={this.props.match.params.client}/>
      </IonTitle>
      </IonToolbar>
      </IonHeader>


      <IonContent fullscreen={true}>
      <IonHeader collapse="condense">
      <IonToolbar>
      <IonTitle size="large">
      <CompanyName clientId={this.props.match.params.client}/>

      </IonTitle>
      </IonToolbar>
      </IonHeader>

      <IonCard>
      <img alt="Banner" src="https://i.ibb.co/wWrPnkF/APS-Category-Katalog-20.jpg"/>
      <IonCardHeader>
      <IonCardSubtitle>
      <CompanyName clientId={this.props.match.params.client}/>
      </IonCardSubtitle>
      <IonCardTitle>
      <Thanks clientId={this.props.match.params.client}/>
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
