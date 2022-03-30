
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { DataStore } from '@aws-amplify/datastore';
import { Card } from './models';
import awsExports from './aws-exports';
import React from 'react';
import { 
  Tasks 
} from './ui-components';
 
Amplify.configure(awsExports);

 
 
function App({ signOut, user }) {
  return (
    <div>
     
      <h1>Hello {user.Email}</h1>
    
      <Tasks />
    <div> 
      <button onClick={signOut}>Sign out</button>
      
      </div>
      </div>
  );
}

export default withAuthenticator(App);

// import logo from './logo.svg';
// import './App.css';

// import { DataStore } from '@aws-amplify/datastore';
// import { Blog ,Post} from './models';
// import { Collection, Card, Heading, Text } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import React from 'react';
// import { 
//   MyTask 
// } from './ui-components';

 
// function Button(props){
//   return (

//     <button onClick={props.clickFunction}>
//       {props.text}
//     </button>
//   );
// }

 
// const Greeting = (props) => (
//   <div>
//     Hello World {props.name}
//   </div>
// );

// const CardList = (props) => ( 
//   <div>
//     {props.blogList.map( blog => <div>blog.name</div>)}  
//   </div>
// );



 
// function MyBlog(props){
  
 
  
   

//   return  (
 
     
//  <Collection type="list" items={props.data} gap="1.5rem">
//   {(item, index) => (
//     <Card key={index} padding="1rem">
//       <Heading level={4}>{item.name}</Heading>
//       <Text>{item.name}</Text>
//     </Card>
//   )}
// </Collection>);
 


//   }





// class App  extends React.Component {
//   blogx =    DataStore.query(Blog) ;
   
//    state = {
//      data :[
//       {
//         name: 'Fiordland National Park',
//         namex:
//           'This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.',
//       },
//       {
//         name: 'Bay of Islands, North Island',
//         namex:
//           'Three hours north of Auckland, this area features over 144 islands to explore.',
//       },
//       {
//         name: 'Queenstown, South Island',
//         namex:
//           "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
//       },
//     ],
//     dataApi:this.blogx
//    }


   
//     addBlog =async () => {
//       // await DataStore.save(
//       //   new Blog({
//       //   "name": "Lorem ipsum dolor sit amet2",
//       //   "posts": []
//       // })
//       // );

//       await DataStore.save(
//         new Post({
//         "title": "Lorem ipsum dolor sit amet",
//         "blogID": "45c1773a-7758-4f38-bf3b-0efecac4c5df",
//         "comments": []
//       })
//     );
      
//       alert("Blog added successfully");
//    console.log(this.state.dataApi)
     
  
//     };

//  //<CardList blogList={this.state.dataApi} />
   
//   render() {
//    return (
   
     
//       <div><Greeting name="Bilgin" /><Button clickFunction={this.addBlog} text="Add Blog" />
      
//       <MyBlog data={this.state.data} />
//       <MyTask />
//       </div>
//     );

//   } 
// }

// export default App;
