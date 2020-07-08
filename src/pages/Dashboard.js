import React from 'react';
//import moment from 'moment';
import './Dashboard.css';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonList,
IonItem,
IonLabel,
IonListHeader,
IonText,
//IonAvatar,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonCardSubtitle,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//import Cookies from 'js-cookie'
import {
 Link
} from "react-router-dom";

    const clientById = gql`
        query getClients($clientId: ID!){
        clientById(clientId: $clientId){
        name
        cardBannerImage
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





class Dashboard extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: ""
        }
	}



	render(){
		if (localStorage.getItem('token')) {
            return (
                <div className="">
                <IonPage>
                <IonHeader translucent={true}>
                <IonToolbar>
                <IonTitle>
                Feedback entries
                </IonTitle>
                </IonToolbar>
                </IonHeader>


                <IonContent fullscreen={true} className="dashboardMainContainer" >
                <IonHeader collapse="condense">
                <IonToolbar>
                <IonTitle size="large">
                <CompanyName clientId={this.props.match.params.client}/>
                </IonTitle>
                </IonToolbar>
                </IonHeader>

                <div className="dashboardMainContainer">

                <IonCard className="quickInsightsCard fitContentCard">
                <IonCardHeader>
                <IonCardTitle>
                Quick Insights
                </IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="quickInsightsCardContent">


                <IonList lines="none" className="quickInsightsList">
                <IonListHeader>
                Entries:                           
                </IonListHeader>

                <IonItem>
                <IonLabel>
                30
                </IonLabel>
                </IonItem>

                <IonItem>
                <IonLabel> 
                <IonText color="dark">
                <h3>Comments:</h3>
                </IonText>
                <IonText color="gray">
                <p>25</p>
                </IonText>
                </IonLabel>
                </IonItem>

                <IonItem>
                <IonLabel> 
                <IonText color="dark">
                <h3>Compliments:</h3>
                </IonText>
                <IonText color="gray">
                <p>26</p>
                </IonText>
                </IonLabel>
                </IonItem>



                </IonList>



                <IonList lines="none" className="quickInsightsList">
                <IonListHeader>
                    Average Score:                           
                </IonListHeader>

                <IonItem>
                <IonLabel>
                95
                </IonLabel>
                </IonItem>

                <IonItem>
                <IonLabel> 
                <IonText color="dark">
                <h3>Entries Today:</h3>
                </IonText>
                <IonText color="gray">
                <p>5</p>
                </IonText>
                </IonLabel>
                </IonItem>

                <IonItem>
                <IonLabel> 
                <IonText color="dark">
                <h3>DAU:</h3>
                </IonText>
                <IonText color="gray">
                <p>6</p>
                </IonText>
                </IonLabel>
                </IonItem>



                </IonList>

                </IonCardContent>

                </IonCard >

                <IonCard button={true} className="fitContentCard">
                <Link to={`/${this.props.match.params.client}/dashboard/entriesDetail`} style={{width:"fit-content"}}>
                <IonCardHeader>
                <IonCardTitle>
                Entries
                </IonCardTitle>
                <IonCardSubtitle>
                see more
                </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
                </Link>
                </IonCard>

</div>

                </IonContent>

                </IonPage>
                </div>
            );
		}
		else{
			this.props.history.push(`/${this.props.match.params.client}/login`)
return null

		}
}
}

export default Dashboard;
