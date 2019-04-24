import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items:[],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id : nextItemId,
      description : description,
      sessionsCompleted : 0,
      isCompleted : false,
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items : prevState.items.concat([newItem]),
      nextItemId : prevState.nextItemId + 1,
    })));
  }

  clearCompletedItems() {
    // TODO 7
    const result = this.state.items.filter(item => !item.isCompleted);
    this.setState(
      {items : result,
      areItemsMarkedAsCompleted : false}
    );
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    var temp = this.state.items;
    for (var key in Object.keys(temp)) {
      if (temp[key].id === itemId) {
        temp[key].sessionsCompleted += 1;
      }
    }
    this.setState (
        {items : temp}
    );
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    var temp = this.state.items;
    for (var key in Object.keys(temp)) {
      if (temp[key].id === itemId) {
        temp[key].isCompleted = !temp[key].isCompleted;
      }
    }
    var completed = false;
    for (var key2 in Object.keys(temp)) {
        completed = completed || temp[key2].isCompleted;
    }
    this.setState (
        {items : temp,
        areItemsMarkedAsCompleted : completed,}
    );
  }

  startSession(id) {
    // TODO 4
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id,
    })
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {/* TODO 4 */}
            {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
              key={itemIdRunning}
            />}
            <div className="items-container">
            {Object.keys(items).length === 0 ? <EmptyState />:
            /* TODO 3:  display todo items */
            items.map((item) => (<TodoItem description = {item.description}
                                            sessionsCompleted = {item.sessionsCompleted}
                                            isCompleted = {item.isCompleted}
                                            startSession = {() => this.startSession(item.id)}
                                            toggleIsCompleted = {() => this.toggleItemIsCompleted(item.id)}
                                            key={item.id}/>))}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
