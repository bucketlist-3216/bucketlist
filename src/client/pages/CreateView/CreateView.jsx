import React, { Component } from "react";

import Header from "../../components/Header";
import Create from "../../components/Create";

class CreateView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Create />
      </div>
    );
  }
}

export default CreateView;
