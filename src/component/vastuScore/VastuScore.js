import { Fragment, useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import MyModal from '../UI/Modal/Modal'
import Sidebar from '../UI/SideBar/Sidebar'
import Loader from '../UI/Loader/Loader'
import './VastuScore.css'
const VastuScore = () => {
  const [RoomList, setRoomList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading)

  useEffect(() => {
    setIsLoading(true)
    console.log(isLoading)
    fetch(
      'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList',
    )
      .then((response) => {
        return response.json()
      })
      .then((responceData) => {
        setIsLoading(false)
        setRoomList(
          responceData.payload.data.roomList.map((item) => {
            return item
          }),
        )
      })
  }, [setIsLoading])

  console.log(RoomList)

  const chunk = (Listarr1, chunkSize = 1, cache = []) => {
    const tmp = [...Listarr1]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  }

  let val = chunk([...RoomList], 2)

  return (
    <Fragment>
      <Sidebar>
        <div className="vastuSidebar">
          <BreadCrumb style={{ marginleft: '1rem' }}></BreadCrumb>
          <p>
            Tap on a room below to see the suitable direction for it in your
            home alongside additional information
          </p>
          <h1>{isLoading}</h1>
          {isLoading && <Loader></Loader>}
          {!isLoading && (
            <div className="listContent">
              {val.map((items) => {
                return (
                  <Row key={Math.random()}>
                    {items.map((item) => {
                      return (
                        <Col key={item}>
                          <Card className="MyCard" key={item}>
                            {item}
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                )
              })}
            </div>
          )}
        </div>
      </Sidebar>
      {/* <Row className='insideVastuScore'>
      <div  className='listContent'>
              {val.map((items) => {
                return (
                  <Row key={Math.random()}>
                    {items.map((item) => {
                      return (
                        <Col key={item}>
                          <Card className="MyCard" key={item}>
                            {item}
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                )
              })}
            </div>
        

      </Row> */}
    </Fragment>
  )
}
export default VastuScore
