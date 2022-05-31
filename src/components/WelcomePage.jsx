import React, { Component } from "react";
import { StarOutlined, StarTwoTone, StarFilled } from "@ant-design/icons";
import { DataStore } from "@aws-amplify/datastore";
import { Blog, Post, CardPost } from "../models";
import { Auth } from "aws-amplify";
import data from "./data";
import { MyTask } from "../ui-components";
import { Alert } from "@aws-amplify/ui-react";
import TakeChallenge from "./TakeChallenge";
import { Collection } from "@aws-amplify/ui-react";
import { Carousel } from "@trendyol-js/react-carousel";
import {
  Card,
  IconStar,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import CardModern from "./CardModern";
import CardList from "./CardList";
class WelcomePage extends Component {
  state = {
    email: "",
    blogTitle: "",
    hasBlog: false,
    isLoading: true,
    isPostLoading: true,
    welcomeMessage: "Ready to take action?",
    tokens: null,
    blogid: "",
    post: [],
    dataForCardList: [],
  };
  constructor(props) {
    super(props);
    this.setState({ tokens: props.tokens });
  }

  saveBlog = async () => {
    console.log(this.state);
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
    console.log(listBlog);
    if (listBlog && listBlog.length > 0 && listBlog[0].name) {
      this.setState({
        email: this.state.email,

        blogTitle: listBlog[0].name,

        blogid: listBlog[0].id,
      });
    }
    //this.addCardsToBlog();
  };

  addCardsToBlog = async () => {
    const models = await DataStore.query(CardPost);

    for (let i = 0; i < models.length; i++) {
      console.log(i);
      await DataStore.save(
        new Post({
          title: models[i].title,
          blogID: this.state.blogid,
          comments: [],
          description: models[i].description,
          image: models[i].image,
          isCompleted: false,
          sequence: i
        })
      );
    }

    let posts = (await DataStore.query(Post)).filter(
      (c) => c.blogID === this.state.blogid
    );
    this.setState({ post: posts });
  };

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

  takeChallenge = () => {
    this.saveBlog()
      .then(() => {
        this.addCardsToBlog();
      })
      .then(() => {
        this.sleep(3000).then(r => {
            window.location.reload();
          })
        //
      });

    this.setState({
      hasBlog: true,
      welcomeMessage: "Success! First day of the mission.",
    });
  };

  buttonClicked = async (item, index) => {
    await this.updatePost(item);
    let obj2 = [...this.state.post];
    for (const obj of obj2) {
      if (obj.id === index) {
        obj.isCompleted = true;

        break;
      }
    }
    this.setState({ post: obj2 });
  };

  updatePost = async (item) => {
    /* Models in DataStore are immutable. To update a record you must use the copyOf function
to apply updates to the item’s fields rather than mutating the instance directly */

    await DataStore.save(
      Post.copyOf(item, (item) => {
        // Update the values on {item} variable to update DataStore entry
        item.isCompleted = true;
      })
    );
  };

  componentDidMount() {
    const fetchUser = async () => {
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

      if (listBlog && listBlog.length > 0 && listBlog[0].name) {
        this.setState({
          email: this.state.email,

          blogTitle: listBlog[0].name,

          blogid: listBlog[0].id,
          hasBlog: true,

          welcomeMessage: "",
        });
      } else {
        this.setState({
          hasBlog: false,

          welcomeMessage:
            "You do not have a challenge now. Take the challenge?",
        });
      }
      console.log(this.state);
    };

    const fetchPost = async () => {
      const posts = (await DataStore.query(Post)).filter(
        (c) => c.blogID === this.state.blogid
      );

      this.setState({ post: posts });
      //
      if (posts) {
        let newArray = [];
        //  let postRaw = { ...posts };//bu obje olur

        let i = 0;
        posts.forEach((d) => {
          console.log("merge",d);
          let newObj = {
            name:     d.title,
            description: d.description,
            image: d.image,
            css: data[4].css, //  d.css,//because there are 14 variants in data css array
            height: 200,
            order:  d?.sequence ,// i + 1,
            post: d
             
          };
          newArray.push(newObj);
          i++;
        });
        this.setState({ dataForCardList: newArray });
      }

      this.setState({ isPostLoading: false });
      console.log(this.state);
    };

    fetchUser();

    console.log(this.state);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div align="center">
          <Heading level={5}>Water Saving App</Heading>{" "}
        </div>
        <div align="center">
          <Text level={1}>
            {this.state.welcomeMessage}
            <StarTwoTone />
          </Text> 
        </div>
        {this.state.isLoading ? (
          <div>Loading challenge...</div>
        ) : !this.state.hasBlog ? (
          <div align="center">
            <div>
              <Text isTruncated={true}>
                {" "}
                Please click the button to receive your tasks which will take 21
                days.
                <StarOutlined />
              </Text>
              <Text isTruncated={true}>
                <img src="https://myverdeapp-storage-86136297.s3.eu-west-3.amazonaws.com/home.jpg" />
              </Text>
              <Button
                variation="primary"
                size="large"
                onClick={this.takeChallenge}
              >
                Take challenge
              </Button>
            </div>
            <div>
              <i>
                *by clicking the button you are agree to use your information
                under the GDPR rules.
              </i>
            </div>
          </div>
        ) : (
          <div>
            {!this.state.isPostLoading ? (
              <CardList cardListData={this.state.dataForCardList} />
            ) : (
              <div>loading welcomes card</div>
            )}
          </div>
        )}
        <div align="center">
          <Text level={6}>logged in user: {this.state.email}</Text>{" "}
        </div>
      </div>
    );
  }
}

export default WelcomePage;
