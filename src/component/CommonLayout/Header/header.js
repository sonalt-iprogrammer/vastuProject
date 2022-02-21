import { Fragment } from 'react'
import { Navbar, Form, Container, Nav, NavDropdown } from 'react-bootstrap'
import './header.css'
import { CgProfile } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
import { FiBell } from 'react-icons/fi'
import { propTypes } from 'react-bootstrap/esm/Image'

const Header = () => {
  return (
    <Fragment>
      <Navbar className="ForDesktop" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Utec</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">About</Nav.Link>
              <Nav.Link href="#action2">Learn</Nav.Link>
              <Nav.Link href="#action2">Solution</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <NavDropdown title="English" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">English</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Hindi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Marathi</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action1">Support</Nav.Link>
              <Nav.Link href="#action1">MyProjects</Nav.Link>
              <FiSearch className="MyIcon" size="25px"></FiSearch>
              <FiBell className="MyIcon" size="25px"></FiBell>
              <CgProfile className="MyIcon" size="25px"></CgProfile>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar className="ForMobile" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/"><strong>Utec</strong></Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default Header
