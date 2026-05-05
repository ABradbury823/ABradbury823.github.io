const template = document.createElement("template");
template.innerHTML = `
<style>

.container{
    display: flex;
    flex-direction: column;
}

.project{
    border-radius: 10px;
    overflow: hidden;
    transition: height 0.4s ease, opacity 0.4s ease;
}

.hidden{
    opacity: 0;
}

.shown{
    opacity: 1;
}

.project-btn{
    margin: 1rem;
    width: 150px;
    height: 45px;
    font-family: 'Lexend', Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.33rem;
    font-variant-caps: all-small-caps;
    font-weight: bolder;
    color: #eee;
    background-color: transparent;
    border-radius: 2px;
    border: 3px solid rgb(55,55,55);
    align-self: center;
    cursor: pointer;
}

.project-btn:hover { background-color: rgb(150, 25, 25); }
.project-btn:active { background-color: rgb(150, 25, 25); }

hr{
    border-top:1px solid #727272;
}

.project-description{
    margin: 1rem 0;
    line-height: 1.5rem;
    display: inline-block;
    max-width: 35rem;
}
</style>

<div class="container">
    <div class="project">
        <hr>
        <slot name="proj-desc" class="project-description">
            <!-- Project description goes here --!>
        </slot>
    </div>
    <button class="project-btn">Show More</button>
</div>
`;

class ProjDesc extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback(){
        this.content = this.shadowRoot.querySelector(".project");
        this.button = this.shadowRoot.querySelector(".project-btn");

        this.content.style.height = "0px";
        this.content.classList.add("hidden");

        //button event
        this.button.onclick = e => this.toggleVisible();

        this.render();
    }

    disconnectedCallback(){
        this.button.onclick = null;
    }

    render(){
        if(this.content.classList.contains("hidden")) {
            this.button.innerHTML = "Show More&ensp;&#x2193;";

        } else {
            this.button.innerHTML = "Show Less&ensp;&#x2191;";
        }
    }

    toggleVisible(){
        // expanding
        if(this.content.classList.contains("hidden")){
            this.content.classList.replace("hidden", "shown");
            this.content.style.height = this.content.scrollHeight + "px";

            this.content.addEventListener("transitionend", () => {
                this.content.style.height = "auto";
            }, { once: true });
        } 
        // collapsing
        else {
            this.content.style.height = this.content.scrollHeight + "px";
            this.content.getBoundingClientRect(); // force reflow to ensure transition starts
            this.content.style.height = "0px";
            this.content.classList.replace("shown", "hidden");
        }

        this.render();
    }

} //end class

customElements.define("proj-desc", ProjDesc);

//project description HTML
/* <div class="project" id="first-project">
    <hr>
    <p class="project-description">
        [INSERT TEXT HERE]
    </p>
    <hr>
</div>
<button class="project-btn" id="btn">Show More</button> */