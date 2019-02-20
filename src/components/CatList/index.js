import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './CatList.css';

class CatList extends Component{

    state = {
        showAddModal: false,
        showRemoveModal: false,
        newCatName: '',
        addCat: this.props.addCat,
        inputError: false,
        currentCatForDelete: '',
        removeCat: this.props.removeCat
    };

    componentDidMount(){
        window.addEventListener('keydown', e => {
            if(e.key === 'Escape'){
                this.setState({
                    showAddModal: false,
                    showRemoveModal: false
                });
            }
        });
    }

    render(){
        const {cats, changeBgi, getImages} = this.props;
        const catsContent = cats.map((cat, i) => {
                const style = {backgroundImage: `url(http://api.programator.sk/images/210x125/${cat.image})`};
                return (<div
                    className='cat'
                    key={i}
                    onMouseEnter={(e) => changeBgi(style, e)}
                    onClick={(e) => {getImages(cat.name, e); changeBgi(style, e)}}
                >
                    <Link to={"/category/" + cat.path}>
                        <div className="cat__bgi" style={style}/>
                        <div className="cat__text">
                            <h3 className='cat__title'>{cat.name}</h3>
                            <p className="cat__numOfImages">{cat.numOfImages} fotiek</p>
                        </div>
                        <a href="#" className="cat__delete" onClick={(e) => this.displayRemoveModal(true, cat.path, e)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28px" height="28px">
                                <path fill="rgb(200, 3, 3)"
                                      d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                            </svg>
                        </a>
                    </Link>
                </div>)
            }
        );

        return(
            <div className="app_inner">
                <h1 className='cats__title'>Fotogaléria</h1>
                <h2 className='cats__subtitle'>kategórie</h2>

                <div className="cats_wrap">
                    {catsContent}
                    <div className='cat cat__new' onClick={(e) => this.displayAddModal(true, e)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40px" height="40px">
                            <path fill="rgb(170, 170, 170)"
                                  d="M22.000,10.000 L18.000,10.000 L18.000,18.000 L10.000,18.000 L10.000,22.000 L18.000,22.000 L18.000,30.000 L22.000,30.000 L22.000,22.000 L30.000,22.000 L30.000,18.000 L22.000,18.000 L22.000,10.000 ZM20.000,-0.000 C8.960,-0.000 -0.000,8.960 -0.000,20.000 C-0.000,31.040 8.960,40.000 20.000,40.000 C31.040,40.000 40.000,31.040 40.000,20.000 C40.000,8.960 31.040,-0.000 20.000,-0.000 ZM20.000,36.000 C11.180,36.000 4.000,28.820 4.000,20.000 C4.000,11.180 11.180,4.000 20.000,4.000 C28.820,4.000 36.000,11.180 36.000,20.000 C36.000,28.820 28.820,36.000 20.000,36.000 Z"/>
                        </svg>
                        <p>Pridať kategóriu</p>
                    </div>
                </div>

                <div className={this.state.showAddModal ? 'active add-cat' : 'add-cat'}>
                    <div className="add-cat__overlay" onClick={(e) => this.displayAddModal(false, e)}/>
                    <div className="add-cat_inner">
                        <a href="#" className="add-cat__close" onClick={(e) => this.displayAddModal(false, e)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28px" height="28px">
                                <path fill="rgb(255, 255, 255)"
                                      d="M28.000,2.820 L25.180,-0.000 L14.000,11.180 L2.820,-0.000 L-0.000,2.820 L11.180,14.000 L-0.000,25.180 L2.820,28.000 L14.000,16.820 L25.180,28.000 L28.000,25.180 L16.820,14.000 L28.000,2.820 Z"/>
                            </svg>
                            zavrieť
                        </a>
                        <h2 className='add-cat__title'>Pridať kategóriu</h2>
                        <input id='add-cat-field' type="text"
                               className={this.state.inputError ? 'add-cat__field input-error' : 'add-cat__field'}
                               onChange={this.onChangeHandler.bind(this)}
                               onClick={() => this.setState({inputError: false})}/>
                        <label htmlFor="add-cat-field"
                               className={this.state.newCatName ? 'active' : ''}>
                            zadajte názov kategórie <span>(It should not include the symbol "/")</span>
                        </label>
                        <a href="#" className="add-cat__submit" onClick={this.submitAddHandler.bind(this)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14px" height="14px">
                                <path fill="rgb(255, 255, 255)"
                                      d="M14.000,8.000 L8.000,8.000 L8.000,14.000 L6.000,14.000 L6.000,8.000 L-0.000,8.000 L-0.000,6.000 L6.000,6.000 L6.000,-0.000 L8.000,-0.000 L8.000,6.000 L14.000,6.000 L14.000,8.000 Z"/>
                            </svg>
                            pridať
                        </a>
                        <div className="name-existing-error hide">
                            <p>Kategória s takýmto názvom už existuje</p>
                        </div>
                    </div>
                </div>

                <div className={this.state.showRemoveModal ? 'active remove-cat' : 'remove-cat'}>
                    <div className="remove-cat__overlay" onClick={(e) => this.displayRemoveModal(false, '', e)}>
                    </div>
                    <div className="remove-cat_inner">
                        <h2 className='remove-cat__title'>Vymazať kategóriu?</h2>
                        <div className="remove-cat__buttons-wrap">
                            <a href="#" className="remove-cat__submit" onClick={this.submitRemoveHandler.bind(this)}>
                                Vymazať
                            </a>
                            <a href="#" className="remove-cat__cancel" onClick={(e) => this.displayRemoveModal(false, '', e)}>
                                Zavrieť
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    displayAddModal(display, e){
        e.preventDefault();
        this.setState({
            showAddModal: display
        })
    }

    onChangeHandler(e){
        this.setState({
            newCatName: e.target.value
        })
    }

    submitAddHandler(e){
        e.preventDefault();

        if(this.state.newCatName.length > 0 && this.state.newCatName.indexOf('/') === -1){
            let body = {
                "name": this.state.newCatName
            };

            body = JSON.stringify(body);

            fetch('http://api.programator.sk/gallery', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: body
            }).then(res => {

                if(res.status === 201){
                    this.state.addCat(this.state.newCatName);
                    this.setState({
                        showAddModal: false,
                        newCatName: ''
                    });
                }else if(res.status === 409){
                    this.setState({
                        inputError: true
                    });
                    let errorMessage = document.querySelector(".name-existing-error");
                    function listener(){
                        errorMessage.classList.add("hide");
                        errorMessage.classList.remove("active");

                        errorMessage.removeEventListener("transitionend", listener);
                    }
                    errorMessage.addEventListener("transitionend", listener);
                    errorMessage.classList.remove("hide");
                    setTimeout(() => {
                        errorMessage.classList.add("active");
                    }, 0);
                }
            });
        }else{
            this.setState({
                inputError: true
            })
        }
    }

    displayRemoveModal(display, path, e){
        e.preventDefault();
        this.setState({
            showRemoveModal: display,
            currentCatForDelete: path
        });
        //console.log(path);
    }

    submitRemoveHandler(e){
        e.preventDefault();
        this.state.removeCat(this.state.currentCatForDelete);
        this.setState({
            showRemoveModal: false
        })
    }
}

export default CatList;