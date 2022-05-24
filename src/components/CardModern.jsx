import React, { Component } from 'react';
import { Card,Button } from 'react-bootstrap';
import { DataStore } from "@aws-amplify/datastore";

import { Post } from "../models";
class CardModern extends Component {
    state = {
        isCompleted: this.props.post.isCompleted,
        post: this.props.post
      };
       
      
    
      
    
      hadleButtonClickx=  ()=> {
       
         console.log("ses veri", this.props.key, this.state);
      };
    
      hadleButtonClick =  ()=> {
        this.update();
        this.setState({ isCompleted: true });
        //console.log("ses veri", this.props.keyx, this.state.isCompleted);
      };
    
      update = async () => {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
     to apply updates to the item’s fields rather than mutating the instance directly */
        await DataStore.save(
          Post.copyOf(this.state.post, (item) => {
            // Update the values on {item} variable to update DataStore entry
            item.isCompleted = true;
          })
        );
 
      };
    render() { 
        return (<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.post.image}   width="50%" />
        <Card.Body>
          <Card.Title>{this.props.post.title}</Card.Title>
          <Card.Text>
          {this.props.post.description}
          </Card.Text>
         
          {
          this.state.isCompleted ?    <Button   onClick={this.hadleButtonClickx}  >Completed</Button> : 
          <Button   variant="primary" onClick={this.hadleButtonClick} >Complete</Button> 
       }
        </Card.Body>
      </Card>);
    }
}
 
export default CardModern;