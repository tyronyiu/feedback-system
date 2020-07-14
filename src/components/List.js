import React from 'react';
import {
IonList,
IonItem,
IonIcon,
IonRange,
IonLabel,
} from '@ionic/react';
import { thumbsUp, thumbsDown, } from 'ionicons/icons';   

  
class List extends React.Component {
	constructor(){
		super();
        this.state = {
            overallValue: 100
        }
	}


    
    componentDidMount(){
    console.log(this.state)
    }

        setValue = e => {
            console.log(e)
            this.setState({overallValue: e}, function(){
          this.props.parentCallback(this.state.overallValue);
            })
        }

	render(){
  return (
      <div>
<IonList mode="ios" lines="none">

      <IonItem>
       <IonLabel><b>Score</b></IonLabel>
      </IonItem>

<IonItem mode="ios">
<IonRange style={{width:"125%"}} pin={true} value={this.state.overallValue} onIonChange={e => this.setValue(e.detail.value)}>
      <IonIcon slot="start" size="small" icon={thumbsDown} color="red" style={{position:"relative",left:"-0.5em"}}/>
      <IonIcon slot="end" size="small" icon={thumbsUp} color="success" style={{position:"relative", left:"0.5em"}}/>
      </IonRange>
</IonItem>
{/*

<IonItem>
<IonLabel position="fixed">Service</IonLabel>
<IonRange pin={true} value={value} onIonChange={e => this.setValue(e.detail.value)} />
</IonItem>

<IonItem>
<IonLabel position="fixed">Products</IonLabel>
<IonRange pin={true} value={value} onIonChange={e => this.setValue(e.detail.value)} />
</IonItem>

<IonItem>
<IonLabel position="fixed">Ambience</IonLabel>
<IonRange pin={true} value={value} onIonChange={e => this.setValue(e.detail.value)} />
</IonItem>

<IonItem>
<IonLabel position="fixed">Hygiene</IonLabel>
<IonRange pin={true} value={value} onIonChange={e => this.setValue(e.detail.value)} />
</IonItem>

*/}



</IonList>
      </div>
  );
}
}

export default List;
