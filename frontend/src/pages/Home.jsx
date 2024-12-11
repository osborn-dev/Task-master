import { Link } from "react-router-dom"
import { FaRegCalendarAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
    <section className="heading">
      <h1>
        Hello "user", what do you need help with?
      </h1>
      <p>select an option below</p>
      <Link to='/mainpage' className="btn btn-reverse btn-block">
        <FaRegCalendarAlt /> Handle a task
      </Link>
    </section>
    </>
  )
}
export default Home