import React from 'react';
import moment from 'moment';
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
//IonCardSubtitle,
IonButtons,
    IonButton,
//IonBackButton,
    IonIcon,
} from '@ionic/react';
import { chevronBackOutline, } from 'ionicons/icons';   

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
    return data.clientById.name
}

  
function EntriesCards({clientId}){




	const { loading, error, data } = useQuery(entriesByClientId,{
		variables: {clientId},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
		console.log(data)
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
                

                <IonContent fullscreen={true} className="">
              
<IonHeader translucent={true} mode="ios">
                <IonToolbar mode="ios">
<IonButtons slot="start">
                <Link to={`/${this.props.match.params.client}/dashboard/`} style={{width:"fit-content"}}>
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
                </div>
            );
		}
		else{
			this.props.history.push(`/${this.props.match.params.client}/login`)
return null

		}
}
}

export default EntriesDetail;
