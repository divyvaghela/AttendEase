import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      <div className="navbar-left">
        <h2>AttendEase Dashboard</h2>
      </div>

      <div className="navbar-right">

        <input
          type="text"
          placeholder="Search..."
          className="search-box"
        />

        <div className="notification">
          🔔
        </div>

        <div className="profile">
          <div className="avatar">
            D
          </div>

          <div>
            <h4>Divy</h4>
            <p>Administrator</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;