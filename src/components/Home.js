import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitDtat: [],
    };
  
  }
  componentDidMount = () => {
    axios.get('http://localhost:7000/getFruit').then((response) => {
      this.setState({ fruitDtat: response.data.fruits })
      
    });



  }
  

  addToFav = (favFruit) => { axios.post('http://localhost:7000/getOwnFruit', favFruit) }

  render() {
  
    return (
      <div>
        {this.state.fruitDtat.map((el) => {

          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={el.image} />
              <Card.Body>
                <Card.Title> {el.name}</Card.Title>
                <Card.Text>
                  {el.price}
      
                </Card.Text>
                <Button variant="primary" onClick={() => {
                  this.addToFav({ name: el.name, image: el.image, price: el.price, email: this.prpps.auth0.user.email })
                }}>Add To Fav</Button>
              </Card.Body>
            </Card>

          )
        })}
      </div>
      
        
    )
  }
  ;
}
export default withAuth0(Home);
