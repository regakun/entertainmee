import React, {useEffect} from 'react'
import { Card, CardImg, Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import {
    useHistory,
    useLocation,
    Redirect
  } from "react-router-dom";


function Items(props) {
    let history = useHistory()
    let column
    if (props.data.__typename === 'Movies') {
        column = 'MovieFavorite'
    }else{
        column = 'SerieFavorite'
    }
    useEffect(() => {
        // let favoriteItems = JSON.parse(localStorage.getItem(column))
        // favoriteItems.forEach(data => {
        //     if (data._id=== props.data._id) {
        //         favorites = true
        //     }
    // },[])
    });

    function viewDetails (id) {
        history.push(`${props.types}/details/${id}`)
      }

    function setFavorite (id) {

        if(localStorage.getItem(column)) {
            let favorites
            let temp = JSON.parse(localStorage.getItem(column))
            temp.forEach(data => {
                if (data && data._id === id) {
                    favorites = true
                }
            })
            if (!favorites) {
                temp.push(props.data)
                localStorage.setItem(column,JSON.stringify(temp))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'The item has been added to your favorite!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                deleteFavorite(id)
            }
            // console.log(temp)
        }else {
            localStorage.setItem(column,JSON.stringify([props.data]))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'The item has been added to your favorite!',
                showConfirmButton: false,
                timer: 1500
              })
        }
        props.refetchFav()
      }
      function deleteFavorite (id) {
          let favorites = JSON.parse(localStorage.getItem(column))
          favorites = favorites.map(data => {
              if (data && data._id !== id && data != null) {
                  return data
              }
          })
          favorites = favorites.filter(data => {
              if(data != null) {
                  return data
              }
          })
          if(favorites.length > 0) {
              localStorage.setItem(column, JSON.stringify(favorites))
          }else{
              localStorage.removeItem(column)
          }
          props.refetchFav()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The item has been successfully deleted!',
            showConfirmButton: false,
            timer: 1500
          })
        // var existed = favorites.filter(function(itm){
        //     if (itm.id !== id) {
        //         return itm
        //     }
        // });
        // dispatch(renewFavoriteAsync(existed))
      }

    return (
        <Col lg="12">
            <Card className="cards">
                {/* <Card.Header> {props.data.title} </Card.Header> */}
                {/* <div className="card-image">
                    <CardImg variant="top" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2//pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg`} />
                    <div className="overlay-text" onClick={() => viewDetails(props.data.id)} >
                        Fate/Stay Night
                    </div>
                </div> */}
                <div className="cardHeader">
                    <div className="favorite-button" onClick={() => props.keys==='favorites' ? (deleteFavorite(props.data._id)) : (setFavorite(props.data._id))}>
                </div>
                </div>
                <div className="card-image">
                    <CardImg variant="top" src={props.data.poster_path} />
                    <div className="overlay-text" onClick={() => viewDetails(props.data._id)} >
                        {props.data.title}
                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default Items
