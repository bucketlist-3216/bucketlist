import React, {Component} from "react";
import { Nav, Navbar } from "react-bootstrap";
import BucketListLogo from '../../../../assets/brand/brand-logo.png';

import './Header.scss';

class Header extends Component {
    render(){
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src={BucketListLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />
                  {' Bucketlist'}
                </Navbar.Brand>
              </Navbar>
        );
    }
}

export default Header;
