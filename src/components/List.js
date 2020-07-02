import React from 'react';
import {
IonList,
IonItem,
IonRange,
IonLabel,
} from '@ionic/react';

  
class List extends React.Component {
	constructor(){
		super();
        this.state = {
            overallValue: 100
        }
	}


    addCompliment = e => {
        console.log(this.state.compliments[e].active)
        const active = this.state.compliments[e].active
        this.setState( prevState => {
            let compliments = Object.assign({}, prevState.compliments);
            compliments[e].active = !active
            return {compliments}
        })

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
<IonList mode="ios">

<IonItem>
<IonLabel position="fixed"><b>Score</b></IonLabel>
<IonRange pin={true} value={this.state.overallValue} onIonChange={e => this.setValue(e.detail.value)} />
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
