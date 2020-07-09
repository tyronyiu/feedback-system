import React from 'react';
//import moment from 'moment';
import './Dashboard.css';
import '../color-hash.svg';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonButtons,
    
} from '@ionic/react';
import {  arrowForwardOutline } from 'ionicons/icons';   
import ButtonCard from '../components/ButtonCard';
import QuickInsights from '../components/QuickInsights';
import MenuButton from '../components/MenuButton';
import EditCampaignModal from '../components/EditCampaignModal';

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
            showPopover: {
                open: false,
                event: undefined
            },
            showEditCampaignModal: false,
            showLogOutAlert: false,
            showUserAccountModal: false,
        }
    }

callbackFunction = (childData) => {
          this.setState({showEditCampaignModal: childData})
}

    render(){
        if (localStorage.getItem('token')) {
            return (
                <IonPage className="dashboardPage">
                <IonContent fullscreen={true} style={{height: "100%"}} className="dashboardContent subPage">

                {/*
HEADER
*/}
                <IonHeader collapse="condense" mode="ios" style={{zIndex: "2"}}>
                <IonToolbar >

                <IonButtons slot="end">

                {/*
MENU POPOVER
*/}

                <MenuButton
                parentCallback = {this.callbackFunction}
                />

                </IonButtons>

                <IonTitle size="large">
                <CompanyName clientId={this.props.match.params.client}/>
                </IonTitle>
                </IonToolbar>
                </IonHeader>

                <div className="dashboardMainWrapper">

                <div className="dashboardMainContainer">
                {/*
QUICK INSIGHTS
*/}

                <QuickInsights clientId={this.props.match.params.client}/>

                {/*
ENTRIES CARD
*/}
                <Link to={`/${this.props.match.params.client}/dashboard/entriesDetail`} style={{width:"fit-content"}}>
                <ButtonCard
                title="Entries"
                subtitle="view all"
                icon={arrowForwardOutline}
                button={true}
                />
                </Link>
                </div>

                {/*
EDIT CAMPAIGN CARD
*/}
                <div className="dashboardMainContainer">
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob2"></img>
                <ButtonCard
                subtitle="edit campaign"
                icon={arrowForwardOutline}
                button={true}
                parentCallback = {this.callbackFunction}
                />
                </div>

                </div>

                {/*
EDIT CAMPAIGN MODAL
*/}
                <EditCampaignModal
                showEditCampaignModal={this.state.showEditCampaignModal}
                parentCallback = {this.callbackFunction}
                />


                {/*
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob1"></img>
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob3"></img>
                */}
                </IonContent>

                </IonPage>
            );
        }
        else{
            this.props.history.push(`/${this.props.match.params.client}/login`)
            return (
                <h1>
                Please login 
                <a href={`https://feedback.agerspace.com/#/${this.props.match.params.client}/login/`}> 
                here
                </a>
                </h1>) 
        }
    }
}

export default Dashboard;
