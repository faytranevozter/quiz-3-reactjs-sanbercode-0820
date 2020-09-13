import React, { createRef, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/Authorization';
import Homepage from './Homepage';

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
      alert('username/password salah');
    }
  };
  return isLogin ? <Redirect to={Homepage} /> : (
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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
