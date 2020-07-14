import React from 'react';
import {
	IonList,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
	IonItem,
	IonLabel,
	IonIcon,
} from '@ionic/react';
import { leafOutline, colorPaletteOutline, appsOutline, handLeftOutline, qrCodeOutline, hourglassOutline } from 'ionicons/icons';   


class AdvantagesList extends React.Component {
  render() { 
    return(
        <>
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


        </>
    )}
}
export default AdvantagesList
