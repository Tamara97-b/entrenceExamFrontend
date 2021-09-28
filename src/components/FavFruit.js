import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import FormAndModal from './FormAndModal'
import { request, response } from 'express';

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      fruitDtat: [],
      showModal: false,
      selectedObj : {}


    }


    

  }
  componentDidMount = () => {
    
    axios.get(`http://localhost:7000/getOwnFruit?email=${this.props.auth0.user.email}`).then((response) => {
      this.setState({ fruitDtat: response.data })      
      
    })
  }
  deletObj = (deleted) => {
    axios.delete(`http://localhost:7000/getOwnFruit/${deleted}`).then(() => {
      
      axios.get(`http://localhost:7000/getOwnFruit?email=${this.props.auth0.user.email}`).then(
        ((response) => {
          this.setState({ fruitDtat: response.data });
        })
      )
    })
  }

  update = async (updated) => {
    
    await this.setState({showModal:!this.state.showModal,selectedObj:updated})
  }

  handleForm = (e) => {
    e.preventDefault();
    const requestBody = { name: e.target.name.value, image: e.target.image.value, price: e.target.price.value, email: this.props.auth0.user.email }
    axios.put(`http://localhost:7000/getOwnFruit/${this.state.selectedObj._id}`, requestBody).then((responed) => {
      const newArr = this.state.fruitDtat.map((item) => {
        if (item._id === this.state.selectedObj._id) {
          return(item)
        }

      })
      this.setState({ fruitDtat: newArr })
      this.update()
    })  }
  render() {
    return(
      <div>
        {this.state.showModal && <FormAndModal
          show={this.state.showModal}
          handleForm={this.handleForm}
          handleClose={this.update}
          selectedObj={this.state.selectedObj}/>}
        return(
          <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={el.image} />
  <Card.Body>
            <Card.Title>{el.name }</Card.Title>
    <Card.Text>
      {el.price}
    </Card.Text>
            <Button variant="primary" onClick={() => { this.deletObj(el._id) }}>delete Fruit</Button>
            <Button variant="primary" onClick={()=>{this.update(el)}}>update Fruit</Button>
  </Card.Body>
</Card>
        )

      </div>
    )
  }
}

export default withAuth0(FavFruit);
