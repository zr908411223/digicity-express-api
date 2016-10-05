import React from 'react';
import{ Router , Route , browserHistory , IndexRoute} from 'react-router';

import PostList from './components/ui/PostList.js';
import App from './components/ui/App.js';

import NewPost from './components/ui/NewPost.js';

class Routes extends React.Component {
  render () {
    return(
      <Router history={browserHistory}>
        <Route path = '/' component={ App }>
          <IndexRoute component = { PostList } />
          <Route path='/write' component={ NewPost } />
        </Route>
      </Router>
    )
  }
}

export default Routes;
