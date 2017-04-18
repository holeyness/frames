import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom'

import { App } from './components/App';
import { Home } from './components/Home';
import { Discover } from './components/Discover';
import { Upload } from "./components/Upload";
import { Watch } from "./components/Watch";
import { Hist } from './components/Hist';
import startupHook from "./ts/startup-hooks";

const sidebarRoutes = [
    {
        title: 'Discover',
        path: '/',
        exact: true,
        component: Discover,
        show: true
    },
    {
        title: 'Watch',
        path: '/watch/*',
        exact: true,
        component: Watch,
        show: false
    },
    {
        title: 'Upload',
        path: '/upload',
        exact: false,
        component: Upload,
        show: true
    },
    {
        title: 'History',
        path: '/history',
        exact: false,
        component: Hist,
        show: true
    }
]

class Root extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%'
            }}>
                <Router>
                    <App routes={sidebarRoutes}>
                        <Switch>
                            {sidebarRoutes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact} component={route.component} />
                            ))}
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </App>
                </Router>
            </div>
        );
    }
}

// make sure all the directories we rely on to be there really exist.
startupHook();

ReactDOM.render(<Root/>, document.getElementById('react-content'));
