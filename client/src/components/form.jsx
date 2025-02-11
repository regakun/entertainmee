import React, {useState, useEffect} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Container, Row, Col, Button, Form, } from 'react-bootstrap'
import Swal from 'sweetalert2'

import {
    useParams,
    useHistory
} from 'react-router-dom'

function InputForm(props) {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [tags, setTags] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const {id} = useParams()


    let type 
    if (props.keys === 'series') {
        type = 'Serie'
    }else{
        type = 'Movie'
    }
    

    const getItems = gql`
        query Find${type} {
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

    let datas
    const {data, loading} = useQuery(getItems)
    if(!loading){
        if (data) {
            if(data[type][0]) {
                datas = data[type][0]
            } else{ 
                datas = data[type]
            }
        }
    }


    const insertItem = gql`
      mutation insert${type}($title: String!, $overview: String!, $popularity: Int!, $poster_path: String!, $tags: [String]!) {
        insert${type}(title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
          _id,
          title,
          overview,
          poster_path,
          tags,
          popularity
        }
      }
    `
    const updateItem = gql`
      mutation update${type}($id: ID!, $title: String!, $overview: String!, $popularity: Int!, $poster_path: String!, $tags: [String]!) {
        update${type}(id: $id, title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
          _id,
          title,
          overview,
          poster_path,
          tags,
          popularity
        }
      }
    `

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
      
    const [insert, {dataInsert: mutationData, errorInsert: mutationError}] = useMutation(insertItem, {
        refetchQueries: [
            {query: getListItems}
        ]
    })
    const [update] = useMutation(updateItem, {
        refetchQueries: [
            {query: getListItems}
        ]
    })

    useEffect(() => {    
        if (props.types === 'update') {
            if (!loading) {
                setTitle(datas.title)
                setOverview(datas.overview)
                setPopularity(datas.popularity)
                setTags(datas.tags.toString())
                // setTags(datas.tags)
                setPosterPath(datas.poster_path)
            }
        }
    }, [loading])

    const submitForm = (event) => {
        event.preventDefault()
        let inputTags = tags.split(',')
        inputTags = inputTags.map(value => value.trim())
        if(props.types === 'create'){
            insert({variables: {title, overview, popularity: Number(popularity), poster_path, tags: inputTags}})
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'The item has been added',
                showConfirmButton: false,
                timer: 1500
              })
        }else{
            update({variables: {id: id, title, overview, popularity: Number(popularity), poster_path, tags: inputTags}})
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'The item has been updated',
                showConfirmButton: false,
                timer: 1500
              })
        }
        history.push('/')
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submitForm} method="post">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title <span>*</span> </Form.Label>
                            <Form.Control type="text" value={title} placeholder="Enter Title" onInput={(e) => setTitle(e.target.value)} required/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPoster">
                            <Form.Label>Poster Link<span>*</span> </Form.Label>
                            <Form.Control type="text" value={poster_path} placeholder="Link to Poster Image" onInput={(e) => setPosterPath(e.target.value)} required/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPopularity">
                            <Form.Label>Popularity<span>*</span> </Form.Label>
                            <Form.Control type="number" value={popularity} placeholder="Popularity" onInput={(e) => setPopularity(e.target.value)} required/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicOverview">
                            <Form.Label>Overview<span>*</span> </Form.Label>
                            <Form.Control as="textarea" value={overview} rows={4} placeholder="Overview" onInput={(e) => setOverview(e.target.value)} required/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicTags">
                            <Form.Label>Tags<span>*</span> </Form.Label>
                            <Form.Control type="text" value={tags} placeholder="Tags" onInput={(e) => setTags(e.target.value)} required/>
                            <Form.Text className="text-muted">
                                Please separate tags with comma (,)
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default InputForm
