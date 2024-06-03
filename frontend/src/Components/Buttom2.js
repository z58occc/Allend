import React from 'react'
import styles from './category.module.css'
import { Link } from 'react-router-dom'
function Buttom2({ text, src,to }) {
  return (
    <div className='col-2'>
      <Link to={`/findcase/${to}`} className={`${styles.categorylink}`}>
      <div>{text}</div>
      <img style={{ width: "60px" }} src={src}></img>
      </Link>

    </div>
    // <Col>
    //   <div>{text}</div>
    //   <img style={{ width: "60px" }} src={src}></img>

    // </Col>
  )
}

export default Buttom2