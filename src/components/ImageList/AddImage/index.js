import React, { Component } from 'react';
import './AddImage.css';

class AddImage extends Component{

    state = {
        images: [],
        previews: []
    };

    componentDidMount(){
        let dropArea = document.querySelector('.drop-area');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        });
        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });
        function highlight(e) {
            dropArea.classList.add('active')
        }
        function unhighlight(e) {
            dropArea.classList.remove('active')
        }

        dropArea.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            const images = [...dt.files];

            let state = this.state.images;

            images.forEach((image, i) => {
                state.push(image);
                this.previewFile(image, i);
            });

            this.setState({
                images: state,
            });
        }, false);

    }

    render(){
        const dropArea = !this.state.images.length ?
            <div className="drop-area jcc" onDrop={this.handleDrop}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46px" height="42px">
                    <path fill="rgb(170, 170, 170)"
                          d="M6.000,6.000 L6.000,-0.000 L10.000,-0.000 L10.000,6.000 L16.000,6.000 L16.000,10.000 L10.000,10.000 L10.000,16.000 L6.000,16.000 L6.000,10.000 L-0.000,10.000 L-0.000,6.000 L6.000,6.000 ZM12.000,18.000 L12.000,12.000 L18.000,12.000 L18.000,6.000 L32.000,6.000 L35.660,10.000 L42.000,10.000 C44.200,10.000 46.000,11.800 46.000,14.000 L46.000,38.000 C46.000,40.200 44.200,42.000 42.000,42.000 L10.000,42.000 C7.800,42.000 6.000,40.200 6.000,38.000 L6.000,18.000 L12.000,18.000 ZM26.000,36.000 C31.520,36.000 36.000,31.520 36.000,26.000 C36.000,20.480 31.520,16.000 26.000,16.000 C20.480,16.000 16.000,20.480 16.000,26.000 C16.000,31.520 20.480,36.000 26.000,36.000 ZM19.600,26.000 C19.600,29.540 22.460,32.400 26.000,32.400 C29.540,32.400 32.400,29.540 32.400,26.000 C32.400,22.460 29.540,19.600 26.000,19.600 C22.460,19.600 19.600,22.460 19.600,26.000 Z"/>
                </svg>
                <h3>Sem presunte fotky</h3>
                <p>alebo</p>
                <input type="file" name="file" id="file"
                       className="drop-area__field" multiple
                       onChange={(e) => this.handleChange(e)}/>
                <label htmlFor="file" className='drop-area__label'>vyberte súbory</label>
            </div>
            :
            <div className="drop-area" onDrop={this.handleDrop}>
                {
                    this.state.images.map((image, i)=>{
                        return (
                            <div key={i} className='dropped-image'>
                                <img src={this.state.previews[i]} className="image-preview"/>
                                <div className="image-info">
                                    <p className='image-name'>name: {image.name}</p>
                                    <p className='image-size'>size: {image.size}b</p>
                                </div>
                                <div className="image-remove" onClick={this.removeImage.bind(this, i)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28px" height="28px">
                                        <path fill="rgb(200, 3, 3)"
                                              d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                                    </svg>
                                </div>
                            </div>
                        )
                    })
                }
                <input type="file" name="file" id="file"
                       className="drop-area__field" multiple
                       onChange={(e) => this.handleChange(e)}/>
                <label htmlFor="file" className='drop-area__label'>vyberte súbory</label>
            </div>;

        return (
        <div className={this.props.showModal ? 'active add-image' : 'add-image'}>
            <div className="add-image__overlay" onClick={(e) => this.props.displayAddModal(false, e)}>
            </div>
            <div className="add-image_inner">
                <a href="#" className="add-image__close" onClick={(e) => this.props.displayAddModal(false, e)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28px" height="28px">
                        <path fill="rgb(255, 255, 255)"
                              d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                    </svg>
                    zavrieť
                </a>
                <h2 className='add-image__title'>Pridať fotky</h2>
                <div className="drop-wrap">
                    {dropArea}
                </div>
                <a href="#" className="add-image__submit" onClick={this.submitAddHandler.bind(this)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px" height="14px">
                        <path fill="rgb(255, 255, 255)"
                              d="M14.000,8.000 L8.000,8.000 L8.000,14.000 L6.000,14.000 L6.000,8.000 L-0.000,8.000 L-0.000,6.000 L6.000,6.000 L6.000,-0.000 L8.000,-0.000 L8.000,6.000 L14.000,6.000 L14.000,8.000 Z"/>
                    </svg>
                    pridať
                </a>
            </div>
        </div>
        );

    }

    previewFile(image) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            let state = this.state.previews;
            state.push(reader.result);

            this.setState({
                previews: state
            });
        }
    }

    handleChange(e){
        const images = [...e.target.files];

        let state = this.state.images;

        images.forEach((image, i) => {
            state.push(image);
            this.previewFile(image, i);
        });

        this.setState({
            images: state,
        });
    }

    handleDrop(e){
        let dt = e.dataTransfer;
        const images = [...dt.files];

        let state = this.state.images;

        images.forEach((image, i) => {
            state.push(image);
            this.previewFile(image, i);
        });

        this.setState({
            images: state,
        });
    }

    removeImage(index){
        const images = this.state.images.filter((item, i) => {
            if(index !== i){
                return item
            }
        });

        const previews = this.state.previews.filter((item, i) => {
            if(index !== i){
                return item
            }
        });

        this.setState({
            images: images,
            previews: previews
        })
    }

    submitAddHandler(e){
        e.preventDefault();

        this.props.addImage(this.state.images);

        this.setState({
            images: [],
            previews: []
        })
    }

}

export default AddImage;