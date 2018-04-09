import React from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'
import { Container, Item, Header, Image, Segment, List} from 'semantic-ui-react';
import imagePlaceholder from '../images/imagePlaceholder.png'

class BeerView extends React.Component { 
  state = {beer: {}}
    componentDidMount(){
      const {name}=this.props.match.params 
      axios.get(`/api/beer/${name}`)
      .then(res => {
        this.setState({beer: res.data.entries[0]})
      })
    }

    getLabel = () => {
      const {beer} = this.state 
      return(
        <Item.Image src={beer.labels.medium} />
      )
    }

  render(){
    const {beer} = this.state 
    // debugger
  return(
    <Container fluid style={styles.contain} >
       <Item>
         <Segment>
          {beer.labels? this.getLabel() : <Item.Image src={imagePlaceholder} />}
          <Item.Content>
            <Item.Header as='h3'>{beer.name}</Item.Header>
            <Item.Extra>
              <Segment inverted>
                <List divided inverted>
                  <List.Item>
                    <List.Content>
                      <List.Header>Description <br/>{beer.description? beer.description : "Sorry No Description Available for this beer"} </List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      {/* <List.Header>Style of Beer <br/>{beer.description} </List.Header> */}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>ABV <br/>{beer.abv} </List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Item.Extra>
          </Item.Content>
         </Segment>
        </Item>
    </Container>
  )

  }
}

const styles = { 
  contain: {
    background: '#E5C6CC',
    height:'80vh',
    padding:'50px'
  }
}

export default BeerView;