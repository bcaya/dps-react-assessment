import React from 'react'; 
import axios from 'axios';
import { Button, Grid, Card, List, Container, Segment, Accordion, Icon, Visibility} from 'semantic-ui-react';
import AllBeers from './AllBeers'

class Beers extends React.Component { 
  state = { beers: [], activeIndex: 0, page:1, totalPages:0 }
  

  componentDidMount(){
    axios.get('/api/all_beers')
      .then ( res => this.setState({ beers: res.data.entries,  totalPages: res.data.total_pages }))
  }
  onBottomVisible=()=>{
    const page = this.state.page+1;
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( ({data, headers}) => {
        this.setState( state => {
          return {beers: [...state.beers, ...data.entries], page: state.page+1}
        })
      })
  }

  showBeers = () => { 
      return this.state.beers.map((beer, index) => {
     return(
     <div>
               <Card key={index}>
          <Card.Content>
            <Card.Header>
              {beer? beer.name : 'Untitled'}
            </Card.Header>
            <Card.Description>
              Style: {beer.style? beer.style.category.name : 'Unknown'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='blue'>View</Button>
            </div>
          </Card.Content>
        </Card>

  
   }
    )
      </div>
          )
        }
      )
    }


  render() { 
    return (

 
<Segment basic>
  <Container 
  // style={
    // {height: '80vh'}
    // }
    >
      <Grid>
        <Grid.Row>
              <Grid.Column width={8}>
              <div style={{ overflowX: 'scroll'}}>
 <Visibility
      once = {true}
      continuous={true}
      onBottomVisible={()=>this.onBottomVisible()}
    >
                    {this.showBeers()}
    </Visibility>
              </div>
              </Grid.Column>
             
        </Grid.Row>
      </Grid>
  </Container>
</Segment>
    )
    }
}
  

export default Beers; 