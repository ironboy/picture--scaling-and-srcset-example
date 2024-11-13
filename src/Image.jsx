export default function Image({ src }) {
  // Render a one pix transparent gif until we have calculated the correct image to use
  return <img className="scaled-img" data-src={src} onLoad={sourceChooser}
    src="data: image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
}

// available image widths (same as the ones we use in the image scaler)
const widths = [200, 400, 600, 800, 1000, 1500, 2000];

// Note: This JS is very close to what picture and srcset functionality does
// (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
// but gives us a more fine-grained control!

function sourceChooser() {
  // get all images with the class "scaled-img"
  // check their rendered sizes and determine the correct image src to use
  for (let imgEl of [...document.querySelectorAll('.scaled-img')]) {
    const exactWidth = imgEl.offsetWidth * window.devicePixelRatio;
    const widthToUse = widths.find(w => w >= exactWidth);
    // set the correct source
    let baseSrc = imgEl.getAttribute('data-src');
    let newSrc = '/images/' + baseSrc + '-w' + widthToUse + '.webp';
    let oldSrc = imgEl.getAttribute('src');
    let oldSrcWidth = +(imgEl.getAttribute('data-src-width') || 0);
    if (oldSrc !== newSrc && oldSrcWidth < widthToUse) {
      imgEl.setAttribute('src', newSrc);
      imgEl.setAttribute('data-src-width', widthToUse)
      console.log('Using width', widthToUse, 'for', baseSrc);
    }
  }
}

window.addEventListener('resize', sourceChooser);