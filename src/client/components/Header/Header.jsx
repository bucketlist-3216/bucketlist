import React, {Component} from "react";
import { Nav, Navbar } from "react-bootstrap";
import BucketListLogo from '../../../../assets/brand/brand-logo.png';

class Header extends Component {
    render(){
        return (
            <Navbar className="header">
                <Navbar.Brand href="/">
                <div className="headerTitle">
                  <img
                    alt="Bucketlist Logo"
                    src={BucketListLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />
                  {' bucketlist'}
                  </div>
                </Navbar.Brand>
              </Navbar>
        );
    }
}

export default Header;
