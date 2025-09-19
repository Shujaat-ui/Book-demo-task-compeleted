import { useEffect, useState } from "react";
import './HeaderFooter.css';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <footer className="app-footer">
      © {currentTime.getFullYear()} Book Management App | {currentTime.toLocaleTimeString()}
    </footer>
  );
}
