import Image from './Image.jsx';
import { useState, useEffect } from 'react';

export default function App() {

  // instructional / debugging
  const [imageWidth, setImageWidth] = useState();
  useEffect(() => {
    const handleResize = () =>
      setImageWidth(document.querySelector('img').offsetWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); }
  }, []);
  // devicePixelRatio - how many physical pixels does one css pixel correspond to?
  let devicePixelRatio = window.devicePixelRatio;

  // example
  return <>
    <p>
      Image width:<br />
      Css pixels: {imageWidth}<br />
      Device pixel ratio: {devicePixelRatio.toFixed(1)}<br />
      Physical pixels: {Math.round(window.devicePixelRatio * imageWidth)}
    </p>
    <Image src="cats/cat1" />
    <Image src="cats/cat2" />
    <Image src="cats/cat3" />
    <Image src="cats/cat4" />
    <Image src="dogs/dog1" />
    <Image src="dogs/dog2" />
    <Image src="dogs/dog3" />
    <Image src="dogs/dog4" />
  </>
}