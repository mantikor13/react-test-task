import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import CatList from './components/CatList/';
import ImageList from './components/ImageList/';

class App extends Component {

    state = {
        cats: [
            {
                image: undefined,
                name: ""
            }
        ],
        bgi: {},
        currentCatName: '',
        currentCatPath: '',
        currentCatImages: [],
    };

    componentWillMount() {

        fetch('http://api.programator.sk/gallery')
            .then(response => response.json())
            .then(data => {

                let changeDefaultData = false;

                data.galleries.forEach((gall, i) => {

                    fetch(`http://api.programator.sk/gallery/` + gall.path)
                        .then(response => response.json())
                        .then(data => {

                            const numOfImages = data.images.length;

                            if(numOfImages !== 0){
                                fetch(`http://api.programator.sk/images/0x0/` + data.images[0].fullpath)
                                    .then((response) => {
                                        const newCat = {
                                            path: gall.path,
                                            name: gall.name,
                                            image: response.url,
                                            numOfImages: numOfImages
                                        };
                                        if(!changeDefaultData){
                                            this.setState({
                                                cats: [newCat],
                                            });
                                            changeDefaultData = true;
                                        }else{
                                            this.setState({
                                                cats: [...this.state.cats, newCat],
                                            });
                                        }
                                        if(!this.state.currentCatName){
                                            this.setState({
                                                bgi: {backgroundImage: `url(${newCat.image})`}
                                            })
                                        }
                                    })
                            }else{
                                let newCat = {
                                    path: gall.path,
                                    name: gall.name,
                                    image: undefined,
                                    numOfImages: 0
                                };
                                if(!changeDefaultData){
                                    this.setState({
                                        cats: [newCat],
                                    });
                                    changeDefaultData = true;
                                }else{
                                    this.setState({
                                        cats: [...this.state.cats, newCat],
                                    });
                                }
                                if(!this.state.currentCatName){
                                    this.setState({
                                        bgi: {backgroundImage: `url(${newCat.image})`}
                                    })
                                }
                            }
                        });

                });
            });
    }


    render() {
        return (
          <div className="App">

              <div className="app__bgi_wrap">
                  <div style={this.state.bgi} className="app__bgi"/>
              </div>

              <Router >
                  <div>
                      <Route exact path="/" render={() =>
                          <CatList
                              cats={this.state.cats}
                              changeBgi={this.changeBgi.bind(this)}
                              getImages={this.getImages.bind(this)}
                              addCat={this.addCat.bind(this)}
                              removeCat={this.removeCat.bind(this)}
                          />}
                      />
                      <Route path="/category/:name" render={(props) =>
                          <ImageList
                              {...props}
                              images={this.state.currentCatImages}
                              catName={this.state.currentCatName}
                              getImages={this.getImages.bind(this)}
                              addImage={this.addImage.bind(this)}
                              removeImage={this.removeImage.bind(this)}
                          />}
                      />
                  </div>
              </Router>

          </div>
        );
    }

    changeBgi(style) {
        this.setState({
            bgi: style
        })
    }

    getImages(path){

        fetch(`http://api.programator.sk/gallery/` + path)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    currentCatPath: data.gallery.path,
                    currentCatName: data.gallery.name,
                    currentCatImages: data.images,
                });

                if(data.images.length > 0){
                    this.setState({
                        bgi: {backgroundImage: `url(http://api.programator.sk/images/0x0/${data.images[0].fullpath})`}
                    })
                }

            });
    }

    addCat(name){
        let body = {
            "name": name
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
                this.setState({
                    cats: [...this.state.cats, {
                        name: name,
                        path: name,
                        image: undefined,
                        numOfImages: 0
                    }],
                })
            }
        })


    }

    removeCat(path){

        fetch('http://api.programator.sk/gallery/' + path, {
            method: 'DELETE',
        }).then(res => {

            if(res.status === 200){
                const state = this.state.cats.filter(function (item) {
                    return item.path !== path
                });
                this.setState({
                    cats: state
                })
            }

        })
    }

    removeImage(fullpath){

        fetch('http://api.programator.sk/gallery/' + fullpath, {
            method: 'DELETE',
        }).then(res => {

            if(res.status === 200){
                const images = this.state.currentCatImages.filter(function (image) {
                    return image.fullpath !== fullpath
                });
                this.setState({
                    currentCatImages: images
                });

                this.updateCat();
            }

        })
    }

    addImage(images){

        images.forEach((image) => {
            let formData = new FormData();
            formData.append('file', image);

            fetch('http://api.programator.sk/gallery/' + this.state.currentCatPath, {
                method: 'POST',
                body: formData
            }).then((res) => {
                if(res.status === 200){
                    this.getImages(this.state.currentCatPath);

                    this.updateCat();
                }
            });
        });

    }

    updateCat(){
        fetch(`http://api.programator.sk/gallery/` + this.state.currentCatName)
            .then(response => response.json())
            .then(data => {

                const cats = this.state.cats.map((cat) => {
                    if(cat.name === this.state.currentCatName){
                        cat.numOfImages = data.images.length;
                        cat.image = 'http://api.programator.sk/images/0x0/' + data.images[0].fullpath;

                    }
                    return cat
                });

                this.setState({
                    cats: cats
                });

            });
    }
}

export default App;
