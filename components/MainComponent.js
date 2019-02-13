import React, {Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';


class Main extends Component {
    Constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    render() {
        return(
            <Menu dishes={this.state.dishes} />
        );
    }
}

export default Main;