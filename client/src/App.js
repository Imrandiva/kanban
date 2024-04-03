import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import KanbanBoard from './components/kanban-board/index.js';
import WeatherCard from './components/card/card.js';





class App extends Component {
  render() {
    return (
      <div>
        {/* <WeatherCard/> */}
        <KanbanBoard/>
      </div>
    );
  }
}

export default App;
