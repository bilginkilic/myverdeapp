import React, { Component } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Blog, Post, CardPost } from "../models";
import { Auth } from "aws-amplify";
import { MyTask } from "../ui-components";
import { Alert } from "@aws-amplify/ui-react";
import TakeChallenge from "./TakeChallenge";
import { Collection } from "@aws-amplify/ui-react";
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
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      blogTitle: "",
      hasBlog: false,
      isLoading: true,
      isPostLoading: true,
      welcomeMessage: "Ready to take action?",
      tokens: props.tokens,
      blogid: "",
      post: [],
    };
  }

   

  componentDidMount() {
    const fetchUser = async () => {
      console.log(1);
      Auth.currentUserInfo().then((result) => {
        if (result) {
          const emailx = result.attributes.email;
          this.setState({
            email: emailx,
            isLoading: false,
          });
          fetchUserBlog().then(() => {
            fetchPost();
          });
        }
      });
    };

    const fetchUserBlog = async () => {
      const listBlog = (await DataStore.query(Blog)).filter(
        (c) => c.email === this.state.email //"blgnklc@gmail.com"
      );

      if (listBlog.length > 0) {
        this.setState({ email: this.state.email });
        this.setState({
          blogTitle: listBlog[0].title,

          blogid: listBlog[0].id,
        });
        this.setState({ hasBlog: true });
        this.setState({
          welcomeMessage: "You are in the challenge. Good Luck",
        });
      } else {
        this.setState({ hasBlog: false });
        this.setState({
          welcomeMessage:
            "You do not have a challenge now. Take the challenge?",
        });
      }
    };

    const fetchPost = async () => {
      const posts = (await DataStore.query(Post)).filter(
        (c) => c.blogID === this.state.blogid
      );
      this.setState({ post: posts });
      this.setState({ isPostLoading: false });
      console.log(this.state);
    };

    fetchUser();

    //console.log(this.state);
  }

  componentWillUnmount() {}

  render() {
    const saveBlog = async () => {
      await DataStore.save(
        new Blog({
          name: "My first challenge",
          posts: [],
          email: this.state.email,
        })
      );
      const listBlog = (await DataStore.query(Blog)).filter(
        (c) => c.email === this.state.email //"blgnklc@gmail.com"
      );

      if (listBlog.length > 0) {
        this.setState({ email: this.state.email });
        this.setState({
          blogTitle: listBlog[0].title,

          blogid: listBlog[0].id,
        });
      }
      addCardsToBlog();
    };

    const addCardsToBlog = async () => {
      console.log("addCardsToBlog");
      const models = await DataStore.query(CardPost);

      for (let i = 0; i < models.length; i++) {
        await DataStore.save(
          new Post({
            title: models[i].title,
            blogID: this.state.blogid,
            comments: [],
            description: models[i].description,
            image: models[i].image,
            isCompleted: false,
          })
        );
      }

      const posts = (await DataStore.query(Post)).filter(
        (c) => c.blogID === this.state.blogid
      );
      this.setState({ post: posts });
    };

    const takeChallenge = async () => {
      console.log("takeChallenge");
      await saveBlog();
      this.setState({ hasBlog: true });
      this.setState({ welcomeMessage: "You are in the challenge. Good Luck" });
    };

    const buttonClicked = async (item, index) => {
      await updatePost(item);
       let obj2 = [...this.state.post];
      for (const obj of obj2) {
        if (obj.id === index) {
          obj.isCompleted = true;
      
          break;
        }
      }
      this.setState({ post: obj2 });
    };

    const updatePost = async (item) => {
      /* Models in DataStore are immutable. To update a record you must use the copyOf function
to apply updates to the item’s fields rather than mutating the instance directly */

      await DataStore.save(
        Post.copyOf(item, (item) => {
          // Update the values on {item} variable to update DataStore entry
          item.isCompleted = true;
        })
        
      );  
    };
    return (
      <div>
        <div>Welcome {this.state.email}</div>
        <div>{this.state.welcomeMessage}</div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : !this.state.hasBlog ? (
          <div>
            <div>
              <h1>Take challenge</h1>
              <img src="https://myverdeapp-storage-87d83883142712-staging.s3.eu-west-3.amazonaws.com/deniz1.jpg" />
              <p>
                Please click the button to receive your tasks which will take 21
                days.
              </p>
              <button onClick={takeChallenge}>Take challenge</button>
            </div>
          </div>
        ) : (
          <div>
            {!this.state.isPostLoading ? (
              <Collection
                type="list"
                gap="1.5rem"
                direction="row"
                justifyContent="space-between"
                wrap="wrap"
                items={this.state.post}
                isPaginated
                itemsPerPage={1}
              >
                {(item, index) => (
                  <Card key={index} padding="1rem">
                    <Heading level={4}>{item.title}</Heading>
                    <Image
                      src={item.image}
                      srcSet=""
                      sizes=""
                      alt="Amplify logo"
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
                    <Text>{item.description}</Text>
                    {item.isCompleted ? (
                      <Button variation="primary" disabled>
                        Completed
                      </Button>
                    ) : (
                      <Button
                        variation="primary"
                        onClick={buttonClicked(item, index)}
                      >
                        Complete
                      </Button>
                    )}
                  </Card>
                  //  <TakeChallenge key={index} tokens={this.state.tokens } post={item} />
                )}
              </Collection>
            ) : (
              <div>loading</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default WelcomePage;
