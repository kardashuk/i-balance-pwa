import React from 'react';
import Protected from './auth/protected';
import UserLayout from './auth/user-layout';
import * as Database from '../db';
import HeroInsert from './hero';
import TodoInsert from './todo';

export default class HeroList extends React.Component {
    state = {
        todos: [],
        heroes: [],
        loading: true
    };

    subs = [];

    async componentDidMount() {
        const db = await Database.get();

        const sub = db.heroes.find({type:{$eq:'hero'}}).where({name:{$eq:'h4'}}).sort({name: 1}).$.subscribe(heroes => {
            if (!heroes) {
                return;
            }
            console.log('reload heroes-list ');
            console.dir(heroes);
            this.setState({heroes, loading: false});
        });
        this.subs.push(sub);

        const sub2 = db.heroes.find({type:{$ne:'hero'}}).sort({name: 1}).$.subscribe(todos => {
            if (!todos) {
                return;
            }
            console.log('reload todos-list ');
            console.dir(todos);
            this.setState({todos, loading: false});
        });
        this.subs.push(sub2);
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    deleteHero = async (hero) => {
        console.log('delete hero:');
        console.dir(hero);
    }

    editHero = async (hero) => {
        console.log('edit hero:');
        console.dir(hero);
    }
    renderActions(){
        return null;
    }
    render() {
        const {heroes, todos, loading} = this.state
        return (
            <Protected>
                <UserLayout>

                    <div id="list-box" className="box">
                        <h3>Heroes</h3>
                        <ul id="heroes-list">
                            {loading && <span>Loading...</span>}
                            {!loading && heroes.length === 0 && <span>No heroes</span>}
                            {heroes.map(hero => {
                                return (
                                    <li key={hero.name}>
                                        <div className="color-box" style={{
                                            background: hero.color
                                        }}></div>
                                        <span className="name">
                                    {hero.name}
                                </span>
                                        {this.renderActions()}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <HeroInsert/>

                    <div id="list-box" className="box">
                        <h3>Heroes</h3>
                        <ul id="heroes-list">
                            {loading && <span>Loading...</span>}
                            {!loading && todos.length === 0 && <span>No todos</span>}
                            {todos.map(hero => {
                                return (
                                    <li key={hero.name}>
                                        <div className="color-box" style={{
                                            background: hero.color
                                        }}></div>
                                        <span className="name">
                                    {hero.name}
                                </span>
                                        {this.renderActions()}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <TodoInsert/>
                </UserLayout>
            </Protected>
        )
    }
};
