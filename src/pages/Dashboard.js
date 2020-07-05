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
//IonCard,
//IonCardHeader,
//IonCardContent,
//IonCardTitle,
//IonCardSubtitle,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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


//function CommentCards({clientId}){
//    const { loading, error, data } = useQuery(commentsByClientId,{
//        variables: {clientId}
//    });
//    if (loading) return <p>Loading...</p>;
//    if (error) return <p>Error :(</p>;
//    return (
//          data.commentsByClientId.map((comment, key) => (
//
//              <IonList>
//              <IonItem key={key}>
//              <IonLabel>
//              <IonText color="medium">
//              #{key}
//              </IonText>
//              </IonLabel>
//              {comment.comment}
//              </IonItem>
//              </IonList>
//          )
//    )
//    )
//    
//}
  
function EntriesCards({clientId}){
	const { loading, error, data } = useQuery(entriesByClientId,{
		variables: {clientId}
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
		console.log(data)
		return (
			data.entriesByClientId.map((entry, key) => (
				<div key={key}>
				<IonListHeader>
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
						<p>
						{entry.comment.comment}
						</p>
						</IonText>
						</div>
				}
				</IonLabel>
				</IonItem>
				</div>
			)
			)
		)
    
}





class Dashboard extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: ""
        }
	}



	render(){

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


      <IonContent fullscreen={true}>
      <IonHeader collapse="condense">
      <IonToolbar>
      <IonTitle size="large">
      <CompanyName clientId={this.props.match.params.client}/>
      </IonTitle>
      </IonToolbar>
      </IonHeader>

      {/*<CommentCards clientId={this.props.match.params.client}/>*/}
<IonList mode="ios">
     <EntriesCards clientId={this.props.match.params.client}/>
</IonList>
{/*
<IonCard>
<IonCardHeader>
<IonCardTitle>
Feedback entries
</IonCardTitle>
</IonCardHeader>
<IonCardContent>
</IonCardContent>
</IonCard>
*/}

      </IonContent>

      </IonPage>
      </div>
  );
}
}

export default Dashboard;
