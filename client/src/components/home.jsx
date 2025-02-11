import { Col, Container, Row, Accordion, Card } from 'react-bootstrap'
import  Items from './items'

import { useQuery, gql, makeVar } from '@apollo/client'

import React, { useEffect, useState } from 'react'
import {
    useHistory
  } from "react-router-dom";

const getSeries = gql`
  query GetSeries {
    Series {
      _id,
      title,
      overview,
      poster_path
    },
    Movies {
      _id,
      title,
      overview,
      poster_path
    },
  }
`



function Home(props) {
  const [Favorite, setFavorite] = useState({Series: [], Movies: []})
  // let favorites = {
  //   Series: (localStorage.getItem('SerieFavorite') ? JSON.parse(localStorage.getItem('SerieFavorite')) : []) ,
  //   Movies: (localStorage.getItem('MovieFavorite') ? JSON.parse(localStorage.getItem('MovieFavorite')) : []),
  // }
  
  const RefetchFav = () => {
    setFavorite({
      Series: (localStorage.getItem('SerieFavorite') ? JSON.parse(localStorage.getItem('SerieFavorite')) : []) ,
      Movies: (localStorage.getItem('MovieFavorite') ? JSON.parse(localStorage.getItem('MovieFavorite')) : [])
    })
  }
  useEffect(() => {
    RefetchFav()
  },[])

  const {data, loading, error} = useQuery(getSeries)
  // const data = favorites
  let itemData
      if (props.types === 'favorite') {
        itemData = Favorite
      }else{
        itemData = data
      }
  
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
                Series
                <hr/>
              </Col>
              {itemData.Series.map((element, id) => (
                    <Col lg="3" className="mb-3 p-0" key={id}>
                      <Items data={element} types="series" refetchFav={RefetchFav}>
                      </Items>
                    </Col>
                  ))
                }
            </Row>
            <Row>
              <Col lg="12">
                Movies
                <hr/>
              </Col>
              {itemData.Movies.map((element, id) => (
                    <Col lg="3" className="mb-3 p-0" key={id}>
                      <Items data={element} types="movies" refetchFav={RefetchFav}>
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

export default Home
