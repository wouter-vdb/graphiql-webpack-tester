import 'babel-polyfill';
import GraphiQL from 'graphiql';
import React from 'react';
import ReactDOM from 'react-dom';

// Render the app:
ReactDOM.render(
  <GraphiQL />,
  document.getElementById('app')
);
