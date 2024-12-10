import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Navbar extends Component {


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <div className="container-fluid">
          <img
            src="cute-panda-ai-generated-free-png.webp" 
            alt="Logo"
            width="30" 
            height="30" 
            className="d-inline-block align-text-top"
          />
  
    <Link className="navbar-brand" to="/"><h4>NewsPanda</h4></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
        
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
  style={{ "--bs-scroll-height": "100px" }}>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item"><Link className="nav-link" to="/business">business</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/entertainment">entertainment</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/general">general</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/health">health</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/science">science</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/sports">sports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/technology">technology</Link></li>
      </ul>
    </div>
  </div>
</nav>
      </div>
    )
  }
}

export default Navbar
