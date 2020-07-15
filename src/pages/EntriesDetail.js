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
import { gql } from 'apollo-boost';
//import Cookies from 'js-cookie'
import {
Link
} from "react-router-dom";
import jwt_decode from 'jwt-decode';

    const clientById = gql`
        query getClients($clientId: ID!){
        clientById(clientId: $clientId){
        name
        cardBannerImage
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

    const entriesByClientId = gql`
    query getEntries($clientId: ID!){
        entriesByClientId(clientId: $clientId){
           time
            score {
              score
            }
            comment {
              comment
            }
            compliments {
              love
              service
              products
            } 
        }
    }
`



function CompanyName({clientId}){
    const { loading, error, data } = useQuery(clientById,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (error) localStorage.removeItem('token')
    return data.clientById.name
}

  
function EntriesCards({clientId}){
	const { loading, error, data } = useQuery(entriesByClientId,{
		variables: {clientId},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
		console.log("data: ",data)
console.log(clientId)
		return (
			data.entriesByClientId.map((entry, key) => (
				<div key={key}>
				<IonListHeader style={{paddingLeft: "0"}}>
				{moment(entry.time).format('HH:MM - Do MMMM YYYY')}
				</IonListHeader>

				<IonItem>
				<IonText color="gray" slot="start">
				<div className="circle-underlay">
				<p className="circle-overlay-p">
				{entry.score.score}
				</p>
				</div>
				</IonText>

				<IonLabel>
				<p style={{fontSize: ".75rem"}}>
				<IonText color="gray">
				Entry #{key+1}
				</IonText>
				</p>

				{ entry.compliments !== null &&
					<div>
					<IonText color="gray">
					<h3 className="padding-top-p">
					Compliments:
					</h3>
					</IonText>
					<IonText color="dark">
					{ entry.compliments.love !== false && <p>Loved it!</p>}
					{ entry.compliments.service !== false && <p>Amazing service!</p>}
					{ entry.compliments.products !== false && <p>Great products!</p>}
					</IonText>
					</div>

				}


				{entry.comment !== null &&
						<div>
						<IonText color="gray">
						<h3 className="padding-top-p">
						Comment:
						</h3>
						</IonText>
						<IonText color="dark">
						<p className="comment-p">
						{entry.comment.comment}
						</p>
						</IonText>
						</div>
				}
				</IonLabel>
				</IonItem>
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
                <Link to={`/id/${this.props.match.params.client}/dashboard/`} style={{width:"fit-content"}}>
                <IonButton slot="start">
                <IonIcon slot="start" icon={chevronBackOutline}/>
                </IonButton>
                </Link>
                </IonButtons>
                <IonTitle mode="ios">
                <CompanyName clientId={this.props.match.params.client}/> - Feedback entries
                </IonTitle>
                </IonToolbar>
                </IonHeader>


                {/*<CommentCards clientId={this.props.match.params.client}/>*/}

                <IonCard className="">
                <IonCardHeader>
                <IonCardTitle>
                Entries
                </IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                <IonList mode="ios" className="">
                <EntriesCards clientId={this.props.match.params.client}/>
                </IonList>
                </IonCardContent>
                </IonCard>

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
