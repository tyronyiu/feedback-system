import React from 'react';
import {
IonLabel,
IonIcon,
IonChip,
} from '@ionic/react';
import { cart, ribbon, heart, } from 'ionicons/icons';   

  
class Chips extends React.Component {
	constructor(){
		super();
        this.state = {
            compliments : {
            "love" : {
                active : false,
                icon : heart,
                description : "Loved it!",
                color: "red"
            },
            "service" : {
                active : false,
                icon : ribbon,
                description : "Amazing service!",
                color: "success"
            },
            "products" : {
                active : false,
                icon : cart,
                description : "Great products!",
                color : "primary"
            }
            }
        }
	}

    addCompliment = e => {
        console.log(this.state.compliments[e].active)
        const active = this.state.compliments[e].active
        this.setState( prevState => {
            let compliments = Object.assign({}, prevState.compliments);
            compliments[e].active = !active
            return {compliments}
        }, function(){
          this.props.parentCallback(this.state.compliments);
        })

    }

    componentDidMount(){
    }

	render(){
  return (
      <div>
      {
          Object.entries(this.state.compliments).map(([key, value]) => {
         return( 
            <IonChip 
             key={key}
            outline={!this.state.compliments[key].active} 
            color={this.state.compliments[key].color}
            onClick={() => this.addCompliment(key)}
            >
              <IonIcon  icon={this.state.compliments[key].icon} color={this.state.compliments[key].color} />
              <IonLabel>{this.state.compliments[key].description}</IonLabel>
            </IonChip>
         )
          })
      }
      </div>
  );
}
}

{/*
            <IonChip outline={this.state.compliments["service"]} color="success" >
              <IonIcon  icon={ribbon} color="success" />
              <IonLabel>Amazing service!</IonLabel>
            </IonChip>

            <IonChip outline={this.state.compliments["products"]} color="primary" >
              <IonIcon  icon={cart} color="primary" />
              <IonLabel>Great products!</IonLabel>
            </IonChip>

*/}
export default Chips;

