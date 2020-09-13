import React, { createRef, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/Authorization';

const Login = () => {
  const iUsername = createRef();
  const iPassword = createRef();
  const [isLogin, setIsLogin] = useContext(AuthContext);

  const doLogin = (e) => {
    e.preventDefault();
    // hardcode username and password
    if (iUsername.current.value === 'elfay' && iPassword.current.value === 'ganteng') {
      setIsLogin(true);
    } else {
      alert('Username/Password salah');
    }
  };
  return isLogin ? <Redirect to="/movie-list" /> : (
    <section>
      <div className="row jcc aic">
        <form onSubmit={doLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" ref={iUsername} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" ref={iPassword} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
