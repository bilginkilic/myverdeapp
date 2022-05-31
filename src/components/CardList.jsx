import "./styles.css";
import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import lodash from "lodash";
//import { Icon } from 'antd'
import { SmileOutlined } from "@ant-design/icons";
import data from "./data";
import Header from "./Header";
import { Grid, Slug, Fade } from "mauerwerk";
import { DataStore } from "@aws-amplify/datastore";
import { StarOutlined, StarTwoTone, StarFilled } from "@ant-design/icons";
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
import { Post } from "../models";

const Cell = ({
  toggle,
  name,
  height,
  description,
  css,
  maximized,
  altdata,
  completeTask,
  currentTaskStatus,
}) => (
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? "pointer" : "auto" }}
    onClick={!maximized ? toggle : undefined}
  >
    <Fade show={maximized} delay={maximized ? 400 : 0}>
      <div className="details">
        <Slug delay={600} >
          <div className="close">
            <div type="close" style={{ cursor: "pointer" }} onClick={toggle}>
              X{" "}
            </div>
          </div>
          <div align="left" ><h1>{name} </h1></div>
          <div class="float-container">
            <div class="float-child">
              <img width="90%"  style={{marginTop: 5 + 'px'}} src={altdata.image} />
            </div>
            <div class="float-child">
              <p>{description}</p>
            </div>
          </div>

          <div
            className="divx"
            onClick={() => {
              /* Models in DataStore are immutable. To update a record you must use the copyOf function
             to apply updates to the item’s fields rather than mutating the instance directly */

              DataStore.save(
                Post.copyOf(altdata.post, (item) => {
                  // Update the values on {item} variable to update DataStore entry
                  item.isCompleted = true;
                })
              );
              completeTask(altdata.order - 1);

              alert("Completed!");
              window.location.reload();

              // toggle();
            }}
          >
            Complete
          </div>
        </Slug>
      </div>
    </Fade>
    <Fade
      show={!maximized}
      from={{ opacity: 0, transform: "translate3d(0,140px,0)" }}
      enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
      leave={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
      delay={maximized ? 0 : 400}
    >
      <div className="default">
         {name}
      </div>
    </Fade>
  </div>
);

class CardList extends Component {
  state = {
    columns: 1,
    margin: 70,
    filter: "",
    height: true,
    data: this.props.cardListData, //his.getData(this.props.cardListData),
    orgData: this.props.cardListData,
    currentOderder: -1,
  };
  constructor(props) {
    super(props);
  }
  completeTask = (id) => {
    let obj = [...this.state.orgData];
    obj[id].isCompleted = true;
    this.setState({ orgData: obj, data: obj });

    //this.nextTask(obj);
    // this.shuffle();
    //this.setState((state) => ({ data:  state.data }));
  };

  search = (e) => this.setState({ filter: e.target.value });
  shuffle = () =>
    this.setState((state) => ({ data: lodash.shuffle(state.data) }));
  setColumns = (e) => this.setState({ columns: parseInt(e.key) });
  setMargin = (e) => this.setState({ margin: parseInt(e.key) });
  setHeight = (e) => this.setState({ height: e });

  componentWillUnmount() {}
  componentDidMount() {
    this.setState({ loaded: true });
    //console.log(this.state.data)
    //console.log("yüklendi alt")
  }
  handleStatusChange() {}

  currentTaskStatus = () => {
    return this.state.orgData[0].post.isCompleted;
  };

  render() {
    const data = this.state?.data
      .filter((d) => d.post.isCompleted !== true)
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .slice(0, 1);
 console.log("OK",data);
    const dataAll = this.state?.data;

    //   <Header
    //   {...this.state}
    //   search={this.search}
    //   shuffle={this.shuffle}
    //   setColumns={this.setColumns}
    //   setMargin={this.setMargin}
    //   setHeight={this.setHeight}
    // />
    // );

    if (!this.state.loaded) {
      return <div className="spinner">Loading. Please wait...</div>;
    } else {
      if (
        data &&
        data.length == 0 &&
        dataAll &&
        dataAll.length > 0
      ) {
        return (
          <div className="spinner" align="center">
            <Text isTruncated={false}>
              Congratulations you have completed the tasks. 
              You have just get a new badge!
              {dataAll.length} days are completed successfully.
              <StarFilled />

            </Text>
            <img
              width="320px"
              src="https://myverdeapp-storage-86136297.s3.eu-west-3.amazonaws.com/completed.png"
            />
          </div>
        );
      } else {
        return (
          <div className="main" >
              
            <div align="center"> <h1>Mission Day {data?.sequence} </h1></div> 
            
            <Grid
              className="grid"
              // Arbitrary data, should contain keys, possibly heights, etc.
              data={data}
              // Key accessor, instructs grid on how to fet individual keys from the data set
              keys={(d) => d.name}
              // Can be a fixed value or an individual data accessor
              heights={this.state.height ? (d) => d.height : 200}
              // Number of columns
              columns={this.state.columns}
              // Space between elements
              margin={this.state.margin}
              // Removes the possibility to scroll away from a maximized element
              lockScroll={false}
              // Delay when active elements (blown up) are minimized again
              closeDelay={400}
            >
              {(data, maximized, toggle) => (
                <Cell
                  {...data}
                  maximized={maximized}
                  toggle={toggle}
                  altdata={data}
                  completeTask={this.completeTask}
                />
              )}
            </Grid>

            <div align="center">
            <b>tomorrow you'll have your next mission.</b>   
           </div>
          </div>
        );
      }
    }
  }
}

export default CardList;
