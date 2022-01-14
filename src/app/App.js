import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal'

class App extends Component{
    constructor() {
        super();
        this.state = {
            nickname: '',
            name: '',
            photo: '',
            desc: '',
            _id: '',
            heroes: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.addHeroe = this.addHeroe.bind(this);
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }

    fetchHeroes(){
        fetch('/api/heroes')
            .then(res => res.json())
            .then(data =>{
                this.setState({heroes: data});
                console.log(this.state.heroes);
            })
    }

    addHeroe(e){
        e.preventDefault();
        fetch('/api/heroes',{
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                nickname: this.state.nickname,
                photo: this.state.photo,
                description: this.state.desc
              }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(data => {
                console.log(data);
                window.M.toast({html: 'Heroe Saved'});
                this.setState({nickname: '', name: '', photo: '', desc: ''});
                this.fetchTasks();
            })
            .catch(err => console.error(err));
    }

    editHeroe(id){
        fetch(`/api/heroes/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.name,
                    nickname: data.nickname,
                    photo: data.photo,
                    desc: data.desc,
                    _id: data._id
                });
            });
    }
    componentDidMount(){
        this.fetchHeroes();
    }

    render() {
        return(
            <div className="container">
                
                <div className="row">
                    <div className='col s8'>
                        <h1>Marvel's Heroes</h1>
                    </div>
                    <div className="col s2 offset-s2">
                        <a to="#" className="btn-floating btn-large waves-effect waves-light red"><i className="medium material-icons">add</i></a>
                    </div>
                </div>
                <div className="col s10 offset-s1">
                    <textarea className='materialize-textarea'></textarea>
                </div>
                <div className="col s8 offset-s2">
                {
                    this.state.heroes.map(heroe => {
                        return(
                            <ul className="collection" key={heroe._id}>            
                                    <li className='collection-item avatar'>
                                        <img className="circle responsive-img" src={heroe.photo}/>
                                        <span className="title">{heroe.nickname}</span>
                                        <p>{heroe.name}</p>
                                        <a to="_blank" className="secondary-content"><i className="material-icons">mode_edit</i></a>       
                                    </li>
                            </ul>
                        )
                    })
                }
                </div>
                <div>
                    <Modal
                        estado = {this.state.estadoModal}
                        cambiarEstado = {this.state.cambiarEstadoModal}
                    >
                        <form onSubmit={this.addHeroe}>
                            <div className='row'>
                                <div className='input-field col s6'>
                                    <input
                                        name="name"
                                        placeholder='Original Name'
                                        id="original_name"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='original_name'></label>
                                </div>
                                <div className='input-field col s6'>
                                    <input
                                        name="nickname"
                                        placeholder='AKA'
                                        id="aka"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='aka'></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        name="photo"
                                        placeholder="Image URL"
                                        id="img"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="img"></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        name="desc"
                                        placeholder="Description"
                                        id="desc"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="description"></label>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light red" type="submit">Save Changes</button>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default App;

const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;