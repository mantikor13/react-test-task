import React, { Component } from 'react';

import './Slider.css';

class Slider extends Component{

    state = {
        isAnimationRun: false
    };

    componentDidMount(){
        window.addEventListener('keydown', e => {
            if(this.props.showSlider && !this.state.isAnimationRun){
                if(e.key === 'ArrowRight'){
                    this.nextSlide.call(this)
                }else if(e.key === 'ArrowLeft'){
                    this.prevSlide.call(this)
                }
            }
        });
    }

    render(){
        return(
            <div className={this.props.showSlider ? 'slider_wrap active' : 'slider_wrap'}>
                <div className='slider__overlay' onClick={(e) => this.props.displaySlider(false, this.props.currentSlide, e)}/>
                <div className='slider'>
                    <div className="slider__control left" onClick={!this.state.isAnimationRun ? () => this.prevSlide.call(this) : ''}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15px" height="24px">
                            <path opacity="0.502" fill="rgb(249, 249, 249)"
                                  d="M12.157,24.000 L15.013,21.180 L5.736,12.000 L15.013,2.820 L12.157,-0.000 L0.003,12.000 L12.157,24.000 Z"/>
                        </svg>
                    </div>
                    <div className="slider_inner">
                        <div className="slider__slide slider__slide-preload" style={this.isPrevSlide.call(this)}/>
                        <div className="slider__slide slider__slide-current" style={{backgroundImage: `url(http://api.programator.sk/images/575x416/${this.props.images[this.props.currentSlide].fullpath})`}}/>
                        <div className="slider__slide slider__slide-preload" style={this.isNextSlide.call(this)}/>
                    </div>
                    <div className="slider__control right" onClick={!this.state.isAnimationRun ? () => this.nextSlide.call(this) : ''}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16px" height="24px">
                            <path fill="rgb(249, 249, 249)"
                                  d="M3.775,-0.000 L0.924,2.820 L10.182,12.000 L0.924,21.180 L3.775,24.000 L15.903,12.000 L3.775,-0.000 Z"/>
                        </svg>
                    </div>
                    <a href="#" className="slider__close" onClick={(e) => this.props.displaySlider(false, this.props.currentSlide, e)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28px" height="28px">
                            <path fill="rgb(255, 255, 255)"
                                  d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                        </svg>
                        zavrieť
                    </a>
                </div>
            </div>
        )
    }

    prevSlide(){
        if(this.props.currentSlide !== 0){

            this.setState({
                isAnimationRun: true
            });

            let slider = document.querySelector(".slider_inner");
            let slide = document.querySelector(".slider__slide-current");

            function animationEnd() {
                slide.removeEventListener("transitionend", animationEndBind);

                slider.classList.remove("prepare-to-show");
                slide.classList.remove("prepare-to-show");

                slide.classList.remove("show-next-transition");
                slider.classList.remove("show-next-transition");

                setTimeout(() => {
                    slide.classList.remove("show-next");
                    slider.classList.remove("show-next");

                    this.setState({
                        isAnimationRun: false
                    });
                }, 0);
            }

            let animationEndBind = animationEnd.bind(this);

            function afterSlide(){
                slide.removeEventListener("transitionend", afterSlideBind);
                this.props.prevSlide();

                slide.classList.remove("slide-transition");
                slide.classList.remove("slide-to-left");

                slider.classList.add("prepare-to-show");
                slide.classList.add("prepare-to-show");

                setTimeout(() => {
                    slide.classList.add("show-next-transition");
                    slider.classList.add("show-next-transition");
                }, 0);

                setTimeout(() => {
                    slide.classList.add("show-next");
                    slider.classList.add("show-next");
                }, 5);

                slide.addEventListener("transitionend", animationEndBind)
            }

            let afterSlideBind = afterSlide.bind(this);

            slide.addEventListener("transitionend", afterSlideBind);

            slide.classList.add("slide-transition");
            setTimeout(() => {
                slide.classList.add("slide-to-left");
            }, 0);
        }
    }

    nextSlide(){
        if(this.props.currentSlide !== this.props.images.length - 1){

            this.setState({
                isAnimationRun: true
            });

            let slider = document.querySelector(".slider_inner");
            let slide = document.querySelector(".slider__slide-current");

            function animationEnd() {
                slide.removeEventListener("transitionend", animationEndBind);

                slider.classList.remove("prepare-to-show");
                slide.classList.remove("prepare-to-show");

                slide.classList.remove("show-next-transition");
                slider.classList.remove("show-next-transition");

                setTimeout(() => {
                    slide.classList.remove("show-next");
                    slider.classList.remove("show-next");

                    this.setState({
                        isAnimationRun: false
                    });
                }, 0);
            }

            let animationEndBind = animationEnd.bind(this);

            function afterSlide(){
                slide.removeEventListener("transitionend", afterSlideBind);
                this.props.nextSlide();

                slide.classList.remove("slide-transition");
                slide.classList.remove("slide-to-right");

                slider.classList.add("prepare-to-show");
                slide.classList.add("prepare-to-show");

                setTimeout(() => {
                    slide.classList.add("show-next-transition");
                    slider.classList.add("show-next-transition");
                }, 0);

                setTimeout(() => {
                    slide.classList.add("show-next");
                    slider.classList.add("show-next");
                }, 5);

                slide.addEventListener("transitionend", animationEndBind)
            }

            let afterSlideBind = afterSlide.bind(this);

            slide.addEventListener("transitionend", afterSlideBind);

            slide.classList.add("slide-transition");
            setTimeout(() => {
                slide.classList.add("slide-to-right");
            }, 0);
        }
    }

    isPrevSlide(){
        if(this.props.currentSlide > 0){
            return {backgroundImage: `url(http://api.programator.sk/images/575x416/${this.props.images[this.props.currentSlide - 1].fullpath})`}
        }else{
            return undefined;
        }
    }

    isNextSlide(){
        if(this.props.currentSlide < this.props.images.length - 1){
            return {backgroundImage: `url(http://api.programator.sk/images/575x416/${this.props.images[this.props.currentSlide + 1].fullpath})`}
        }else{
            return undefined;
        }
    }

}

export default Slider