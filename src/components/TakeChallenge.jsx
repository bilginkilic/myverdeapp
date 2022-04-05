import React, { Component } from "react";
import { DataStore } from "@aws-amplify/datastore";

import { Post } from "../models";
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
} from "@aws-amplify/ui-react";

class TakeChallenge extends Component {
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
    console.log(this.state.post);
  };

  // componentDidMount() {

  // }

  // componentWillUnmount() {}
  render() {
    return (
      <Card key={this.props.key} padding="1rem">
        <Heading level={4}>{this.props.post.title}</Heading>
        <Image
          src={this.props.post.image}
          srcSet=""
          sizes=""
          alt="Task"
          objectFit="fill"
          objectPosition="initial"
          backgroundColor="initial"
          borderRadius="initial"
          border="initial"
          boxShadow="initial"
          color="initial"
          height="50%"
          maxHeight="initial"
          maxWidth="initial"
          minHeight="initial"
          minWidth="initial"
          opacity="100%"
          padding="0"
          width="50%"
          onClick={() => alert("📸 Say cheese!")}
        />
        <Text>{this.props.post.description}</Text>
        {
          this.state.isCompleted ?     <button  onClick={this.hadleButtonClickx}  >Completed</button>: 
       <button onClick={this.hadleButtonClick} >Complete</button> 
       }
      </Card>
    );
  }
}

export default TakeChallenge;
