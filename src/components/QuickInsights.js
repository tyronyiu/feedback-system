import React from 'react';
import './QuickInsights.css';
import {
       IonText,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Card from './Card';
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
// linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)
function QuickInsightsByClientId({clientId}){
    const { loading, error, data } = useQuery(quickInsightsByClientId,{
        variables: {clientId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        return (
           <div className="content">
        <Card color="" title={data.quickInsightsByClientId.entriesCount} subtitle="Entries" />      
            { data.quickInsightsByClientId.averageScore > 4.5 &&
                <div>
        <Card 
                //background="linear-gradient(-45deg, #8ef090, #3CF0C5)"
                title={data.quickInsightsByClientId.averageScore} 
                subtitle="Average Score"
                />      
                <div style={{
                    background:"linear-gradient(-45deg, #8ef090, #3CF0C5)",
                        backgroundSize:"600px",
                        height: "150px",
                        width: "150px",
                        position: "absolute",
                        filter: "blur(50px) brightness(1.1)",
                        marginTop: "-150px",
                }}>
                </div>
                </div>
            }

{ data.quickInsightsByClientId.averageScore < 4.5 &&
                <div>
        <Card 
                //background="linear-gradient(-45deg, #8ef090, #3CF0C5)"
                title={data.quickInsightsByClientId.averageScore} 
                subtitle="Average Score"
                />      
                <div style={{
                    background:"linear-gradient(-45deg, rgb(20, 35, 188), rgb(56, 154, 255))",
                        backgroundSize:"550px",
                        height: "150px",
                        width: "150px",
                        position: "absolute",
                        filter: "blur(50px) ",
                        marginTop: "-150px",
                }}>
                </div>
                </div>
}
            <div>
        <Card color="" title={data.quickInsightsByClientId.commentsCount} subtitle="Comments" />      
 <div style={{
     background:"linear-gradient(135deg, #12B2FC, #FF3D77)",
                        backgroundSize:"150px",
                        height: "50px",
                        weidth: "50px",
                        filter: "blur(50px) brightness(1.1)",
                        position: "relative",
                        marginTop: "-50px",
                }}>
                </div>
            </div>
        <Card color="" title={data.quickInsightsByClientId.complimentsCount} subtitle="Compliments" />      

            </div>
        )
}

  
class QuickInsights extends React.Component {
	constructor(props){
		super(props);
        this.state = {
        }
	}


    componentDidMount(){
    }

	render(){
  return (
      <>
            <IonText color="dark" >
      <h1 className="title">Quick Insights</h1>
      </IonText>
    <QuickInsightsByClientId clientId={this.props.clientId}/>
      </>
  );
}
}

export default QuickInsights;
{/*

            <IonCard className="quickInsightsCard fitContentCard blobCard">
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

*/}
