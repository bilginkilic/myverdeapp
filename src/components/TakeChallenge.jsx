import React, { Component } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Blog   } from '../models';
import {
    Card,
    Image,
    View,
    Heading,
    Flex,
    Badge,
    Text,
    Button,
    useTheme,
  } from '@aws-amplify/ui-react';


class TakeChallenge extends Component {
      constructor(props) {
        super(props);
        this.state = {
            tokens : props.tokens,
            post : props.post
          };
      
      }
    
      componentDidMount() {
    
  
      }
    
     
    
      componentWillUnmount() {}
    render() { 
         
        const alertx = () => { alert("You have taken the challenge. Good Luck!") };

        return     <View
        backgroundColor={this.state.tokens.colors.background.secondary}
        padding={this.state.tokens.space.medium}
      >
        <Card>
          <Flex direction="row" alignItems="flex-start">
            <Image
              alt="Road to milford sound"
              src= {this.state.post.image }
              width="33%"
            />
            <Flex
              direction="column"
              alignItems="flex-start"
              gap={this.state.tokens.space.xs}
            >
              <Flex>
                
                <Badge size="small" variation= {this.state.post.isCompleted ? "success" : "info"}>
                  {this.state.post.isCompleted ? "Congrats!" : "Pending"}
                </Badge>
              </Flex>
  
              <Heading level={3}>
                {this.state.post.title}
              </Heading>
  
              <Text as="span">
                {this.state.post.description}
              </Text>
              {this.state.post.isCompleted ?<Button variation="primary"  disabled >Completed</Button> :<Button variation="primary" onClick={ alertx}>Complete</Button>}
              
            </Flex>
          </Flex>
        </Card>
      </View>
    }
}
 
export default TakeChallenge;