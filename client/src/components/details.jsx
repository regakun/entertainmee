import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Card, Badge, Button } from 'react-bootstrap'

import { useQuery, gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'

import {
    useParams,
    useHistory
} from 'react-router-dom'

export default function Details(props) {
    let {id} = useParams()
    let history = useHistory()

    let type 
    if (props.types === 'series') {
        type = 'Serie'
    }else{
        type = 'Movie'
    }

    const getListItems = gql`
    query Get${type}s {
        ${type}s {
        _id,
        title,
        overview,
        poster_path
        }
    }
    `
    
    const getItems = gql`
      query Get${type} {
        ${type}(id: "${id}") {
          _id,
          title,
          overview,
          poster_path,
          tags,
          popularity
        }
      }
    `
    const deleteItemQuery = gql`
    mutation delete${type}($id: ID!) {
      delete${type}(id: $id) {
        status
      }
    }
  `


    const [deleteItem] = useMutation(deleteItemQuery, {
        refetchQueries: [
            {query: getListItems}
        ]
    })
        const deleteItemTrigger = (id) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteItem({variables: {id}})
                  Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                  )
                  history.push('/')
                }
              })
        }
        let datas
        const {data, loading, error} = useQuery(getItems)
        // console.log(data)
        if(!loading) {
            if (data) {
                if (data[type][0]) {
                    datas = data[type][0]
                }else{
                    datas = data[type]
                }
            }
        }
        if (loading) {
            return (
                <Container>
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
                <Container>
                    <Row>
                        <Col lg="4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={datas.poster_path} />
                                <Card.Body>
                                    <Button className="editButton" onClick={() => history.push(`/${props.types}/update/${id}`, )} variant="info">
                                        Edit
                                    </Button>
                                    <Button className="editButton" onClick={() => deleteItemTrigger(id)} variant="danger">
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                            </Col>
                        <Col lg="8">
                            <table className="details-table">
                                <tbody className="table-details">
                                    <tr>
                                        <td className="key">
                                            Title:
                                        </td>
                                        <td>
                                            {datas.title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="key">
                                            Genres:
                                        </td>
                                        <td>
                                            { (datas.tags && datas.tags.length>0) ? datas.tags.map((genre, index) => (
                                                <Badge variant="info" className="badge-genre" key={index}>{genre}</Badge>
                                            )) :  <Badge variant="info" className="badge-genre" >Unlisted</Badge>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="key">
                                            Popularity:
                                        </td>
                                        <td>
                                        {datas.popularity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="key">
                                            synopsis:
                                        </td>
                                        <td>
                                            {datas.overview}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            )
        }
}
