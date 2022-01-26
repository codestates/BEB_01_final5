import "./Nav.css";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
function Nav({ isLogin }) {
  return (
    <div className="NavBar">
      <div className="NavBarInisde">
        <div className="NavBarInisdeContainer">
          <Link to="/" className="homeNav">
            KiFT
          </Link>
          <Link to="/market" className="nav">
            Market
          </Link>
          <Link to="/curated" className="nav">
            Curated
          </Link>

          <DropdownButton className="nav" id="dropdown-basic-button" title="Community">
            <Dropdown.Item href="/claim">Claim KiFToken</Dropdown.Item>
            <Dropdown.Item href="/create">Create NFT</Dropdown.Item>
            <Dropdown.Item href="https://app.uniswap.org/#/swap?outputCurrency=0x66595E934c056EF77c204A06Ea3FB8Bf6a92b5f6&use=v2">
              Trade Token
            </Dropdown.Item>
            <div className="SNSLogos">
              <div className="SNSLogo">d</div>
              <div className="SNSLogo">d</div>
              <div className="SNSLogo">d</div>
              <div className="SNSLogo">d</div>
              <div className="SNSLogo">d</div>
            </div>
          </DropdownButton>

          <Link to="/search" className="nav">
            Search
          </Link>

          {!isLogin ? (
            <Link to="/signin" className="nav">
              Sign in
            </Link>
          ) : (
            <Link to="/mypage" className="nav">
              <svg
                className="user-icon"
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="user-circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
                ></path>
              </svg>
              {/* son: 제가 아이콘 구해서 넣을게요! */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default Nav;
