import React from 'react'
import styled from 'styled-components'

const JobBox = styled.div`
  width: 50%;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;

  .title {
    font-size: 24px;
  }

  .price {
    font-weight: bold;
    margin: 15px 0px;
  }

  .bottom {
    display: flex;
    gap: 10px;
    margin: 15px 0px;

    a {
      color: #0054a5;
    }
  }
`

const JobsMap = ({ title, company, location, price, description, time }) => {
  return (
    <JobBox>
      <div className="title">{title}</div>
      <div className="company">{company}</div>
      <div className="location">{location}</div>
      <div className="price">{price}</div>
      <div className="description">{description}</div>
      <div className="bottom">
        <div className="time">{time}</div>
        <a>Ver mais</a>
      </div>
    </JobBox>
  )
}

export default JobsMap
