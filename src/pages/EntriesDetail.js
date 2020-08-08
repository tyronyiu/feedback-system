import React from 'react';
import moment from 'moment';
import './Dashboard.css';
import './EntriesDetail.css';
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar,
IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
IonItem,
IonLabel,
IonListHeader,
IonText,
//IonAvatar,
IonCard,
IonCardHeader,
IonCardContent,
IonCardTitle,
//IonCardSubtitle,
IonButtons,
    IonButton,
//IonBackButton,
    IonIcon,
} from '@ionic/react';
import { chevronBackOutline, } from 'ionicons/icons';   
import {CSSTransition} from 'react-transition-group';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
//import Cookies from 'js-cookie'
import {
Link
} from "react-router-dom";
import jwt_decode from 'jwt-decode';

    const CampaignByCampaignId= gql`
        query campaignByCampaignId($campaignId: ID!){
        campaignByCampaignId(campaignId: $campaignId){
        name
        }
        }
    `
//    const commentsByClientId = gql`
//    query getComments($clientId: ID!){
//        commentsByClientId(clientId: $clientId){
//        comment
//        }
//    }
//`

    const EntriesByCampaignId= gql`
    query getEntries($campaignId: ID!){
        entriesByCampaignId(campaignId: $campaignId){
            time
            score
            comment
            _id
        }
    }
`

   const RemoveEntryByCampaignId = gql`
    mutation removeEntry($entryId: ID!, $campaignId: ID!){
        removeEntryByCampaignId(entryId: $entryId, campaignId: $campaignId){
        _id
        }
    }
` 


function CampaignName({campaignId}){
    const { loading, error, data } = useQuery(CampaignByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (error) localStorage.removeItem('token')
    return data.campaignByCampaignId.name
}

  
function EntriesCards({campaignId}){
    var entryId
    const [removeEntryByCampaignId] = useMutation(RemoveEntryByCampaignId, {
        variables: {
            entryId,
            campaignId
        }
    });

	const { loading, error, data, refetch } = useQuery(EntriesByCampaignId,{
		variables: {campaignId},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
		console.log("data: ",data)
		return (
			data.entriesByCampaignId.map((entry, key) => (
				<div key={key}>

                <IonItemSliding id={entry._id}>
				<IonItem>
				<IonText color="gray" slot="start">
				<div className="circle-underlay">
				<p className="circle-overlay-p">
				{entry.score}
				</p>
				</div>
				</IonText>

				<IonLabel>
				<p style={{fontSize: ".75rem"}}>
				<IonText color="gray">
				{moment(entry.time).format('HH:mm - D MMMM YYYY')}
				</IonText>
				</p>

				<p style={{fontSize: ".75rem"}}>
				<IonText color="gray">
				Entry #{key+1}
				</IonText>
				</p>

			


				{entry.comment !== null &&
						<div>
						<IonText color="gray">
						<h3 className="padding-top-p">
						Comment:
						</h3>
						</IonText>
						<IonText color="dark">
						<p className="comment-p">
						{entry.comment}
						</p>
						</IonText>
						</div>
				}
				</IonLabel>
				</IonItem>

                <IonItemOptions side="end">
                <IonItemOption color="danger" expandable
                onClick={() => {
               const slidingitem = document.getElementById(entry._id) 
                    slidingitem.close()

            removeEntryByCampaignId({ 
                variables: { 
                    entryId: entry._id,
                    campaignId: campaignId
                }
            })
		    refetch()
                }}>
                Delete
                </IonItemOption>
                </IonItemOptions>

                </IonItemSliding>
				</div>
			))
		)
    
}


class EntriesDetail extends React.Component {
	constructor(props){
		super(props);
        this.state = {
		thanks: "",
            animate: true
        }
	}

    componentDidMount(){
        if (localStorage.getItem('token')){
        var decoded = jwt_decode(localStorage.getItem('token'));
        console.log(decoded);  
            if (decoded.email === "public@public.com"){
                localStorage.removeItem('token');
                this.props.history.push(`/login/`)
            }
        }
    }


	render(){
		if (localStorage.getItem('token')) {
            return (
                <div className="">
                <CSSTransition appear in={this.state.animate} timeout={200} classNames="my-node">
                <IonPage>
                

                <IonContent fullscreen={true} className="">
              
<IonHeader translucent={true} mode="ios">
                <IonToolbar mode="ios">
<IonButtons slot="start">
                <Link to={`/id/${this.props.match.params.client}/dashboard/${this.props.match.params.campaign}`} style={{width:"fit-content"}}>
                <IonButton slot="start">
                <IonIcon slot="start" icon={chevronBackOutline}/>
                </IonButton>
                </Link>
                </IonButtons>
                <IonTitle mode="ios">
                <CampaignName campaignId={this.props.match.params.campaign}/> - Feedback entries
                </IonTitle>
                </IonToolbar>
                </IonHeader>


                {/*<CommentCards clientId={this.props.match.params.client}/>*/}

                <div className="entriesDetailList">
                <IonCard className="">
                <IonCardHeader>
                <IonCardTitle>
                Entries
                </IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                <IonList mode="ios" className="">
                <EntriesCards campaignId={this.props.match.params.campaign}/>
                </IonList>
                </IonCardContent>
                </IonCard>
                </div>

                </IonContent>

                </IonPage>
                </CSSTransition>
                </div>
            );
		}
		else{
			this.props.history.push(`/login`)
return (<><h1>An error has occured</h1><h2>Please log out and log in again</h2></>)

		}
}
}

export default EntriesDetail;


	//{ entry.compliments !== null &&
				//	<div>
				//	<IonText color="gray">
				//	<h3 className="padding-top-p">
				//	Compliments:
				//	</h3>
				//	</IonText>
				//	<IonText color="dark">
				//	{ entry.compliments.love !== false && <p>Loved it!</p>}
				//	{ entry.compliments.service !== false && <p>Amazing service!</p>}
				//	{ entry.compliments.products !== false && <p>Great products!</p>}
				//	</IonText>
				//	</div>

				//}
