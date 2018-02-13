import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

import axios from 'axios';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
    }

    componentWillMount(){
        axios({
            method: 'GET',
            url: '/api/featured'

        }).then(results=>{
            console.log(results);
            this.setState({
                featured: results.data,
                index: (~~(Math.random()*results.data.lenth)+0),
                posts: results.data
                })
        }).catch((error)=>{
            console.log(error);
        })
    }
    

    render(){
        // map over your recommended blogs here, replace null.
        const posts = this.state.posts.map((c,i)=><BlogThumb key={i} blog={c}/>)

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {/* put your mapped blogs here */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;