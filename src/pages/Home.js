import React from 'react';
import './Home.css';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCardTitle,
	IonButton,
	IonButtons,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react';
import MenuButtonHomePage from '../components/MenuButtonHomePage';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AdvantagesList from '../components/AdvantagesList';
import { arrowUpCircle, appsOutline, enterOutline, compassOutline, callOutline, createOutline } from 'ionicons/icons';   
import { Link } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';


function getContent() {
            return document.querySelector('ion-content');
        }

    function scrollToTop() {
                const container = getContent();
//                if(container) container.scrollToPoint({top:0, left:0, behaviour:'smooth'});
if(container) container.scrollToTop(300)

     
    }


function scrollTo(element:string) {
    let yOffset = document.getElementById(element).offsetTop;
                const container = getContent();
if(container)    container.scrollToPoint(0, yOffset, 300)
  }


class Home extends React.Component {
	constructor(){
		super();
        this.state = {
		thanks: "",
        animate:true,
        }
	}




	render(){

        return (
            <div className="Home">
            <CSSTransition appear in={this.state.animate} key="home" timeout={200} classNames="my-">
            <IonPage>
            <IonContent
            className="homepageContentWrapper"
            fullscreen={true}
            scrollEvents="true" 
            >
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

            <div style={{display: "flex", flexFlow:"column wrap", alignSelf:"center"}}>

   {/*
    DEMO CAMPAIGN CARD
    */}
            <div className="miniCard">
            <Card 
            title="Try it out!"
            subtitle="DEMO CAMPAIGN"
            content={<>
               For you to see and feel, we made a demo campaign.                 
                <br/>
                You can check it out here: 
                <br/>
                <br/>
                <Link to="/id/_d2e8upv8x">
                <IonButton >
                Demo
                </IonButton>
                </Link>
                </>}
            />
</div>
            {/*
    APPLY NOW CARD
    */}
            <div className="miniCard">
            <Card 
            title="Get beta access"
            subtitle="Ager Feedback System"
            content={<>
                Our new system provides instant feedback with an incredibly intuitive user interface. 
                <br/>
                <br/>
                <Link to="/signup">
                <IonButton >
                Sign up
                </IonButton>
                </Link>
                </>}
            />
</div>
 </div>

            </div>

            {/*
    FEATURES 
    --------
    */}

            <div className="sectionHeader">
            <h1 id="features" className="sectionHeaderTitle">
            Features:  
            </h1>        
            </div>

            <div style={{alignItems:"center" }} className="featuresSection">

            {/*
    FEATURE #1
    */}
            <Card 
            title="Advantages"
            content={<AdvantagesList/>}
            />

            {/*
    FEATURE #2
    */}
            <div className="miniCard">
            <Card 
            title="Plug-Play Solution"
            content="CX implementation into existing systems can be tedious, that's why our system can and should be used as a standalone application."
            />
            </div>

            </div>
            <div style={{alignItems:"center" }} className="featuresSection">
            {/*
    FEATURE #3
    */}

            <Card 
            title="The new standard of Customer Experience (CE)"
            content={<>
                Products dont sell themselves, customer attraction, loyalty and experience is
                essential to success.  Engaged, motivated and proactive staff that know their
                customers go a long way in terms of customer retention.
                <br/><br/>
                The aim is to become a company that proactively advances its customer and thus
                retail experiences to become more personal, engaging and inclusive.
                <br/>
                After all, the world’s most successful retailers don’t just sell products.
                <br/><br/>
                Collecting and analysing customer experience feedback is key for being able to
                provide such a high-class experience.
                </>}/>

            {/*
    FEATURE #4
    */}

            <Card 
            title={<>AI powered analysis <br/>(coming soon)</>}
            subtitle="Natural language processing (NLP), sentiment & emotion analysis"
            content={<>
                Feedback comments can be analysed with AI technology to gain advanced insights. <br/>
                Basic general sentiment analysis and emotion categorisation can
                tell how well an event was received or how satisfactory a customer
                experience was, without needing score-values.
                <IonCardTitle style={{padding: "1em 0"}}>
                Language insights
                </IonCardTitle>
                Most relevant words can be categorised into a word cloud, giving you clear overview over specifics of most interactions at a glance. "Good", "Bad" and synonyms provide general context categorisation.
                </>}/>



    </div>

    {/*
    INSTANT AVAILABILITY SECTION
    */}
    <div className="sectionHeader">
    <h1 className="sectionHeaderTitle">
    Instant availability & customisation 
    </h1>
    </div>

    <div className="instantAvailabilitySection">
    <div className="miniCard">
    <Card
subtitle="Ready in less than 24h"
content={<>
    You let us know a few details and we deliver your feedback campaign in less than 24h.
    <br/>
    <br/>
    We adapt your feedback campaign with to your brand by including a visual stimulation, so that you can make your campaign truly yours!
    </>}
    />
    </div>

    {/*<hr style={{height:"0",border:"0.5px solid"}}/>*/}

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
    <h2 id="experience_management" className="sectionHeaderTitle">
    Experience Management (XM)
    </h2>

    <div className="flex" style={{textAlign:"left"}}>
    <Card 
title="What is XM?"
subtitle="And how it can help your business"
content={
    <>
    <div style={{textAlign:"left", }}>
    Your firm incorporates experience management (XM), when they monitor every
    interaction people have with your firm, to identify potential opportunities and
    threats.
    <br/> 
    <br/> 
    Most successful firms are proactive, not reactive, to mitigate possible
    problems before becoming significant or employ opportunity leveraging
    strategies.
    <br/>
    <br/>
    Predictive decision making processes rely on historical data, which is why
    monitoring interactions with your firm is an essential part for XM.
    </div>
    <IonList style={{"--ion-background-color":"none"}}>
    <IonItem lines="none">
    </IonItem>

    <IonItem lines="none">
    <IonLabel style={{textAlign: "center"}}>
    Customer Experience (CX)
    </IonLabel>
    </IonItem>

    <IonItem lines="none">
    <IonLabel style={{textAlign: "center"}}>
    Employee Experience (EX)
    </IonLabel>
    </IonItem>

    <IonItem lines="none">
    <IonLabel style={{textAlign: "center"}}>
    Brand Experience (BX)
    </IonLabel>
    </IonItem>

    </IonList>
    </>}/>
    </div>


    <h1 className="sectionHeaderSubtitle">
    Use cases:  
    </h1>        
    </div>

    <div className="useCasesSection">


    {/*
    EVENT FEEDBACK
    */}
    <Card 
subtitle="Gather insights about an event"
title="Event Feedback"
content={<>
    Suppose you're having an event, maybe a concert or a party, and want to gather
    insights about how it is perceived.
    <br/>
    <br/>
    You can start a feedback campaign and have it up an running in just 24h and collect useful ratings from your customers or attendees.
    <IonCardTitle style={{padding: "1em 0"}}>
    Thorough adaptability 
    </IonCardTitle>
    You can add event specific prompts to comment on, so that no
    matter what the occasion, you can gain intelligence insights into <em>your</em> event.
    </>
}
    />


    {/*
    CUSTOMER EXPERIENCE
    */}
    <Card 
subtitle="Gather Customer Feedback"
title="Customer Experience (CX)"
content={<>
    Customer satisfaction, experience and service are keywords when it comes to grading performance.
    Our system provides quick insights into the overall satisfaction and can drill down into multiple dimensions to gain deep information about topics of choice.
    <br/>
    <br/>
    Supppose you'd want to analyse the satisfaction with the service of your customer support.
    <IonCardTitle style={{padding: "1em 0"}}>
    Boosted Customer Relations	
    </IonCardTitle>
    When one asks genuinely for opinion, most response is authentic in return. Additionally, integration of customers, very similar to employees can be well appreciated.
    Start a campaign with a custom prompt and gather specific customer insights.
    </>
}
    />


    </div>
    <div className="useCasesSection">
    {/*
    EMPLOYEE EXPERIENCE
    */}

    <Card 
subtitle="Gather Employee Feedback"
title="Employee Experience (EX)"
content={<>
    Leveraging proactive human capital and increasing employee engagement require involvement and employee experience is majorly driven by valuation. Thus, enabling employees to be part and engage actively in decision making processes and internal operations.
    <br/>
    <br/>
    The experience employees have is valuable information with great insights into the opinions and inner workings behind employee's behaviour.
    <IonCardTitle style={{padding: "1em 0"}}>
    Enhanced Employee Experience
    </IonCardTitle>
    The feedback campaigns employers set up can be for various uses, such as
    internal events, opinions about a potential change, or simply to see how
    everybody feels.  The benefits of such campaigns are increasingly better
    employee experiences over time. To maximise the experience, inclusion and
    listenting are the start.
    </>
}
    />

    {/*
    BRAND EXPERIENCE
    */}
    <Card 
subtitle="Gather Brand Appearance Insights"
title="Brand Experience (BX)"
content={<>
    Brand perception is what comes to your customers' minds when they about your
    product / service - The brand perception is not what the company says the brand
    or product is, but is dictated by customers.
    <br/>
    <br/>
    The perception of customers is thus vital for brand equity as the extra value
    to the product is solely the association with brand perception and not the
    consituent parts' sum. <br/>
    Your brand is what adds value to products and differentiates it enough from the
    competition.
    <IonCardTitle style={{padding: "1em 0"}}>
    Brand Perception Leveraging
    </IonCardTitle>
    Perceived value can be increased by leveraging brand perception through
    enhanced customer experiences. Knowing how your brand / product is perceived by
    your customers thus tells you more about their aspects than you could ever do
    yourself.
    </>
}
    />




    </div>
    <Footer/>
    </div>

    <IonFab horizontal="end" vertical="bottom" slot="fixed" mode="ios">
    <IonFabButton color="dark">
    <IonIcon icon={appsOutline}></IonIcon>
    </IonFabButton>

    <IonFabList side="top">
    <IonFabButton color="light"
onClick={()=>{
    scrollTo("experience_management")
}}
    >
    <b>XM</b>
    </IonFabButton>

    <IonFabButton color="light"
onClick={()=>{
    scrollTo("features")
}}
    >
    <IonIcon icon={compassOutline}></IonIcon>
    </IonFabButton>

    <IonFabButton color="light"
onClick={() => {scrollToTop()}}
    >
    <IonIcon icon={arrowUpCircle}></IonIcon>
    </IonFabButton>

    </IonFabList>


    <IonFabList side="start">

    <IonFabButton color="primary"
    onClick={() => {this.props.history.push('/login')}} >
        <IonIcon icon={enterOutline}></IonIcon>
    </IonFabButton>

    <IonFabButton size="small" color="primary"
    onClick={() => {this.props.history.push('/signup')}} >
        <IonIcon icon={createOutline}></IonIcon>
    </IonFabButton>

    <IonFabButton color="primary"
    onClick={() => {this.props.history.push('/contact')}} >
        <IonIcon icon={callOutline}></IonIcon>
    </IonFabButton>

    </IonFabList>
    </IonFab>



    {/*
    <IonFab 
vertical="bottom"
horizontal="end"
slot="fixed"
mode="ios"
>
    <IonFabButton
    size="small"
    mode="ios"
    onClick={() => {scrollToTop()}}
    > 
    <IonIcon size="small" icon={arrowUpCircle} />
    </IonFabButton>
    </IonFab>
    */}

    </IonContent>

    </IonPage>
    </CSSTransition>
    </div>
);
}
}

export default Home;
