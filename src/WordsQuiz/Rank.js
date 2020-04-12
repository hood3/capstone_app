import React from 'react';
import { isAuth } from '../RegisterLogin/helpers';

const Rank = ({ name, score }) => {
  return (
    <div>
      <div className="scores">
        {`Welcome ${isAuth().name}!!, your current score is: `}
      </div>
      <div className="scores">
        {score}
      </div>
    </div>
  );
}

export default Rank;