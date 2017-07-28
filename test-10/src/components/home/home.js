import React ,{ Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


 class Home extends Component{
    
    constructor (props) {
        super(props);
    }
    componentWillMount(){
      
    }
    render(){
        const {name,tel} = this.props.customerInfo
        return (
            <div>
                <div>Home</div>
                 <div>{name}</div> 
                <Link to = '/bless'>next</Link>
            </div>
            
        )
    }
}

const mapStateToProps = (state) =>({
    customerInfo:state.customerInfo
})

export default connect(mapStateToProps)(Home)