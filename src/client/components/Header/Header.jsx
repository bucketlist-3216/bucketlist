import React, {Component} from "react";
import { Nav, Navbar } from "react-bootstrap";

import './styles.scss';

class Header extends Component {
    render(){
        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                  {' Bucketlist'}
                </Navbar.Brand></Nav>
            </Navbar>
        );
    }
}

export default Header;
