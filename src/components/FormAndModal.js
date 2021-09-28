import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
require("react-bootstrap/ModalHeader")
import { Form, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class UpdateForm extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Form onSubmit={this.props.handleForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name "
                defaultValue={this.props.selectedObj.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                defaultValue={this.props.selectedObj.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={this.props.selectedObj.image}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                defaultValue={this.props.auth0.user.email}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default withAuth0(UpdateForm)