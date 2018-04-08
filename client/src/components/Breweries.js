import React from 'react'; 
import axios from 'axios';
import { Button, Grid, Card, List, Container, Segment } from 'semantic-ui-react';

class Breweries extends React.Component { 
  state = { breweries: [] }

  componentDidMount(){
    axios.get('/api/all_breweries')
      .then ( res => this.setState({ breweries: res.data.entries }))
  }
  
  showBreweries = () => { 
      return this.state.breweries.map((brewery, key) => {
     return(
     <div>

    <Card color="yellow" key={brewery.name}>
      <Card.Content>
        <Card.Header>{brewery.name}</Card.Header>
        <Card.Meta>Established: {brewery.established}</Card.Meta>
        <Card.Description>{brewery.description}</Card.Description>
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
                  <Card.Group stackable itemsPerRow={6}>
                    {this.showBreweries()}
                  </Card.Group>
        </Grid.Row>
      </Grid>
  </Container>
</Segment>
    )
    }
}
  

export default Breweries; 