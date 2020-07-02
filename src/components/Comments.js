import React from 'react';
import {
IonTextarea,
IonList,
IonItem,
IonLabel,
} from '@ionic/react';


  
class Comments extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            comment : ""
        }
	}


    componentDidMount(){
    }

    handleChange = e => {
    this.setState({comment: e.target.value}, function(){
          this.props.parentCallback(this.state.comment);
    })
        }

	render(){
  return (
      <div>
      <IonList lines="none">
      <IonItem>
      <IonLabel>
      Comments: 
      </IonLabel>
      </IonItem>

      <IonItem>
      <IonTextarea 
      clearOnEdit={true}
      autoGrow={true}
      inputmode="text"
      placeholder="Best service ever experienced!"
      style={{border: "1px solid rgb(0,0,0,0.3)", borderRadius:"6px", padding:"0.5em"}}
      value={this.state.comment}
      onIonChange={e => this.handleChange(e)}
      >
      </IonTextarea>
      </IonItem>
      <IonItem/>

      </IonList>
      </div>
  );
}
}

export default Comments;
