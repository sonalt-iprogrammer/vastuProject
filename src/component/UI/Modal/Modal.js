import { useEffect, useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import './Modal.css'
import axios from 'axios'

const chunk = (Listarr1, chunkSize = 1, cache = []) => {
  const tmp = [...Listarr1]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const MyModal = (props) => {
  const [showData, setShowdata] = useState([])

  let List = chunk([...showData], 2)

  useEffect(() => {
    let requestJSON = { direction: props.modalData }

    axios
      .post(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getDirectionDetails',
        requestJSON,
      )
      .then((Response) => {
        setShowdata(Response.data.payload.data.favourableDirections)
      })
  }, [])

  return (
    <Modal
      //
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="myModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalData}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ABOUT</p>
        <p>
          {' '}
          {props.modalData} is a direction of wealth, prosperity, stability and
          security.{props.modalData} is an auspicious direction for any kind of
          business. {props.modalData} facing structure brings wealth and
          prosperity to its occupants. The deity governing North is Kubera, God
          of wealth and prosperity.
        </p>
        <div>
          <Table responsive="sm">
            <tbody>
              {List.map((items) => {
                return (
                  <tr key={items}>
                    {items.map((item) => {
                      return <td key={item}>{item}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default MyModal
