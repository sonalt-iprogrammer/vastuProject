import axios from 'axios'
import { useState } from 'react'
import { Card, Row, Col, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './VastuScoreCalculate.css'

const VastuScoreCalculate = (props) => {
  const [roomModalData, setRoomModalData] = useState({
    room: '',
    favourableDirections: [],
    nuetralDirections: [],
    unfavourableDirections: [],
  })
  const [ModalShow, setModalShow] = useState(false)
  const [LegendModal, setLegendModal] = useState(false)

  const roomWiseVastuScore = props.ScoreData.roomWiseVastuScore

  const favourableDirections = []
  const nuetralDirections = []
  const unfavourableDirections = []

  const onGoBackClick = () => {
    props.goBack({
      value: false,
    })
  }
  const resetting = () => {
    props.resetValue()
    props.goBack({
      value: false,
    })
  }

  const onRoomClick = (room) => {
    setModalShow(true)
    axios
      .post(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomDetails',
        { roomName: room },
      )
      .then((Response) => {
        const MyData = Response.data.payload.data

        for (let key in MyData) {
          if (key == 'favourableDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              favourableDirections.push(MyData[key][i])
              console.log(MyData[key][i])
            }
          } else if (key == 'unfavourableDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              unfavourableDirections.push(MyData[key][i])
            }
          } else if (key == 'neutralDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              nuetralDirections.push(MyData[key][i])
            }
          }
        }
        console.log(favourableDirections)
        setRoomModalData({
          room: room,
          favourableDirections: favourableDirections,
          nuetralDirections: nuetralDirections,
          unfavourableDirections: unfavourableDirections,
        })
      })
  }
  console.log(favourableDirections)
  const onLegendClick = () => {
    setLegendModal(true)
  }

  return (
    <div>
      <Card className="calculateCard">
        <div>
          <a onClick={onGoBackClick}>
            <img src="assets/images/back_arrow-orange.png" alt="back_icon" />
            <span style={{ color: ' #FF7021' }}>GO BACK</span>
          </a>
        </div>
        <p className="calculateHeading">OVERALL VAASTU SCORE</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: ' #D11E4C' }}>
            {props.ScoreData.overallVastuScore}
          </h1>
          <h5
            style={{ color: '#503796' }}
            onClick={() => {
              onLegendClick()
            }}
          >
            {props.ScoreData.vastuScoreStatus}
          </h5>
        </div>
        <hr />
        <p className="calculateHeading">ROOM-WISE BREAKUP OF VAASTU SCORE</p>
        <p style={{ color: ' #666666' }}>
          Tap on any room name to know more about the details of the room.
        </p>
        <hr />
        <Row>
          {roomWiseVastuScore.map((item) => {
            return (
              <Col className="listItems" key={Math.random()} sm={6}>
                {' '}
                <div
                  onClick={() => {
                    onRoomClick(item.room)
                  }}
                >
                  {item.room}
                </div>
                <div>
                  <input
                    className="legend"
                    type="button"
                    onClick={() => {
                      onLegendClick()
                    }}
                    value={item.legend}
                  />
                </div>
              </Col>
            )
          })}
        </Row>
      </Card>
      <button className="btn-reset" onClick={() => resetting()}>
        RESET VASTU SCORE
      </button>
      <div className="card-vastuCompliant">
        <div className="card-plan">
          <h5>Vaastu Compliant Plans</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p>
                We create Vaastu compliant 2D and 3D plans. Check out our
                gallery of plans now.
              </p>
            </div>
            <div>
              <img src="assets/images/map.svg" />
            </div>
          </div>
        </div>
      </div>

      <Modal
        onHide={() => setModalShow(false)}
        show={ModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="myModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {roomModalData.room}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>FAVOURABLE DIRECTIONS</h5>
            {roomModalData.favourableDirections.map((item) => {
              return <button className="btn-Favorable">{item}</button>
            })}
          </div>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>NEUTRAL DIRECTIONS</h5>
            {roomModalData.nuetralDirections.map((item) => {
              return <button className="btn-Neutral">{item}</button>
            })}
          </div>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>AVOIDABLE DIRECTIONS</h5>
            {roomModalData.unfavourableDirections.map((item) => {
              return <button className="btn-Avoidable">{item}</button>
            })}
          </div>
          <strong style={{ margin: '4px' }}>ABOUT</strong>

          <ul>
            <li>
              {' '}
              <strong>Drained water pipe position:</strong> You should provide
              fitting of pipes for drained water in the northeast. The bathroom
              floor slope should be towards north and east, so water drains to
              the northeast side of the bathroom.
            </li>
            <hr />
            <li>
              <strong>Shower, taps, and mirror position:</strong> Shower and
              fixtures in the bathroom can be attached to the northern wall.
            </li>
            <hr />
            <li>
              <strong>Geyser position:</strong> You can place the geyser in the
              southeast corner.
            </li>
            <hr />
            <li>
              <strong>Bathtub &amp; Washbasin position:</strong> You can place
              the bathtub in the western corner and provide space for a
              washbasin in the northeastern corner.
            </li>
            <hr />
            <li>
              <strong>Overhead tank position:</strong> The Overhead tanks should
              be in the southwest part of the site.
            </li>
            <hr />
            <li>
              <strong>Window/ ventilator position:</strong> There should be
              windows or ventilators in the east or the north.
            </li>
            <hr />
            <li>
              <strong>Showerhead/ bath position: </strong>You can take a bath in
              the western position of bathroom
            </li>
            <hr />
            <li>
              <strong>Bathrooms without W.C./ commode: </strong>You can place
              bathrooms<strong> </strong>without attached Toilet in the east or
              between east and north-east of your home.
            </li>
            <hr />
          </ul>

          <div></div>
        </Modal.Body>
      </Modal>
      <Modal
        onHide={() => setLegendModal(false)}
        show={LegendModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="legendModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Legend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What is different compliant scores means!</p>
          <div className="compliantScore">
            <h5>EXCELLENT</h5>
            <p>
              Your plan is as per the highest standards of Vaastu. Good job!
            </p>
          </div>
          <div className="compliantScore">
            <h5>GOOD</h5>
            <p>
              Most of the rooms in your layout have proper Vaastu compliance.
            </p>
          </div>
          <div className="compliantScore">
            <h5>IMPROVEMENT REQUIRED</h5>
            <p>
              If you are in planning stage, try re-positioning some rooms to
              improve Vaastu compliance.
            </p>
          </div>
          <div className="compliantScore">
            <h5>NON-VAASTU COMPLIANT</h5>
            <p>
              Please consult a Vaastu expert to help design the layout according
              to Vaastu.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default VastuScoreCalculate
