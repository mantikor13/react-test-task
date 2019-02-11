import React, { Component } from 'react';

import './Slider.css';

class Slider extends Component{

    render(){
        return(
            <div className={this.props.showSlider ? 'slider active' : 'slider'}>
                <div className='slider__overlay' onClick={() => this.props.displaySlider(false, this.props.currentSlide)}/>
                <div className='slider_inner'>
                    <div className="slider__control left" onClick={this.props.prevSlide.bind(this)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15px" height="24px">
                            <path opacity="0.502" fill="rgb(249, 249, 249)"
                                  d="M12.157,24.000 L15.013,21.180 L5.736,12.000 L15.013,2.820 L12.157,-0.000 L0.003,12.000 L12.157,24.000 Z"/>
                        </svg>
                    </div>
                    <div className="slider__slide" style={{backgroundImage: `url(http://api.programator.sk/images/0x0/${this.props.images[this.props.currentSlide].fullpath})`}}/>
                    <div className="slider__control right" onClick={this.props.nextSlide.bind(this)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16px" height="24px">
                            <path fill="rgb(249, 249, 249)"
                                  d="M3.775,-0.000 L0.924,2.820 L10.182,12.000 L0.924,21.180 L3.775,24.000 L15.903,12.000 L3.775,-0.000 Z"/>
                        </svg>
                    </div>
                    <a href="#" className="slider__close" onClick={() => this.props.displaySlider(false, this.props.currentSlide)}>
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

}

export default Slider