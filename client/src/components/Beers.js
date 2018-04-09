import React from 'react'; 
import axios from 'axios';
import { Button, Image, Grid, Card,Container, Segment,Header,Icon, Visibility} from 'semantic-ui-react';
import AllBeers from './AllBeers'
import {Link} from 'react-router-dom';
import bart from '../images/33.png';
import imagePlaceholder from '../images/imagePlaceholder.png'

class Beers extends React.Component { 
  state = { beers: [], page:1, totalPages:0 }
  //fetches 50 beers onMount
  componentDidMount(){
    axios.get('/api/all_beers')
      .then ( res => this.setState({ beers: res.data.entries,  totalPages: res.data.total_pages }))
  }
  //when bottom of container is reached api call is made for 10 more items
  onBottomVisible=()=>{
    const page = this.state.page;
    axios.get(`/api/all_beers?page=${page}&per_page=10`)
      .then( ({data, headers}) => {
        this.setState( state => {
          return {beers: [...state.beers, ...data.entries], page: state.page+1}
        })
      })
  }

//function to load and map the beer data
  showBeers = () => {
    return this.state.beers.map((beer, key) => {
     return(
        <div>
          <Card color="yellow" key={key} centered>
            {beer.labels?
            <Image size="medium" src={beer.labels.medium}/> 
            : 
            <Image size="medium" src={imagePlaceholder}/>}
            <Card.Header>
                {beer.name? beer.name
                :
                'Currently Unavailable'}
            </Card.Header>
            <Card.Description>
                Style of Beer: {beer.style.name? beer.style.name
                : 'Style not Available'}
            </Card.Description>
            <Card.Meta>
             ABV: {beer.abv? beer.abv : 'Currently Unavailable'}
            </Card.Meta>
            <Link to={`/beer/${beer.name}`}>
              <Button attached='bottom'>Click for more info!</Button>
            </Link>
        </Card> 
      </div>
          )
        }
      )
    }


  render() { 
    return (
      <Segment>
        <Segment basic textAlign='center'>
          <Image style={styles.centered} size='small' src={bart} alt='DevPoint Studios Logo' />
          <Header as='h1' style={styles.header}>DevPoint Studios React Assessment</Header>
        </Segment>
          <Grid celled padded centered>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <Visibility
                once = {true}
                continuous={true}
                onBottomVisible={()=>this.onBottomVisible()}
              >
                <Card.Group >
                  {this.showBeers()}
                </Card.Group>
              </Visibility>
            </Grid.Column>
          </Grid>
        </Segment>
          )
        }
      }

const styles = {
  centered: {
    margin: '0 auto',
  },
  header: {
    color: '#2ecc40'
  }
}
  

export default Beers; 