// // import React, { Component } from 'react';
// // import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// // import { Home, About, Topics } from "./Components/index"

// // class App extends Component {
// //   render() {
// //     return (
// //       // <Router>
// //       //   <div>
// //       //     <ul>
// //       //       <li>
// //       //         <Link to="/" >Home</Link>
// //       //       </li>
// //       //       <li>
// //       //         <Link to="/about" >About</Link>
// //       //       </li>
// //       //       <li>
// //       //         <Link to="/topics" >Topic</Link>
// //       //       </li>
// //       //     </ul>
// //       //     <hr />
// //       //     <Route exact path="/" component={Home} />
// //       //     <Route path="/about" component={About} />
// //       //     <Route path="/topics" component={Topics} />
// //       //   </div>
// //       // </Router>
// //       <div></div>
// //     )
// //   }
// // }

// // export default App;







import React, { Component } from 'react';
import Todo from "./Components/Todo/index"

class App extends Component {
  render() {
    const arr = ["a", "b", "c", "d", "e", "f"]
    return (
      <div >
       <Todo/>
      </div>
    )
  }
}

export default App;



