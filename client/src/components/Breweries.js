import React from 'react'; 
import axios from 'axios';
import { Button, Grid, Card, List, Container,Loader, Segment, Visibility, Image, Modal, Header, Dimmer} from 'semantic-ui-react';

class Breweries extends React.Component { 
  state = { breweries: [], page: 1, totalPages:0 }

  componentDidMount(){
    axios.get('/api/all_breweries')
      .then ( res => this.setState({ breweries: res.data.entries }))
  }

  onBottomVisible=()=>{
    const page = this.state.page; 
    axios.get(`/api/all_breweries?page=${page}&per_page=10`)
      .then( ({data, headers}) => {
        this.setState( state => {
          return {breweries: [...state.breweries, ...data.entries], page: state.page+1}
        })
      })
  }
  
  showBreweries = () => { 
      return this.state.breweries.map((brewery, key) => {
     return(
     <div>

    <Card fixed color="yellow" key={brewery.name}>
      <Card.Content>
        <Card.Header>{brewery.name}</Card.Header>
        <Card.Meta>{brewery? brewery.established : 'Untitled'}</Card.Meta>
        <Modal trigger={<Button>Show More!</Button>} closeIcon>
          <Modal.Header>{brewery.name}</Modal.Header>
          <Modal.Content>
          <Modal.Description>
            <Header>Brewery Description</Header>
            <p>{brewery.description}</p>
          </Modal.Description>
          </Modal.Content>
        </Modal>
      </Card.Content>
    </Card>
      </div>
          )
        }
      )
    }


  render() { 
    return (
<Segment>
  <Container style={{height: '400vh', width:'1000vh', overflowX: 'scroll', paddingTop:'100px'}}>
   <div>
    <Visibility
      once = {true}
      continuous={true}
      onBottomVisible={()=>this.onBottomVisible()}
    >
      <Grid>
                  <Card.Group itemsPerRow={3}>
                    {this.showBreweries()}
                  </Card.Group>
      </Grid>                       
  </Visibility>
  </div>

  </Container>
</Segment>
    )
    }
}
  

export default Breweries; 