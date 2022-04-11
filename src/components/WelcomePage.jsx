
import React, { Component } from "react";
import { StarOutlined,StarTwoTone } from "@ant-design/icons";
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
  Card,IconStar,
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
    this.addCardsToBlog();
  };

  addCardsToBlog = async () => {
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

    let posts = (await DataStore.query(Post)).filter(
      (c) => c.blogID === this.state.blogid
    );
    this.setState({ post: posts });
  };

  takeChallenge = async () => {
    console.log("takeChallenge");
    await this.saveBlog();
    this.setState({ hasBlog: true });
    this.setState({ welcomeMessage: "You are in the challenge. Good Luck" });
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
      console.log(1);
      Auth.currentUserInfo().then((result) => {
        if (result) {
          const emailx = result.attributes.email;
          this.setState({
            email: emailx,
            isLoading: false,
          });
          console.log("user yüklendi");
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
        console.log("blog yüklendi");
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
      console.log(posts);
      this.setState({ post: posts });
      //
      if (posts) {
        let newArray = [];
      //  let postRaw = { ...posts };//bu obje olur
   
        let i = 0;
        posts.forEach((d) => {
          let newObj = {
            name: d.title,
            description: d.description,
            image: d.image,
            css: data[i % 14].css, //  d.css,//because there are 14 variants in data css array
            height: 200,
            order:(i+1),
            post:d
          };
          newArray.push(newObj);
          i++;
        });
        this.setState({ dataForCardList: newArray });
      }

      this.setState({ isPostLoading: false });
      console.log("post yüklendi");
    };

    fetchUser();

    //console.log(this.state);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div  >
        <div><Heading level={3}>Welcome {this.state.email}</Heading>  </div>
        <div><Heading level={4}>{this.state.welcomeMessage}<StarTwoTone /></Heading>  </div>
        {this.state.isLoading ? (
          <div>Loading challenge...</div>
        ) : !this.state.hasBlog ? (
          <div>
            <div>
            <Text isTruncated={true}> Please click the button to receive your tasks which will take 21
                days.<StarOutlined /></Text>
                <Text isTruncated={true}>
              <img src="https://previews.dropbox.com/p/thumb/ABewn9DqGBai3eWwk1TdIXuPsfhgnaR3UST-syVuwFquLtt6JdU1QN3ozMHUearMNhPLsTF7Rv-R-TKdfa6dvrsa4ZaDONuLoTpTYbDwsLS8R-u2t7qTrSmMpHeiZYJhcodD2efusNyB2AeDO6Idi85kXZXPqxfp36dz8YDp-ktzR4rS90PEHCjeL5u9jZ59qRa03JzXDR1UhyPYYQhhD53SD6kI6-eP4gjiQyMax_qzlNH2E5lI6zyBX1laFFE1wtyxQaRboKruoSCjOI2hEkKR6zg5qVJzULeCL3bL5IXVl8g6KfwOyL8VAs4rCMKe9psYeIV6Dj7ea2AIahQGZpYUe-B_mlZzpeD-S1fCwzFlMCCkPVA9gHTRTL8dv15CxEk/p.jpeg" />
              </Text>
              <Button    variation="primary"
  size="large" onClick={this.takeChallenge}>
         Take challenge
          </Button>

         
            </div>
          </div>
        ) : (
          <div>
            
            {!this.state.isPostLoading  ? (
              <CardList cardListData={this.state.dataForCardList} />
            ) : (
              <div>loading welcomes card</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default WelcomePage;
