import { Col, Container, Row } from 'react-bootstrap'
import  Items from './items'

import { useQuery, gql } from '@apollo/client'

import React, { useEffect } from 'react'

function List(props) {

let type 
if (props.types === 'series') {
    type = 'Series'
}else{
    type = 'Movies'
}

const getItems = gql`
  query GetSeries {
    ${type} {
      _id,
      title,
      overview,
      poster_path
    }
  }
`
    const {data, loading, error} = useQuery(getItems)
  
    if (loading) {
      return (
        <Container className="pt-3">
          <Row>
                <Col className="loading-container">
                  <div class="loadingio-spinner-cube-ree4xz2pr3m">
                    <div class="ldio-pg5o0nt2gjd">
                      <div>
                      </div>
                      <div>
                        </div>
                        <div>
                        </div>
                      <div>
                    </div>
                    </div>
                  </div>
                </Col>
            </Row>
         </Container>
      )
    }else {
      return (
        <div className="App">
          <Container className="pt-3">
            <Row>
              <Col lg="12">
                {type}
                <hr/>
              </Col>
              {data[type].map((element, id) => (
                    <Col lg="3" className="mb-3 p-0" key={id}>
                      <Items data={element} types={props.types}>
                      </Items>
                    </Col>
                  ))
                }
            </Row>
          </Container>
          {/* <Modals show={isShow} onHide={onHide} movieDetails={movieDetails}></Modals> */}
        </div>
      )
    }
}

export default List
