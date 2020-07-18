import React from 'react';
import './QuickInsights.css';
import {
       IonText,
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Card from './Card';
   const QuickInsightsByCampaignId= gql`
        query quickInsightsByCampaignId($campaignId: ID!){
        quickInsightsByCampaignId(campaignId: $campaignId){
            entriesCount
            commentsCount
            complimentsCount
            averageScore
        }
        }
    `
// linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)
function QuickInsightsCards({campaignId}){
    const { loading, error, data } = useQuery(QuickInsightsByCampaignId,{
        variables: {campaignId}
    });
    if (loading) return <p>Loading...</p>;
    if (error) localStorage.removeItem('token')
    if (error) return <p>Error :(</p>;
        return (
            <div className="content">
            <Card color="" title={data.quickInsightsByCampaignId.entriesCount ? data.quickInsightsByCampaignId.entriesCount : "0" } subtitle="Entries" />      
            { data.quickInsightsByCampaignId.averageScore >= 4.5 &&
                <div className="scoreCard">
                <Card 
                //background="linear-gradient(-45deg, #8ef090, #3CF0C5)"

                title={data.quickInsightsByCampaignId.averageScore ? data.quickInsightsByCampaignId.averageScore : "0"} 
                subtitle="Average Score"
                />      
                <div style={{
                    background:"linear-gradient(-45deg, #8ef090, #3CF0C5)",
                        backgroundSize:"600px",
                        height: "150px",
                        zIndex: "-2",
                        width: "150px",
                        position: "absolute",
                        filter: "blur(50px)",
                        marginTop: "-150px",
                }}>
                </div>
                </div>
            }

            { data.quickInsightsByCampaignId.averageScore < 4.5 &&
                <div className="scoreCard">
<p>Your score is out of 5</p>
                    <Card 
                //background="linear-gradient(-45deg, #8ef090, #3CF0C5)"
                title={data.quickInsightsByCampaignId.averageScore ? data.quickInsightsByCampaignId.averageScore : "0"} 
                subtitle="Average Score"

                    />      
                    <div style={{
                        background:"linear-gradient(-45deg, rgb(20, 35, 188), rgb(56, 154, 255))",
                            backgroundSize:"550px",
                            height: "150px",
                            width: "150px",
                            zIndex: "-2",
                            position: "absolute",
                            filter: "blur(50px) ",
                            marginTop: "-150px",
                    }}>
                    </div>
                    </div>
            }
            <div>
            <Card color="" title={data.quickInsightsByCampaignId.commentsCount ? data.quickInsightsByCampaignId.commentsCount : "0" } subtitle="Comments" />      
            <div style={{
                background:"linear-gradient(135deg, #12B2FC, #FF3D77)",
                    backgroundSize:"150px",
                    zIndex: "-2",
                    height: "50px",
                    weidth: "50px",
                    filter: "blur(50px) brightness(1.1)",
                    position: "relative",
                    marginTop: "-50px",
            }}>
            </div>
            </div>
            <Card color="" title={data.quickInsightsByCampaignId.complimentsCount ? data.quickInsightsByCampaignId.complimentsCount : "0"} subtitle="Compliments" />      

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
      <div>
            <IonText color="dark" >
      <h1 className="title">Quick Insights</h1>
      </IonText>
    <QuickInsightsCards campaignId={this.props.campaignId}/>
      </div>
  );
}
}

export default QuickInsights;
