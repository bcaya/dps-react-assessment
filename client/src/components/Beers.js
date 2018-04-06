import React from 'react'; 
import axios from 'axios';
import { Button, Grid, Card, List, Container, Segment } from 'semantic-ui-react';
import AllBeers from './AllBeers'

class Beers extends React.Component { 
  state = { beers: [] }

  componentDidMount(){
    axios.get('/api/all_beers')
      .then ( res => this.setState({ beers: res.data.entries }))
  }
  
  showBeers = () => { 
      return this.state.beers.map((beer, key) => {
     return(
     <div>

    <Card color="yellow" key={beer.name}>
      <Card.Content>
        <Card.Header>{beer.name}</Card.Header>
        <Card.Meta>ABV: {beer.abv}</Card.Meta>
        <Card.Description>{beer.description}</Card.Description>
      </Card.Content>
    </Card>
      </div>
          )
        }
      )
    }


  render() { 
    return (

 
<Segment basic>
  <Container style={{height: '80vh', width:'100vh', overflowX: 'scroll'}}>
      <Grid>
        <Grid.Row>
              <Grid.Column width={8}>
                
                  <Card.Group stackable itemsPerRow={6}>
                    {this.showBeers()}
                  </Card.Group>
              </Grid.Column>
             
        </Grid.Row>
      </Grid>
  </Container>
</Segment>
    )
    }
}
  

export default Beers; 