import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import MessageBoard from "./component/MessageBoard";
import List from "./component/List";

const App = () => {
  return (
    <>
    <div style={buttonLinks}>
      <Link to="/"><button>Messaging App</button></Link>
      <Link to="/list"><button>List</button></Link>
    </div>
      <Switch>
        <Route exact path="/" component={MessageBoard} />
        <Route exact path="/list" component={List} />
      </Switch>
    </>
  );
};

const buttonLinks = { textAlign:'center', marginTop: 30, display:'grid', gridTemplateColumns: '1fr 1fr', float: 'right'}

export default App;
