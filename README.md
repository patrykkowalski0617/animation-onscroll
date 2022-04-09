Example of usage:

    animationOnScroll({
        elementsSelector: ".element",       // css selector
        animationClassName: "anim",         // class name which will be added to element
        animationViewPortStartPoint: 50,    // optional. ViewPoint height where class name will added
        startPointInfo: true,               // optional. Show helpers on screen
        animOnload: false,                  // start script immediately, don't wait for scroll event
    });
