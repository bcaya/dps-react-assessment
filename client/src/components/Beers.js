import React from 'react'; 
import axios from 'axios';
import { Button, Image, Grid, Table, List, Container, Segment, Accordion, Icon, Visibility} from 'semantic-ui-react';
import AllBeers from './AllBeers'

class Beers extends React.Component { 
  state = { beers: [], page:1, totalPages:0 }
  componentDidMount(){
    axios.get('/api/all_beers')
      .then ( res => this.setState({ beers: res.data.entries,  totalPages: res.data.total_pages }))
  }
  onBottomVisible=()=>{
    const page = this.state.page;
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( ({data, headers}) => {
        this.setState( state => {
          return {beers: [...state.beers, ...data.entries], page: state.page+1}
        })
      })
  }

  showLabel = (beer) => {
    return(

    <Image size="large" src={beer.labels.large}/>
    )
  }

  showBeers = () => { 
    return this.state.beers.map((beer, index) => {
     return(
       <div>
          <Table.Row>
            <Table.Cell  >
                {beer? beer.name : 'Untitled'}
            </Table.Cell>
            <Table.Cell  >
                {beer? beer.style.name : 'Untitled'}
            </Table.Cell>
            <Table.Cell>
              {beer? beer.abv : 'Untitled'}
            </Table.Cell>
            <Table.Cell >
              {beer? beer.is_organic : 'Untitled'}
            </Table.Cell>
        </Table.Row>
      
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
  
              <div style={{ overflowX: 'scroll'}}>
 <Visibility
      once = {true}
      continuous={true}
      onBottomVisible={()=>this.onBottomVisible()}
    >
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Beer Name</Table.HeaderCell>
          <Table.HeaderCell>Style</Table.HeaderCell>
          <Table.HeaderCell>ABV</Table.HeaderCell>
          <Table.HeaderCell>Is It Organic?</Table.HeaderCell>
        </Table.Row>
    </Table.Header>

    <Table.Body>
      
         {this.showBeers()}
       
     </Table.Body> 
    </Table>
    </Visibility>
              </div>
  </Container>
</Segment>
    )
    }
}
  

export default Beers; 