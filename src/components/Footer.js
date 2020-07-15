import React from 'react';
import './Footer.css';
import {
IonIcon,
IonButton,
} from '@ionic/react';
import { logoFacebook, enterOutline } from 'ionicons/icons';   
import { Link } from "react-router-dom";


class Footer extends React.Component {
render(){
return(<>
    <div className="flex-footer">
  <div>
<Link to="/login">
   <IonButton size="small" fill="clear">
Login
   <IonIcon slot="end" icon={enterOutline} />
   </IonButton>
</Link>
</div>  
   <div>
A project by <a href="https://agerspace.com">agerspace</a>
   </div>
   <div>
<a href="https://facebook.com/agerspace">
   <IonButton fill="clear">
   <IonIcon size="large" slot="icon-only" icon={logoFacebook} />
   </IonButton>
</a>
   </div>
    </div>
<div className="flex-footer" style={{padding: "0"}}>
   <div>
<a href="https://agerspace.com/Impressum">Impressum</a>
   </div>
</div>
</>)}
}
export default Footer;
