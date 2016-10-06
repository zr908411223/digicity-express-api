import React from 'react';
import{ Router , Route , browserHistory , IndexRoute} from 'react-router';

import PostList from './components/ui/PostList.js';
import App from './components/ui/App.js';

import NewPost from './components/ui/NewPost.js';
import ShowPost from './components/ui/ShowPost.js';


class Routes extends React.Component {
  render () {
    return(
      <Router history={browserHistory}>
        <Route path = '/' component={ App }>
          <IndexRoute component = { PostList } />
          <Route path='/write' component={ NewPost } />
          <Route path='/post/:id' component={ ShowPost } />
        </Route>
      </Router>
    )
  }
}

export default Routes;
