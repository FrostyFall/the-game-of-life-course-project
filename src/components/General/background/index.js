import { useEffect, useState } from "react";
import Star from "../star";

const Background = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      for (let i = 1; i <= 40; i++) {
        const start = Math.floor(Math.random() * 100) + 1;
        const end = Math.floor(Math.random() * 100) + 1;
        const scaleStart = Math.random() * 1;
        const scaleMid = Math.random() * 1;
        const scaleEnd = Math.random() * 1;
        const delay = Math.floor(Math.random() * 1500) + 500;

        const star = (
          <Star
            start={start}
            end={end}
            scaleStart={scaleStart}
            scaleMid={scaleMid}
            scaleEnd={scaleEnd}
            key={i}
          ></Star>
        );

        setTimeout(() => {
          setStars((prevState) => [...prevState, star]);
        }, delay * i);
      }
    };

    generateStars();
  }, []);

  return (
    <main>
      <div className='stars'>{stars}</div>
      {children}
    </main>
  );
};

export default Background;
