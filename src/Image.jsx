// Read more about the picture element and srcsets here:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
// https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/
// https://stackoverflow.com/questions/49174465/understanding-srcset-and-sizes-in-combination-with-hidpi-monitors

// Read more about the resolution media query
// https://developer.mozilla.org/en-US/docs/Web/CSS/resolution

export default function Image({ src }) {

  src = '/images/' + src;

  // screen resolutions (physical pixels per css pixel)
  let resolutions = [];
  for (let i = 2; i >= 2; i -= 0.5) { resolutions.push(i); }

  // the same widths that we scale to in our image scaler
  const widths = [200, 400, 600, 800, 1000, 1500, 2000];

  /*function closestImgWidth(width, resolution) {
    const minW = width * resolution;
    const _widths = [...widths];
    while (_widths[0] < minW && _widths.length > 1) { _widths.shift(); }
    return _widths[0];
  }*/

  function calculateSrcSet(resolution) {
    return widths.map(w => `${src}-w${w}.webp ${w * resolution}w`).join(', ');
  }

  return <picture>
    {resolutions.map((res, i) =>
      <source key={i} srcSet={calculateSrcSet(res)} />
    )}
    <img src={src + '-w' + widths.slice(-1) + '.webp'} />
  </picture>
}