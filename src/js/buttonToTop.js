export class ButtonToTop {
    constructor(buttonToTopEl) {
        this.buttonToTop = buttonToTopEl;
    };

scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
   this.buttonToTop.style.display = "block";
  } else {
  this.buttonToTop.style.display = "none";
  }
    };
    
  topFunction() {
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
    
    // or another option 
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
}