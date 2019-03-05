import React,{ Component } from 'react';
import { View,Text,ScrollView, FlatList,Modal, Button,StyleSheet} from 'react-native';
import { Card,Icon,Rating,Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites : state.favorites
    }
}


const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props){
    const dish = props.dish;

    if ( dish != null){

        return(
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}
                >
                <Text style={{margin: 10}}>
                    {dish.description}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => props.showModal() }
                    />
                    </View>
                </Card>
        );
    }
    else {
        return( <View></View>);
    }
}
function RenderComments(props) {
    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
       );
    }
    return(
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );

}
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    
    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(values) {
        this.toggleModal();
        this.props.postComment(this.dishId, values.state.rating, values.state.author, values.state.comment);
    
      }
    
    

    render(){
        const dishId = this.props.navigation.getParam('dishId','')
        return(
            <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.some(el => el === dishId)}
            onPress={() => this.markFavorite(dishId)} 
            showModal={() => this.toggleModal()}
            postComment={() => this.handleComment(dishId)}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal animationType = {"fade"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                    <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={60}
                    showRating
                   startingValue={this.state.rating}
                    onFinishRating={(rating)=> this.setState({rating : rating})}
                        />
                      <Input
                       placeholder='  Author'
                       leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                       onChangeText={(author) => this.setState({author: author})}
                        /> 
                         <Input
                       placeholder='  Comment'
                       leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                       onChangeText={(comment) => this.setState({comment: comment})}
                        />  
                        
                        <Button 
                            onPress={() => this.handleComment(dishId)}
                            color="#512DA8"
                            title="Submit" 
                            />
                            <Button 
                            onPress = {() =>{this.toggleModal();}}
                            color="#808080"
                            title="Cancel" 
                            />
                    </View>
                </Modal>
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
   
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20

    },
    modalText: {
        fontSize: 18,
        margin: 10
    }

});
export default connect (mapStateToProps, mapDispatchToProps)( DishDetail);