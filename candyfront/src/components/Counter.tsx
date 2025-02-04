import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Click!</button>
    </div>
  );
};
export default Counter;
