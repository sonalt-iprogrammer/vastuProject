import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  let navigate = useNavigate()

  const onCardOneClickHandler = () => {
    navigate('/vastuscore')
  }
  const onCardTwoClickHandler = () => {
    navigate('/vastuscorecheck')
  }

  return (
    <div className="container myCont">
      <div className="row MainRow">
      <h5 className='heading'>Pick The Ideal Tool For You</h5>
        <div className="col-sm-6 mb-3">
         
          <div className="card" onClick={onCardOneClickHandler}>
            <div className="card-body">
              <div className="row RowInside">
                <div className="col-sm-4">
                  <img src="assets/images/stock-photo-chiang-mai-thailand-dec-a-man-holds-apple-iphone-with-ios-compass-application-on-the-354697493 1.png" />
                </div>
                <div className="col-sm-8">
                  <h5 className="vaastu-title text-body mb-0">Compass Tool</h5>
                  <small className="mb-2">Output Time :1 min</small>
                  <p className="card-text">
                    Point in the direction of specific rooms to know their
                    suitability according to Vaastu guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card" onClick={onCardTwoClickHandler}>
            <div className="card-body">
              <div className="row ">
                <div className="col-sm-4">
                  <img src="assets/images/stock-photo-house-object-and-colorful-wooden-blocks-with-direction-initial-alphabet-1789893335 1.png" />
                </div>
                <div className="col-sm-8">
                  <h5 className="vaastu-title text-body mb-0">
                    Vaastu Score Check
                  </h5>
                  <small className="mb-2">Ideal for planning stage</small>
                  <p className="card-text">
                    Get an instant Vaastu score by entering the locations of all
                    the rooms in your house.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
