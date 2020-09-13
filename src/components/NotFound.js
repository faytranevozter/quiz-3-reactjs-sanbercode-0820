import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation()
  return (
    <section>
      <div className="row jcc tac">
        <strong>:( Sorry, there's nothing on <code style={{}}>{location.pathname}</code></strong>
      </div>
    </section>
  );
};

export default NotFound;
