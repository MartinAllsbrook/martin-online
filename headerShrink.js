window.addEventListener("DOMContentLoaded", () => {
    const headerText = document.getElementById("header-text")

    const maxHeaderREM = 4.8;
    const minHeaderREM = 2;

    const maxLineHeight = 120;
    const minLineHeight = 100;

    const scaleRate = 0.03;
    const lineHeightScrollRate = 20 / (2.8/scaleRate);
    //      3 / sR = 20 / lHSR
    //      (3 / sR) * lHSR = 20
    //      lHSR = 20 / (3 / sR)

    let headerREM = maxHeaderREM;
    let lineHeight = 100;

    let lastScrollY = 0;
    let deltaScrollY = 0;
    let newScrollY = 0;

    window.addEventListener('scroll', () => {
        lastScrollY = newScrollY;
        newScrollY = window.scrollY;

        deltaScrollY = newScrollY - lastScrollY;

        headerREM -= (deltaScrollY * scaleRate);

        if (headerREM < minHeaderREM) {
            headerREM = minHeaderREM;
        } else if (headerREM > maxHeaderREM) {
            headerREM = maxHeaderREM;
        }

        lineHeight += (deltaScrollY * lineHeightScrollRate);

        if (lineHeight < minLineHeight) {
            lineHeight = minLineHeight;
        } else if (lineHeight > maxLineHeight) {
            lineHeight = maxLineHeight;
        }

        headerText.style.fontSize = headerREM + "rem";
        headerText.style.lineHeight = lineHeight + "%";
    }, false);
}, false);