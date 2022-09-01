import React from 'react';
import {Navbar,NavbarBrand,NavbarToggler,NavLink,Collapse,Nav,NavDropdown,Button,Modal, NavItem} from 'reactstrap'

class NavigationBar extends React.Component {
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isClose: true
        }
        this.WeddingLogo='/asset/logo/wedding.png'
    }

    toggle = () => {
        this.setState({
          isClose: !this.state.isClose
    })}

    render() {
        return(
            <div>
                <Navbar
                    expand="sm"
                    fixed="top"
                    style={{backgroundColor:"#e1f5fe", fontFamily: "Cambria", paddingTop: 10, paddingBottom: 10}}
                >
                    <NavbarBrand href="/">
                    <img style={{width:60,height:'auto'}} src={this.WeddingLogo} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse navbar isOpen={!this.state.isClose}>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="#ecard">
                                E-Card
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#schedule">
                                Schedule
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#details">
                                Details
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#direction">
                                Direction
                            </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;
