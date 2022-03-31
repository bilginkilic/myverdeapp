import React, { Component } from "react";
import { DataStore } from "@aws-amplify/datastore";
 
 
import { Post } from '../models';
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button 
 
} from "@aws-amplify/ui-react";
 
class TakeChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: props.tokens,
      post: props.post,
      isCompleted: props.post.isCompleted,
      key:props.key
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
   const  buttonClicked = async ()  =>  {
       await   update();
      this.setState({ isCompleted: true });
    };

    const update = async ()  => {
      /* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
     await    DataStore.save(
        Post.copyOf(this.state.post, item => {
          // Update the values on {item} variable to update DataStore entry
          item.isCompleted = true;
        })

        
      );console.log(this.state.post);
    };

    return (
          <Card key={this.state.key} padding="1rem"> 
        <Heading level={4}>{this.state.post.title}</Heading>
        <Text>{this.state.post.description}</Text> </Card>
    //   <View
    //     backgroundColor={this.state.tokens.colors.background.secondary}
    //     padding={this.state.tokens.space.medium}
    //     key={this.state.key}
    //   >
    //     <Card>
    //       <Flex direction="row" alignItems="flex-start">
    //         <Image
    //           alt="Road to milford sound"
    //           src={this.state.post.image}
    //           width="33%"
    //         />
    //         <Flex
    //           direction="column"
    //           alignItems="flex-start"
    //           gap={this.state.tokens.space.xs}
    //         >
    //           <Flex>
    //             <Badge
    //               size="small"
    //               variation={this.state.isCompleted ? "success" : "info"}
    //             >
    //               {this.state.isCompleted ? "Congrats!" : "Pending"}
    //             </Badge>
    //           </Flex>

    //           <Heading level={3}>{this.state.post.title}</Heading>

    //           <Text as="span">{this.state.post.description}</Text>
    //           {this.state.isCompleted ? (
    //             <Button variation="primary" disabled>
    //               Completed
    //             </Button>
    //           ) : (
    //             <Button variation="primary" onClick={buttonClicked}>
    //               Complete
    //             </Button>
    //           )}
    //         </Flex>
    //       </Flex>
    //     </Card>
    //   </View>
    );
  }
}

export default TakeChallenge;
