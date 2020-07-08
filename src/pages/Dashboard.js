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
IonIcon,
    IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
IonCardSubtitle,
    IonButton,
    IonButtons,
    IonPopover,

} from '@ionic/react';
import {  arrowForwardOutline,ellipsisVerticalCircleOutline } from 'ionicons/icons';   


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
   const quickInsightsByClientId= gql`
        query quickInsightsByClientId($clientId: ID!){
        quickInsightsByClientId(clientId: $clientId){
            entriesCount
            commentsCount
            complimentsCount
            averageScore
            entriesToday
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

function QuickInsightsByClientId({clientId}){
    const { loading, error, data } = useQuery(quickInsightsByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        return (
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
            {data.quickInsightsByClientId.entriesCount}
            </IonLabel>
            </IonItem>

            <IonItem>
            <IonLabel> 
            <IonText color="dark">
            <h3>Comments:</h3>
            </IonText>
            <IonText color="gray">
            <p>{data.quickInsightsByClientId.commentsCount}</p>
            </IonText>
            </IonLabel>
            </IonItem>

            <IonItem>
            <IonLabel> 
            <IonText color="dark">
            <h3>Compliments:</h3>
            </IonText>
            <IonText color="gray">
            <p>{data.quickInsightsByClientId.complimentsCount}</p>
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
             {data.quickInsightsByClientId.averageScore}
            </IonLabel>
            </IonItem>

            <IonItem>
            <IonLabel> 
            <IonText color="dark">
            <h3>Entries Today:</h3>
            </IonText>
            <IonText color="gray">
            <p>{data.quickInsightsByClientId.entriesToday}</p>
            </IonText>
            </IonLabel>
            </IonItem>

            <IonItem>
            <IonLabel> 
            <IonText color="dark">
            <h3>DAU:</h3>
            </IonText>
            <IonText color="gray">
            <p>{data.quickInsightsByClientId.entriesToday}</p>
            </IonText>
            </IonLabel>
            </IonItem>

            </IonList>
            </IonCardContent>
            </IonCard >
        )
}




class Dashboard extends React.Component {
	constructor(){
		super();
        this.state = {
            showPopover: {
            open: false,
            event: undefined
        }
        }
	}

	render(){
		if (localStorage.getItem('token')) {
            return (
                <div className="">
                <IonPage>
               


                <IonContent fullscreen={true} style={{height: "100%"}} className="dashboardContent subPage">
                <IonHeader collapse="condense" mode="ios">
                <IonToolbar >

<IonButtons slot="end">
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
                <IonItem>
                <IonLabel>
                Coming soon
                </IonLabel>
                </IonItem>
                </IonList>
      </IonPopover>
                <IonButton slot="end" onClick={ (e) => this.setState({showPopover:{open: !this.state.showPopover.open, event: e.nativeEvent}}) }>
                <IonIcon slot="end" icon={ellipsisVerticalCircleOutline} />

                </IonButton>
                </IonButtons>
                
                <IonTitle size="large">
                <CompanyName clientId={this.props.match.params.client}/>
                </IonTitle>
                </IonToolbar>
                </IonHeader>

                <div className="dashboardMainContainer">

                <QuickInsightsByClientId clientId={this.props.match.params.client}/>



                <IonCard button={true} className="fitContentCard buttonCard">
                <Link to={`/${this.props.match.params.client}/dashboard/entriesDetail`} style={{width:"fit-content"}}>
                <IonCardHeader>
                <IonCardTitle>
                Entries
                </IonCardTitle>
                <IonCardSubtitle>
                view all
                <IonIcon icon={arrowForwardOutline} color="primary" style={{marginBottom: "-2px"}}/>
                </IonCardSubtitle>
                </IonCardHeader>

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
