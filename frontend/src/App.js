import React, { Component, StyleSheet } from 'react';
import { Route, Link } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.css';
import './App.css';
import PostDetail from './components/PostDetail';
import PostEditCreate from './components/PostEditCreate';
import Root from './components/Root';


export default class App extends Component {
    /*componentDidMount() {
      console.log("mounted")
    }*/
    render() {
        return (
            <div className="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">
                                Readable App
                            </Link>
                        </div>
                        
                        <nav className='collapse navbar-collapse' >
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to="/post/create/new">
                                        New Entry
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </nav>

                <div className="container">
                    <Route exact path='/' component={Root} />
                    <Route exact path='/post/edit/:postId' component={PostEditCreate} />
                    <Route exact path='/post/create/new' component={PostEditCreate} />
                    <Route exact path='/:categoryPath' component={Root} />
                    <Route exact path='/:categoryPath/:postId' component={PostDetail} />
                </div>
            </div>
        );
    }
}
