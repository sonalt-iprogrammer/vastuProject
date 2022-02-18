import { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import MyModal from '../UI/Modal/Modal'
import Loader from '../UI/Loader/Loader'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import MainContent from '../UI/MainContent/MainContent'
import Sidebar from '../UI/SideBar/Sidebar'
import './VastuscoreCheck.css'
import axios from 'axios'
import VastuScoreCalculate from './VastuScoreCalculate/VastuScoreCalculate'
import { Link } from 'react-router-dom'

const VastuscoreCheck = (props) => {
  const [cardData, setCardData] = useState({ Direction: '', listData: [] })
  const [isLoading, setIsLoding] = useState(false)

  const [listData, setListData] = useState([
    {
      Direction: 'North West',
      RoomList: [],
    },
    {
      Direction: 'North',
      RoomList: [],
    },
    {
      Direction: 'North East',
      RoomList: [],
    },
    {
      Direction: 'West',
      RoomList: [],
    },
    {
      Direction: 'Centre',
      RoomList: [],
    },
    {
      Direction: 'East',
      RoomList: [],
    },
    {
      Direction: 'South West',
      RoomList: [],
    },
    {
      Direction: 'South',
      RoomList: [],
    },
    {
      Direction: 'South East',
      RoomList: [],
    },
  ])
  const [isCardClicked, setCardClicked] = useState(false)
  const [VastuScoreChecked, setVastuScoreChecked] = useState(false)
  const [ScoreData, setScoreData] = useState({
    overAllVastuScore: '',
    roomWiseVastuScore: [{}],
    vastuScoreStatus: '',
  })

  const [modalShow, setModalShow] = useState(false)

  const onCardClickHandler = (item) => {
    setIsLoding(true)
    let inputs = document.getElementsByClassName('checkBox')

    // for (let i = 0; i < listData.length; i++) {
    //   if (listData[i].Direction == item && listData[i].RoomList.length !== 0) {
    //     for (let j = 0; j < inputs.length; j++) {
    //       listData[i].RoomList.map((key) => {
    //         if (key == inputs[j].value) {
    //           // var inputVal=inputs[j].value;
    //           document.querySelector("[value = key]").checked= true
    //           // checked.checked = true
    //            console.log(inputs[j].value)
    //           //console.log(this)
    //         }
    //       })
    //     }
    //   }else{
    //   // for (let k = 0; k < inputs.length; k++) {
    //   //   inputs[k].checked = false
    //   }
    // }
    // }
    for (let k = 0; k < inputs.length; k++) {
      inputs[k].checked = false
    }

    axios
      .get(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList',
      )
      .then((Responsedata) => {
        let roomListData = {
          Direction: item,
          listData: Responsedata?.data?.payload?.data?.roomList,
        }
        setCardData(roomListData)
        setIsLoding(false)
        setCardClicked(true)
      })
  }

  const isClickedModal = () => {
    setModalShow(true)
  }

  const showSelectedItem = (Direction, e) => {
    let listArray = [...listData]

    for (let i = 0; i < listArray.length; i++) {
      if (e.target.checked) {
        if (
          listArray[i].Direction == Direction.Direction &&
          !listArray[i].RoomList.includes(e.target.value)
        ) {
          listArray[i].RoomList.push(e.target.value)
        }
      } else {
        if (listArray[i].Direction == Direction.Direction) {
          listArray[i].RoomList.splice(
            listArray[i].RoomList.indexOf(e.target.value),
            1,
          )
        }
      }

      setListData(listArray)
    }
  }

  const goBack = (value) => {
    setVastuScoreChecked(value.value)
  }

  const CalculateVastuScore = (DataToalculate) => {
    setIsLoding(true)
    let obj = {}
    for (let i in DataToalculate) {
      obj[DataToalculate[i].Direction] = DataToalculate[i].RoomList
    }

    const fetchScore = {
      selectedRoomsAndDirection: obj,
    }

    axios
      .post(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getVastuScore',
        fetchScore,
      )
      .then((Response) => {
        setScoreData(Response.data.payload.data)
        setVastuScoreChecked(true)
        setIsLoding(false)
      })
  }

  const resetValue = () => {
    let resetValues = [...listData]

    for (let i = 0; i < resetValues.length; i++) {
      resetValues[i].RoomList = []
    }
    console.log(resetValues)
    setListData(resetValues)
    setCardClicked(false)
  }

  return (
    <Fragment>
      {!VastuScoreChecked && (
        <Sidebar>
          {isLoading && <Loader></Loader>}
          <div className="vastuSidebar">
            <BreadCrumb className="myBreadcrumb"></BreadCrumb>
            {!isCardClicked && (
              <p>
                Select the rooms that are present in each direction of your hone
                by clicking on the relevant boxes on the right.
              </p>
            )}
            <div className="ListCard">
              {isCardClicked && (
                <div>
                  <Card className="listCard">
                    <div>
                      {' '}
                      <h2>{cardData.Direction}</h2>
                    </div>
                    <div className="linkClass">
                      <p>Want to know more about {cardData.Direction}?</p>
                      <Link to="" onClick={isClickedModal}>
                        {' '}
                        Read Now ?
                      </Link>
                    </div>
                    <p>
                      Select the rooms that are present in North West direction
                      of your home by tapping on the boxes below:
                    </p>
                    <Row>
                      {cardData.listData.map((item, index) => {
                        return (
                          <Col className='MyCol'
                            key={index}
                            sm={6}
                            
                          >
                            {' '}
                            <input
                              className="checkBox"
                              type="checkbox"
                              value={item}
                              onClick={(e) =>
                                showSelectedItem(
                                  { Direction: cardData.Direction },
                                  e,
                                )
                              }
                            />
                            {item}
                          </Col>
                        )
                      })}
                    </Row>

                    <MyModal
                      modalData={cardData.Direction}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Card>
                </div>
              )}
            </div>
          </div>
        </Sidebar>
      )}
      {!VastuScoreChecked && (
        <MainContent>
          <Container>
            <Row>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North West"
                  onClick={(e) => onCardClickHandler('North West', e)}
                >
                  <h5>NORTH WEST</h5>
                  <hr />
                  {listData[0].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[0].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North"
                  onClick={() => onCardClickHandler('North')}
                >
                  <h5>NORTH</h5>
                  <hr />
                  {listData[1].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[1].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North East"
                  onClick={() => onCardClickHandler('North East')}
                >
                  <h5>NORTH EAST</h5>
                  <hr />
                  {listData[2].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[2].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="West"
                  onClick={() => onCardClickHandler('West')}
                >
                  <h5>WEST</h5>
                  <hr />
                  {listData[3].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[3].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="Centre"
                  onClick={() => onCardClickHandler('Centre')}
                >
                  <h5 style={{ color: '#FF7021' }}>CENTER OF THE HOME</h5>
                  <hr />
                  {listData[4].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[4].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="East"
                  onClick={() => onCardClickHandler('East')}
                >
                  <h5>EAST</h5>
                  <hr />
                  {listData[5].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[5].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South West"
                  onClick={() => onCardClickHandler('South West')}
                >
                  <h5>SOUTH WEST</h5>
                  <hr />
                  {listData[6].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[6].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South"
                  onClick={() => onCardClickHandler('South')}
                >
                  <h5>SOUTH</h5>
                  <hr />
                  {listData[7].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[7].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South East"
                  onClick={() => onCardClickHandler('South East')}
                >
                  <h5>SOUTH EAST</h5>
                  <hr />
                  {listData[8].RoomList.length == 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    <ul>
                      {listData[8].RoomList.map((item) => {
                        return <li>{[item]}</li>
                      })}
                    </ul>
                  )}
                </Card>
              </Col>
            </Row>

            <div className='Button-Div'>
              <Button className='ResetRoom' onClick={() => {
                  resetValue()
                }}
              >
                RESET ROOMS
              </Button>
              <Button className="CalVastuScore" onClick={() => {
                  CalculateVastuScore(listData)
                }}
              >
                CALCULATE
              </Button>
            </div>
          </Container>
        </MainContent>
      )}{' '}
      {VastuScoreChecked && (
        <VastuScoreCalculate
          ScoreData={ScoreData}
          goBack={goBack}
          resetValue={resetValue}
        >
          {props.children}
        </VastuScoreCalculate>
      )}
    </Fragment>
  )
}
export default VastuscoreCheck
