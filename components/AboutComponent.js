import React, { Component } from "react";
import { LEADERS } from "../shared/leaders";
import { Text, FlatList } from "react-native";
import { Card, ListItem, Title } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History() {
  return (
    <Card title="Our History">
      <Text>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us. The restaurant traces its
        humble beginnings to The Frying Pan, a successful chain started by our
        CEO, Mr. Peter Pan, that featured for the first time the world's best
        cuisines in a pan.
      </Text>
    </Card>
  );
}
class About extends Component {
  
  static navigationOptions = {
    title: "About"
  };

  render() {
    const renderLeadersItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.designation}
          subtitle={item.description}
          leftAvatar={{ source: {uri: baseUrl + item.image}}}
        />
      );
    };
    return (
      <ScrollView>
        <History />
        <Card title="Corporate Leadership">
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={renderLeadersItem}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
