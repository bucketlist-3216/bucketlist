import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';

const tutorialMsgs = [
  'Hi! Welcome to bucketlist. Before you get started, let’s give you a quick tour of this app to show you what you can do.',
  'Swipe right on a destination if you like it and want to add it to your list',
  'Swipe left on a destination if you are not interested in it',
  'Tap on the image to view more photos of that particular place',
  'Toggle the menu bar at the top to switch between places of attractions, and food (which includes bars and dessert places as well!)',
  'Tap the up arrow above the title of the location to get more information about the place, like photos, yelp reviews, location and more!'
];

@autoBindMethods
class TutorialPopup extends React.Component {
  constructor(props) {
    super(props);

    console.log('Props received are ', props);

    this.finishTutorialHandler = props.onFinish;
    this.state = {
      tutorialMsgs: tutorialMsgs,
      tutorialIndex: 0
    };
  }

  componentDidMount() {
    console.log("Tutorial Component Mounted");
  }

  previousTutorial(event) {
    var tutIdx = this.state.tutorialIndex;
    tutIdx = Math.max(0, tutIdx - 1);
    this.setState({ tutorialIndex: tutIdx });
  }

  nextTutorial(event) {
    if (this.state.tutorialIndex == this.state.tutorialMsgs.length - 1) {
      this.finishTutorialHandler();
      // this.routeChange(PATHS.citySelect());
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
    const { tutorialMsgs, tutorialIndex } = this.state;

    return (
      <div className="tutorial-popup">
        <div className="tutorial-box">
          <div className="tutorial-title">
            {tutorialIndex == 0 && <p className="middle-txt">Tutorial</p>}
            {tutorialIndex > 0 && <p className="middle-txt">{tutorialIndex} / {tutorialMsgs.length - 1}</p>}
          </div>
          <div className="tutorial-msg">
            {<p className="msg">{tutorialMsgs[tutorialIndex]}</p>}
            {tutorialIndex == 0 && <button className="skip-button" onClick={() => this.finishTutorialHandler()}>skip tutorial</button>}
          </div>
            {
              (tutorialIndex == 0  && 
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
  }
}

export default TutorialPopup;