import gsap from "gsap";

const pageClassName = document.body.getAttribute("class");

switch (pageClassName) {
    case "home":
        gsap.fromTo(".video-grid", 3, { scale: 1.1 }, { scale: 1 });
        break;
    case "about":
        gsap.fromTo(".about__wrap", 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 });
        break;
    //확장    
    default:
}


