"use strict";

const animationOnScroll = ({
  elementsSelector,
  animationClassName,
  animationViewPortStartPoint = 90,
  animOnload = true,
  startPointInfo = false,
}) => {
  if (startPointInfo) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div style="
        position: fixed; 
        top: ${animationViewPortStartPoint}vh; 
        z-index: 99999999;
        border-top: red solid 1px;"
      >
        ${animationClassName}
      </div>`
    );
  }

  const addAnimationCSSClass = (eventlHandler) => {
    const elements = document.querySelectorAll(
      `${elementsSelector}:not(.${animationClassName})`
    );
    const docTop = window.pageYOffset;
    const winH = window.innerHeight;
    const offsetTop = (element) => element.getBoundingClientRect().top + docTop;

    elements.forEach((element) => {
      if (
        offsetTop(element) <=
          docTop + (winH * animationViewPortStartPoint) / 100 &&
        offsetTop(element) + 200 > docTop
      ) {
        element.classList.add(animationClassName);
      }
    });

    if (elements.length === 0) {
      window.removeEventListener("scroll", eventlHandler);
    }
  };

  const eventThrottle = (() => {
    let timeoutId;
    return (callback) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback();
      }, 20);
    };
  })();

  const scrollHandler = () => {
    eventThrottle(() => {
      addAnimationCSSClass(scrollHandler);
    });
  };

  window.addEventListener("scroll", scrollHandler);

  if (!animOnload) return;
  addAnimationCSSClass();
};
