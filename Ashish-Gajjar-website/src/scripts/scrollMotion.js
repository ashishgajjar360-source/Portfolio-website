export function setupHorizontalScroll() {
  const scroller = document.querySelector("[data-horizontal-scroller]");

  if (!scroller) {
    return;
  }

  const viewport = scroller.querySelector("[data-horizontal-scroll-viewport]");
  const track = scroller.querySelector(".scroller__track");
  const group = scroller.querySelector(".scroller__group");

  if (!viewport || !track || !group) {
    return;
  }

  let rafId = 0;
  let loopWidth = 0;

  const update = () => {
    rafId = 0;

    loopWidth = group.getBoundingClientRect().width;

    if (!loopWidth) {
      return;
    }

    const currentScrollLeft = viewport.scrollLeft;

    if (currentScrollLeft <= loopWidth * 0.5) {
      viewport.scrollLeft = currentScrollLeft + loopWidth;
    } else if (currentScrollLeft >= loopWidth * 1.5) {
      viewport.scrollLeft = currentScrollLeft - loopWidth;
    }
  };

  const requestUpdate = () => {
    if (!rafId) {
      rafId = window.requestAnimationFrame(update);
    }
  };

  const onWheel = (event) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (!delta) {
      return;
    }

    event.preventDefault();
    viewport.scrollLeft += delta;
    requestUpdate();
  };

  const onScroll = () => {
    requestUpdate();
  };

  window.requestAnimationFrame(() => {
    loopWidth = group.getBoundingClientRect().width;
    if (loopWidth) {
      viewport.scrollLeft = loopWidth;
    }
    update();
  });

  viewport.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", requestUpdate);
}
