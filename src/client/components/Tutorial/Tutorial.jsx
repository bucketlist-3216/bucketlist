import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';
import PATHS from '../../constants/paths';

const tutorialList = [
  __dirname + "../../../../assets/tutorial/1.jpg",
  __dirname + "../../../../assets/tutorial/2.jpg",
  __dirname + "../../../../assets/tutorial/3.jpg",
];

const tutorialMsgs = [
  'Hi! Welcome to bucketlist. Before you get started, let’s give you a quick tour of this app to show you what you can do.',
  'Swipe right on a destination if you like it and want to add it to your list',
  'Swipe left on a destination if you are not interested in it',
  'Tap on the image to view more photos of that particular place',
  'Toggle the menu bar at the top to switch between places of attractions, and food (which includes bars and dessert places as well!)',
  'Tap the up arrow above the title of the location to get more information about the place, like photos, yelp reviews, location and more!'
]

@autoBindMethods
class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialMsgs: tutorialMsgs,
      tutorialList: tutorialList,
      tutorialIndex: 0,
    };
  }

  componentDidMount() {
    console.log("Tutorial Component Mounted");
  }

  previousTutorial(event) {
    console.log('Previous tutorial from ', this.state.tutorialIndex)
    var tutIdx = this.state.tutorialIndex;
    tutIdx = Math.min(0, tutIdx - 1);
    this.setState({ tutorialIndex: tutIdx });
  }

  nextTutorial(event) {
    console.log('Next tutorial from ', this.state.tutorialIndex)

    if (this.state.tutorialIndex == this.state.tutorialMsgs.length - 1) {
      this.routeChange(PATHS.citySelect());
    }

    var tutIdx = this.state.tutorialIndex;
    tutIdx = Math.min(this.state.tutorialMsgs.length - 1, tutIdx + 1);
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

    return (
      <div className="tutorial-page">
        <div className="tutorial-box">
          <div className="tutorial-title">
            {tutorialIndex == 0 && <p className="middle-txt">Tutorial</p>}
            {tutorialIndex > 0 && <p className="middle-txt">{tutorialIndex} / {tutorialMsgs.length - 1}</p>}
          </div>
          <div className="tutorial-msg">
            <p className="msg">{tutorialMsgs[tutorialIndex]}</p>
          </div>
            {
              (tutorialIndex == 0 &&
              <div className="tutorial-buttons">
                <div className="tutorial-button-full" onClick={ event => this.nextTutorial(event) }><p className="middle-txt">Let's get started</p></div>
              </div>
              )
            }
            {
              (tutorialIndex > 0 && tutorialIndex < tutorialMsgs.length - 1) &&
              <div className="tutorial-buttons">
                <div className="tutorial-button-half-left" onClick={ event => this.previousTutorial(event) }><p className="middle-txt">Back</p></div>
                <div className="tutorial-button-half-right" onClick={ event => this.nextTutorial(event) }><p className="middle-txt">Next</p></div>
              </div>
            }
            {
              (tutorialIndex == tutorialMsgs.length - 1) &&
              <div className="tutorial-buttons">
                <div className="tutorial-button-half-left" onClick={ event => this.previousTutorial(event) }><p className="middle-txt">Back</p></div>
                <div className="tutorial-button-half-right" onClick={ event => this.nextTutorial(event) }><p className="middle-txt">Finish</p></div>
              </div>
            }
        </div>
      </div>
    )

    if (tutorialIndex < this.state.tutorialList.length - 1) {
      return (
        <div>
          <img className="tutorial-image"
            src={ tutorialList[tutorialIndex] } 
            onClick={ event => this.nextTutorial(event) }
          />
        </div>
      );
    } else {
      return (
        <div>
          <img className="tutorial-image"
            src={ tutorialList[tutorialIndex] } 
            onClick={ event => this.routeChange(PATHS.citySelect()) }
          />
        </div>
      );
    }
  }
}

export default Tutorial;
