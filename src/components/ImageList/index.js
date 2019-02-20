import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AddImage from './AddImage';
import Slider from './Slider';

import './ImageList.css';

class ImageList extends Component{

    state = {
        showAddModal: false,
        inputError: false,
        showRemoveModal: false,
        currentImageForDelete: '',
        showSlider: false,
        currentSlide: 0
    };

    componentWillMount(){
        if(this.props.match.params.name !== this.props.imageName && this.props.match !== undefined){
            this.props.getImages(this.props.match.params.name)
        }
        window.addEventListener('keydown', e => {
            if(e.key === 'Escape'){
                this.setState({
                    showSlider: false,
                    showAddModal: false,
                    showRemoveModal: false
                });
            }
        });
    }

    render(){
        const {images, catName} = this.props;

        const content = images.map((image, i) => {
                    const style = {backgroundImage: `url(http://api.programator.sk/images/208x170/${image.fullpath})`};
                    return (<div
                        className='image'
                        key={i}
                        onClick={(e) => this.displaySlider(true, i, e)}>
                        <a href="#" className="image__delete" onClick={(e) => this.displayRemoveModal(true, image.fullpath, e)}>
                            <svg className="image__delete-svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28px" height="28px">
                                <path fill="rgb(200, 3, 3)"
                                      d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                            </svg>
                        </a>
                        <div className="image__bgi" style={style}/>
                    </div>)
                }
            );

        const slider = this.props.images.length ?
            <Slider images={this.props.images}
                    currentSlide={this.state.currentSlide}
                    showSlider={this.state.showSlider}
                    displaySlider={this.displaySlider.bind(this)}
                    prevSlide={this.prevSlide.bind(this)}
                    nextSlide={this.nextSlide.bind(this)}/>
            :
            '';

        return(
            <div className="app_inner">
                <h1 className='images__title'>Fotogaléria</h1>
                <h2 className='images__subtitle'>
                    <Link to="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18px" height="12px">
                            <path fill="rgb(249, 249, 249)"
                                  d="M18.000,5.000 L3.830,5.000 L7.410,1.410 L6.000,-0.000 L-0.000,6.000 L6.000,12.000 L7.410,10.590 L3.830,7.000 L18.000,7.000 L18.000,5.000 Z"/>
                        </svg>
                        {catName ? catName : 'First select a category'}
                    </Link>
                </h2>

                <div className="images_wrap">
                    {content}
                    <div key={images.length} className='image image__new' onClick={(e) => this.displayAddModal(true, e)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="46px" height="42px">
                            <path fill="rgb(170, 170, 170)"
                                  d="M6.000,6.000 L6.000,-0.000 L10.000,-0.000 L10.000,6.000 L16.000,6.000 L16.000,10.000 L10.000,10.000 L10.000,16.000 L6.000,16.000 L6.000,10.000 L-0.000,10.000 L-0.000,6.000 L6.000,6.000 ZM12.000,18.000 L12.000,12.000 L18.000,12.000 L18.000,6.000 L32.000,6.000 L35.660,10.000 L42.000,10.000 C44.200,10.000 46.000,11.800 46.000,14.000 L46.000,38.000 C46.000,40.200 44.200,42.000 42.000,42.000 L10.000,42.000 C7.800,42.000 6.000,40.200 6.000,38.000 L6.000,18.000 L12.000,18.000 ZM26.000,36.000 C31.520,36.000 36.000,31.520 36.000,26.000 C36.000,20.480 31.520,16.000 26.000,16.000 C20.480,16.000 16.000,20.480 16.000,26.000 C16.000,31.520 20.480,36.000 26.000,36.000 ZM19.600,26.000 C19.600,29.540 22.460,32.400 26.000,32.400 C29.540,32.400 32.400,29.540 32.400,26.000 C32.400,22.460 29.540,19.600 26.000,19.600 C22.460,19.600 19.600,22.460 19.600,26.000 Z"/>
                        </svg>
                        <p>Pridať fotky</p>
                    </div>
                </div>
                <AddImage
                    showModal={this.state.showAddModal}
                    addImage={this.addImage.bind(this)}
                    displayAddModal={this.displayAddModal.bind(this)}/>

                <div className={this.state.showRemoveModal ? 'active remove-image' : 'remove-image'}>
                    <div className="remove-image__overlay" onClick={(e) => this.displayRemoveModal(false, '', e)}>
                    </div>
                    <div className="remove-image_inner">
                        <h2 className='remove-image__title'>Vymazať kategóriu?</h2>
                        <div className="remove-image__buttons-wrap">
                            <a href="#" className="remove-image__submit" onClick={this.submitRemoveHandler.bind(this)}>
                                Vymazať
                            </a>
                            <a href="#" className="remove-image__cancel" onClick={(e) => this.displayRemoveModal(false, '', e)}>
                                Zavrieť
                            </a>
                        </div>
                    </div>
                </div>

                {slider}
            </div>
        )
    }

    displayAddModal(display, e){
        e.preventDefault();
        this.setState({
            showAddModal: display
        })
    }

    addImage(images){
        this.props.addImage(images);
        this.setState({
            showAddModal: false
        })
    }

    displayRemoveModal(display, path, e){
        e.preventDefault();
        this.setState({
            showRemoveModal: display,
            currentImageForDelete: path
        });
    }

    submitRemoveHandler(e){
        e.preventDefault();
        this.props.removeImage(this.state.currentImageForDelete);
        this.setState({
            showRemoveModal: false
        })
    }

    displaySlider(display, i, e){
        if(!e.target.classList.contains("image__delete-svg") && !e.target.parentNode.classList.contains("image__delete-svg")){
            this.setState({
                showSlider: display,
                currentSlide: i
            })
        }
    }

    prevSlide(){
        this.setState({
            currentSlide: this.state.currentSlide - 1
        })
    }

    nextSlide(){
        this.setState({
            currentSlide: this.state.currentSlide + 1
        })
    }
}

export default ImageList;