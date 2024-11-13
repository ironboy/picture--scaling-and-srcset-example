import Image from './Image.jsx';
import { useState, useEffect } from 'react';

// instructional / debugging
// generate css that tests the media resoultion query
let css = '';
for (let i = 0.1; i <= 5; i += 0.1) {

  css += `@media (min-resolution:${i.toFixed(1)}x){.resolution::after{content:'${i.toFixed(1)}'}}\n`;
}
const linkEl = document.createElement('link');
linkEl.setAttribute('rel', 'stylesheet');
linkEl.setAttribute('href', 'data:text/css;base64,' + btoa(css));
document.querySelector('head').append(linkEl);

export default function App() {

  // instructional / debugging
  const [imageWidth, setImageWidth] = useState();
  useEffect(() => {
    const handleResize = () =>
      setImageWidth(document.querySelector('picture').offsetWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); }
  }, []);

  // example
  return <>
    <p>
      Image width:<br />
      {imageWidth} css pixels.<br />
      {Math.round(window.devicePixelRatio * imageWidth)} physical pixels.
      <span className="resolution">Resolution media query:&nbsp;</span>
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