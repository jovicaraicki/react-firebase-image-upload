import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Fetch from '../components/Fetch';
import Upload from '../components/Upload';

const AppRouter = () => (
    <BrowserRouter>
        <div>
        <Header />
            <Switch>
                <Route path='/' component={Fetch} exact={true} />
                <Route path='/upload' component={Upload} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;