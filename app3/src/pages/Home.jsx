import { Link } from "react-router";
import { useAuth } from "@hooks/Authprovider.jsx";
import { BASE_URL } from "@utils/network.js";

const Home = () => {
  const { isLogin, removeAuth, profileImg, setLogin } = useAuth();

  const imageUrl = profileImg
    ? `${BASE_URL}/uploads/${profileImg}?t=${Date.now()}`
    : "/img_01.jpg";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Team1</Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {!isLogin && (
              <>
                <li className="nav-item">
                  <button className="nav-login" type="button" 
                  onClick={() => {
                          console.log("clicked - before setLogin", setLogin);
                          setLogin();
                          console.log("clicked - after setLogin");
                          }}>로그인</button>
                </li>
              </>
            )}

            {isLogin && (
              <>
                <li className="nav-item">
                  <button className="nav-logout" type="button" onClick={removeAuth}>
                    로그아웃
                  </button>
                </li>
              </>
            )}
          </ul>

          <img
            src={imageUrl}
            className="border user_pt_nav mt-1 object-fit-cover rounded-circle"
            style={{ width: "40px", height: "40px" }}
            alt="profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Home;
