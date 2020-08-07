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
    IonIcon,
    IonFab,
    IonFabList,
    IonFabButton,
    IonAlert
} from '@ionic/react';
import {  arrowForwardOutline } from 'ionicons/icons';   
import ButtonCard from '../components/ButtonCard';
//import Card from '../components/Card';
import QuickInsights from '../components/QuickInsights';
import MenuButton from '../components/MenuButton';
import EditCampaignModal from '../components/EditCampaignModal';
import ShowQRModal from '../components/ShowQRModal';
import { albumsOutline, appsOutline, exitOutline, createOutline, qrCodeOutline } from 'ionicons/icons';   
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//import QRCode from "qrcode.react";
//import Cookies from 'js-cookie'
import {
    Link
} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import jwt_decode from 'jwt-decode';

const CampaignById= gql`
        query campaignById($campaignId: ID!){
        campaignByCampaignId(campaignId: $campaignId){
        name
        coverImage
        }
        }
    `
function CampaignName({campaignId}){
    const { loading, error, data } = useQuery(CampaignById,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) localStorage.removeItem('token')
    if (error) return <p>Error :(</p>;
        console.log(data)
        return data.campaignByCampaignId.name
    }


class DashboardInTransition extends React.Component {
    constructor(){
        super();
        this.state = {
            showPopover: {
                open: false,
                event: undefined
            },
            showEditCampaignModal: false,
            showQRModal: false,
            showLogOutAlert: false,
            showUserAccountModal: false,
            animate: true,
        }
    }

    componentDidMount(){
        console.log("campaign: ",this.props.match.params.campaign)
        console.log("clientId: ", this.props.match.params.client)
        if (localStorage.getItem('token')){
            var decoded = jwt_decode(localStorage.getItem('token'));
            console.log(decoded);  
            if (decoded.email === "public@public.com"){
                localStorage.removeItem('token');
                this.props.history.push(`/login/`)
            }
        }
    }


    callbackFunctionEditCampaignModal = (childData) => {
        this.setState({showEditCampaignModal: childData})
    }
    callbackFunctionQRModal = (childData) => {
        this.setState({showQRModal: childData})
    }

    render(){
        if (localStorage.getItem('token')) {
            return (
                <CSSTransition appear in={this.state.animate} timeout={200} key="home" classNames="my-node-back">
                <IonPage className="dashboardPage">
                <IonContent fullscreen={true}  className="dashboardContent subPage">

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
                showEditCampaignModal={this.state.showEditCampaignModal}
                clientId={this.props.match.params.client}
                campaignId={this.props.match.params.campaign}
                />

                </IonButtons>

                <IonTitle size="large">
                <CampaignName campaignId={this.props.match.params.campaign}/>
                </IonTitle>
                </IonToolbar>
                </IonHeader>

                <div className="dashboardMainWrapper">

               
                <div className="dashboardMainContainer">
                {/*
QUICK INSIGHTS
*/}

                <QuickInsights campaignId={this.props.match.params.campaign}/>

                </div>

                <div className="dashboardMainContainer">

                {/*
ENTRIES CARD
*/}
                <Link to={`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}/entriesDetail`} style={{width:"fit-content"}}>
                <ButtonCard
                title="Entries"
                subtitle="view all"
                icon={arrowForwardOutline}
                button={true}
                />
                </Link>


                {/*
EDIT CAMPAIGN CARD
*/}
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob2"></img>
                <ButtonCard
                title="Campaign"
                subtitle="edit"
                icon={arrowForwardOutline}
                button={true}
                parentCallback = {this.callbackFunctionEditCampaignModal}
                />
                {/*
SHOW QR CARD
*/}
                <ButtonCard
                subtitle="view QR"
                icon={arrowForwardOutline}
                title={<IonIcon icon={qrCodeOutline}/>}
                button={true}
                parentCallback = {this.callbackFunctionQRModal}
                />

                </div>





                </div>

                {/*
EDIT CAMPAIGN MODAL
*/}
                <EditCampaignModal
                showEditCampaignModal={this.state.showEditCampaignModal}
                parentCallback = {this.callbackFunctionEditCampaignModal}
                clientId={this.props.match.params.client}
                campaignId={this.props.match.params.campaign}
                history={this.props.history}
                />

                {/*
SHOW QR MODAL
*/}
                <ShowQRModal
                showQRModal={this.state.showQRModal}
                parentCallback = {this.callbackFunctionQRModal}
                clientId={this.props.match.params.client}
                campaignId={this.props.match.params.campaign}
                history={this.props.history}
                />






                <IonFab horizontal="end" vertical="bottom" slot="fixed" mode="ios">
                <IonFabButton color="dark">
                <IonIcon icon={appsOutline}></IonIcon>
                </IonFabButton>

                <IonFabList side="top">

                <IonFabButton color="primary"
                onClick={() => { this.setState({showLogOutAlert: !this.state.showLogOutAlert})
                }}>
                <IonIcon icon={exitOutline}></IonIcon>
                </IonFabButton>

                <IonFabButton size="small" color="primary"
                onClick={() => {this.setState({showEditCampaignModal: !this.state.showEditCampaignModal})}} >
                <IonIcon icon={createOutline}></IonIcon>
                </IonFabButton>

                <IonFabButton color="primary"
                onClick={() => {this.props.history.push(`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}/campaigns`)}} >
                <IonIcon icon={albumsOutline}></IonIcon>
                </IonFabButton>

                </IonFabList>
                </IonFab>

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
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob1"></img>
                <img src="https://tyotyodata.imfast.io/color-hash.svg" alt="penis" className="blurred blob3"></img>
                */}
                </IonContent>



                </IonPage>
                </CSSTransition>
            );
        }
        else{
            this.props.history.push(`/login/`)
            return (
                <h1>
                Please login 
                <a href={`https://feedback.agerspace.com/#/login/`}> 
                here
                </a>
                </h1>) 
        }
    }
}

export default DashboardInTransition;
