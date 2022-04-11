

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

import { Post } from "../models";

const Cell = ({ toggle, name, height, description, css, maximized,altdata }) => (

  
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? "pointer" : "auto" }}
    onClick={!maximized ? toggle : undefined}
  >
    <Fade show={maximized} delay={maximized ? 400 : 0}>
      <div className="details">
        <Slug delay={600}>
          <div className="close">
            <div type="close" style={{ cursor: "pointer" }} onClick={toggle}>
              X{" "}
            </div>
          </div>
          <h1>{name} maso</h1>
          <img
            width="30%"
            src="https://image.shutterstock.com/image-vector/happy-blue-bird-cartoon-flying-600w-437415406.jpg"
          />

          <p>{description}</p>
          <div
            className="divx"
            onClick={() => {
              
                /* Models in DataStore are immutable. To update a record you must use the copyOf function
             to apply updates to the item’s fields rather than mutating the instance directly */
             console.log(altdata);
                  DataStore.save(
                  Post.copyOf(altdata.post, (item) => {
                    // Update the values on {item} variable to update DataStore entry
                    item.isCompleted = true;
                  })
                );
         
          
            
              alert("Completed!")
            }}
          >
            complete
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

         
     <div className="default"> {altdata.order} No. Mission {name}</div>    
    </Fade>
  </div>
);

class CardList extends Component {


  state = {  
    columns: 1, margin: 70, filter: "", height: true , data :this.props.cardListData};
  constructor(props) {

    super(props);
    console.log(this.state.data)
 
  }
  
  search = (e) => this.setState({ filter: e.target.value });
  shuffle = () =>
    this.setState((state) => ({ data: lodash.shuffle(state.data) }));
  setColumns = (e) => this.setState({ columns: parseInt(e.key) });
  setMargin = (e) => this.setState({ margin: parseInt(e.key) });
  setHeight = (e) => this.setState({ height: e });


  componentWillUnmount() {}
  componentDidMount(){
     this.setState({loaded:true});
    //console.log(this.state.data)
    //console.log("yüklendi alt")
  }
  handleStatusChange(){

  }
    


  render() {
    
    const data = this.state?.data.filter(
      (d) => d?.name?.toLowerCase().indexOf(this.state.filter) != -1);


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
      }
      else{ 
       return  (<div className="main">
  
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
            <Cell {...data} maximized={maximized} toggle={toggle} altdata={(d)=> d} />
          )}
        </Grid>
      </div>);
      }
   
   
  }
}

export default CardList;
