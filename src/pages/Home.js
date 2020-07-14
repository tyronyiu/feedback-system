import React from 'react';
import './Home.css';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonCardTitle,
	IonButton,
	IonText,
	IonCardSubtitle,
	IonButtons,
	IonList,
	IonItem,
	IonLabel,
	IonIcon,
} from '@ionic/react';
import MenuButtonHomePage from '../components/MenuButtonHomePage';
import { leafOutline, colorPaletteOutline, appsOutline, handLeftOutline, qrCodeOutline, hourglassOutline } from 'ionicons/icons';   

class Home extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: ""
        }
	}



	render(){

		return (
			<div className="Home">
			<IonPage>
			<IonContent className="homepageContentWrapper" fullscreen={true}>
			<IonHeader mode="ios">
			<IonToolbar>
			<IonTitle size="large">
			Ager 
			</IonTitle>


			<IonButtons slot="end">

			{/*
MENU POPOVER
*/}

			<MenuButtonHomePage
			parentCallback = {this.callbackFunction}
			showEditCampaignModal={this.state.showEditCampaignModal}
			clientId = {this.props.match.params.client}
			/>

			</IonButtons>

			</IonToolbar>
			</IonHeader>

			<div className="homepageContent">
			<div className="topSection">



			<img alt="" className="topImage"  src="https://i.ibb.co/VVM89N3/feedback.png"/>


			{/*
	APPLY NOW CARD
	*/}
			<IonCard className="fitContentCard blobCard applyNowCard">
			<IonCardHeader>
			<IonCardSubtitle>
			Ager Feedback System
			</IonCardSubtitle>
			<IonCardTitle>
			Apply now
			</IonCardTitle>
			</IonCardHeader>

			<IonCardContent>
			We are officially launching the beta round for our new feedback system.
			<br/>
			It provides instant feedback with an incredibly intuitive user interface. 
			<br/>
			<br/>
			<a href="mailto:contactager@gmail.com">
			<IonButton>
			Contact us
			</IonButton>
			</a>


			</IonCardContent>
			</IonCard>


			</div>

			{/*
	FEATURES 
	--------
	*/}

			<div className="sectionHeader">
			<h1 style={{fontWeight:"600"}}>
			Features:  
			</h1>        
			</div>

			<div className="featuresSection">
			{/*
	FEATURE #1
	*/}
			<IonCard className="fitContentCard blobCard">
			<IonCardHeader>
			<IonCardSubtitle>

			</IonCardSubtitle>           
			<IonCardTitle>
			Advantages
			</IonCardTitle>
			<IonCardSubtitle>

			</IonCardSubtitle>
			</IonCardHeader>

			<IonCardContent>

			{/*
	ADVANTAGES LIST
	*/}
			<IonList>
			{/*
			ECO FRIENDLY
			*/}
			<IonItem>
			<IonIcon icon={leafOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Eco-friendly - no paper use
			</IonLabel>
			</IonItem>

			{/*
			MODERN DESIGN
			*/}
			<IonItem>
			<IonIcon icon={colorPaletteOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Modern UI - Innovative User experience
			</IonLabel>
			</IonItem>

			{/*
			STANDALONE MINI APP
			*/}
			<IonItem>
			<IonIcon icon={appsOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Standalone Mini App - No additional install needed, for anyone
			</IonLabel>
			</IonItem>

			{/*
			DISKRETION & PRIVACY
			*/}
			<IonItem>
			<IonIcon icon={handLeftOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Discretion & Privacy - Secure data storage and anonymization
			</IonLabel>
			</IonItem>

			{/*
			OPEN STANDARDS
			*/}
			<IonItem>
			<IonIcon icon={qrCodeOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Open Standards - ISO guidelines for universal integration
			</IonLabel>
			</IonItem>

			{/*
			INSTANTLY DEPLOYED
			*/}
			<IonItem>
			<IonIcon icon={hourglassOutline} slot="start" />
			<IonLabel className="ion-text-wrap">
			Instant Deployment - less than 24h setup time
			</IonLabel>
			</IonItem>



			</IonList>



			</IonCardContent>
			<IonCardHeader>
			<IonCardTitle>
			Retail Experience Transformed
			</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
The world’s most successful retailers don’t just sell products. They attract
and retain loyal customers and deliver personalised experiences,
recommendations and world-class services across every channel and touchpoint,
all delivered by engaged, motivated staff who know their customers inside out.
<br/><br/>
Collecting and analysing customer experience feedback is key for being able to
provide such a high-class service.
<br/><br/>
Our Feedback XM platform aims with all its features and advantages to aim your
business in such development.
			</IonCardContent>
			</IonCard>


			{/*
	FEATURE #2
	*/}

	<IonCard className="fitContentCard blobCard">
	<IonCardHeader>
	<IonCardSubtitle>
	Natural language processing (NLP), sentiment & emotion analysis
	</IonCardSubtitle>           
	<IonCardTitle>
	AI powered analysis
	</IonCardTitle>
	<IonCardSubtitle>
	(Coming Soon)
	</IonCardSubtitle>
	</IonCardHeader>

	<IonCardContent>
	Feedback comments can be analysed with AI technology to gain advanced insights. <br/>
	Basic general sentiment analysis and emotion categorisation can
tell how well an event was received or how satisfactory a customer
experience was, without needing score-values.
	</IonCardContent>
	<IonCardHeader>
	<IonCardTitle>
	Language insights
	</IonCardTitle>
	</IonCardHeader>
	<IonCardContent>
	Most relevant words can be categorised into a word cloud, giving you clear overview over specifics of most interactions at a glance. "Good", "Bad" and synonyms provide general context categorisation.
	</IonCardContent>
	</IonCard>

	</div>

	{/*
	INSTANT AVAILABILITY SECTION
	*/}
	<div className="sectionHeader">
	<h1 style={{fontWeight:"600"}}>
	Instant availability & customisation 
	</h1>
	</div>

	<div className="instantAvailabilitySection">
	<IonText color="medium" mode="ios">
	<p>
	You let us know a few details and we deliver your feedback campaign in less than 24h.
	</p>

	<p>
	We adapt your feedback campaign with to your brand by including a visual stimulation, so that you can make your campaign truly yours!
	</p>

	{/*<hr style={{height:"0",border:"0.5px solid"}}/>*/}
	</IonText>

	</div>
	{/*
	SHOWCASE IMAGES
	*/}

	<div className="flex">
	<img className="flex-image" alt="" src="https://i.ibb.co/VVM89N3/feedback.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/y0GMn22/dashboard.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/WvNjzkg/dashboard-menu.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/pdPwmg5/edit-Campaign.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/NY6Vm5S/feedback-dark.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/PzSH9nr/dashboard-dark.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/WK0ZXc5/dashboard-menu-dark.png"/>
	<img className="flex-image" alt="" src="https://i.ibb.co/MhMF0GY/edit-Campaign-dark.png"/>
	</div>







	{/*
	USE CASES
	*/}

	<div className="sectionHeader">
<h2>
Experience Management
</h2>
	<h1 style={{fontWeight:"600"}}>
	Use cases:  
	</h1>        
	</div>

	<div className="useCasesSection">


{/*
	CUSTOMER EXPERIENCE
*/}
	<IonCard className="fitContentCard blobCard" mode="ios">
	<IonCardHeader>
	<IonCardSubtitle>
	Gather Customer Feedback	
	</IonCardSubtitle>
	<IonCardTitle>
	Customer Experience	(CX)
	</IonCardTitle>
	</IonCardHeader>

	<IonCardContent>
	Having an event or wanna know how things are going directly, yet
discretly from your employees?
	<br/>
	<br/>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	<IonCardHeader>
	<IonCardSubtitle>
	Advanced insights
	</IonCardSubtitle>
	</IonCardHeader>
	<IonCardContent>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	</IonCard>


{/*
	EMPLOYEE EXPERIENCE
*/}
	<IonCard className="fitContentCard blobCard">
	<IonCardHeader>
	<IonCardSubtitle>
	Gather Customer Feedback	
	</IonCardSubtitle>
	<IonCardTitle>
	Employee Experience	(EX)
	</IonCardTitle>
	</IonCardHeader>

	<IonCardContent>
	Having an event or wanna know how things are going directly, yet
discretly from your employees?
	<br/>
	<br/>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	<IonCardHeader>
	<IonCardSubtitle>
	Advanced insights
	</IonCardSubtitle>
	</IonCardHeader>
	<IonCardContent>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	</IonCard>

{/*
	BRAND EXPERIENCE
*/}
	<IonCard className="fitContentCard blobCard">
	<IonCardHeader>
	<IonCardSubtitle>
	Gather Brand Insights
	</IonCardSubtitle>
	<IonCardTitle>
	Brand Experience (BX)
	</IonCardTitle>
	</IonCardHeader>

	<IonCardContent>
	Having an event or wanna know how things are going directly, yet
discretly from your employees?
	<br/>
	<br/>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	<IonCardHeader>
	<IonCardSubtitle>
	Advanced insights
	</IonCardSubtitle>
	</IonCardHeader>
	<IonCardContent>
	You can add event specific prompts to comment on, so that no
matter what, you can gain intelligence insights into your
operations.
	</IonCardContent>
	</IonCard>



	</div>

	</div>
	</IonContent>

	</IonPage>
	</div>
);
}
}

export default Home;
