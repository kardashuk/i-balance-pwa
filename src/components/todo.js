import React, {Component} from 'react';
import * as Database from '../db';

class TodoInsert extends Component {
    state = {
        name: '',
        color: ''
    }
    subs = []

    addHero = async (event) => {
        event.preventDefault()
        const {name, color} = this.state;
        let type = 'todo';
        const db = await Database.get();
        db.collections.heroes.insert({type,name, color});
        this.setState({name: '', color: ''});
    }
    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleColorChange = (event) => {
        this.setState({color: event.target.value});
    }

    render() {
        return (
            <div id="insert-box" className="box">
                <h3>Add Todo</h3>
                <form onSubmit={this.addHero}>
                    <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                    <input type="text" placeholder="Color" value={this.state.color} onChange={this.handleColorChange}/>
                    <button type="submit">Insert a Hero</button>
                </form>
            </div>
        );
    }
}

export default TodoInsert;