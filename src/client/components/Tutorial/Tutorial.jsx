import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';
import PATHS from '../../constants/paths';

const tutorialList = [
  __dirname + "../../../../assets/tutorial/1.jpg",
  __dirname + "../../../../assets/tutorial/2.jpg",
  __dirname + "../../../../assets/tutorial/3.jpg",
];

@autoBindMethods
class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialList: tutorialList,
      tutorialIndex: 0,
    };
  }

  componentDidMount() {
    console.log("Tutorial Component Mounted");
  }

  nextTutorial(event) {
    var tutIdx = this.state.tutorialIndex
    tutIdx = Math.min(this.state.tutorialList.length - 1, tutIdx + 1);
    this.setState({ tutorialIndex: tutIdx });
  }

  // Helper function for redirecting
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  /* This is the main render function. */
  render() {
    const { tutorialList, tutorialIndex } = this.state;
    if (tutorialIndex < this.state.tutorialList.length - 1) {
      return (
        <div className="tutorial-image">
          <img src={ tutorialList[tutorialIndex] } 
            onClick={ event => this.nextTutorial(event) }
          />
        </div>
      );
    } else {
      return (
        <div>
          <img src={ tutorialList[tutorialIndex] } 
            onClick={ event => this.routeChange(PATHS.citySelect()) }
          />
        </div>
      );
    }
  }
}

export default Tutorial;
