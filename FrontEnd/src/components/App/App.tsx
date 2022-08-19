
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Style
import './style.scss';

//Interfaces
import { IRoute } from '../../router/IRoute';

//Other
import { routes } from '../../router/routes';


const App: React.FunctionComponent = () => {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    {
                        routes.map((route: IRoute, i: number) => (
                            <Route
                                key={i}
                                path={route.route}
                                element={<route.module/>}
                            />
                        ))
                    }
                </Routes>
            </Router>
        </div>
    );
};

export default App;