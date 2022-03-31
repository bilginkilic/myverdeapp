import React, { Component } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Blog } from "../models";
import { Auth } from 'aws-amplify';
import { 
    MyTask,
    ProfileA 
  } from '../ui-components';
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
      blogTitle: "",
      hasBlog: false,
      isLoading:true,
      welcomeMessage: "Ready to take action?",

    };
  }

  componentDidMount() {

    const fetchUser = async () => {
        console.log(1)
        Auth.currentUserInfo().then(result => {
         
            if (result) {
                const emailx =  result.attributes.email
                this.setState({
                    email : emailx,
                    isLoading: false,
                    // blogTitle: '',
                    // hasBlog: false,
                    // welcomeMessage: "Please wait..."
                });
                fetchUserBlog();
            }
        }) ;

    
    };
  
    
    const fetchUserBlog = async () => {
        console.log(2)
            const listBlog = ( await  DataStore.query(Blog)).filter(
                (c) => c.email ===  this.state.email //"blgnklc@gmail.com"
              );
              console.log(listBlog);
         
              if (listBlog.length > 0) {
                this.setState({email:this.state.email});
                this.setState({ blogTitle: listBlog[0].title });
                this.setState({ hasBlog: true });
                this.setState( { welcomeMessage: "You are in the challenge. Good Luck"});
              }else{
                this.setState({ hasBlog: false });
                this.setState( { welcomeMessage: "You do not have a challenge now. Take the challenge?"});
              }
           
 

    
    };
    fetchUser();
   
    console.log(this.state);
  }

  // componentShouldUpdate() {}

  componentWillUnmount() {}

  //state = {  }
  render() { 
    return <div>   
        <div>Welcome {this.state.email}</div>
        <div>{this.state.welcomeMessage}</div>
        {this.state.isLoading ? <div>Loading...</div> :
          !this.state.hasBlog   ? 
     <div> <ProfileA /> </div> : <div> <MyTask/> </div> }
      </div> 
    ;
  }
}

export default WelcomePage;
