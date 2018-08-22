import React, { Component } from 'react';
import {database} from 'firebase'

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
        list : []
    }
    this.handlePost = this.handlePost.bind(this)
    this.handleComments = this.handleComments.bind(this)
}

handleComments() {
    
}

handlePost(){
    this.setState({
      tema : null,
      mensaje : null,
      privacy : null,
      c_user : null,
      n_likes : null
    })
  }

componentDidMount(){
    database().ref('/posts').on('value', (snapshot)=> {
        let list = []
        snapshot.forEach(doc => {
            if(doc.val().privacy===1) {                
                list.push(doc)
                this.setState({
                    list : list
                })
            }
        })
    })
  }

  render() {
    let data = this.state.list.map((doc,i)=> {
      if (!this.props.checker) {
        return (
          <div>
                <div className="card" key={i}  style={{width: 30 + 'rem', height: 20 + 'rem', marginTop : 10 +'!important' }}>
                <div className="card-body" >
                    <h5 className="card-title text-center" ><b></b>Tema: {doc.val().tema}</h5>
                    <p><b>
                        Mensaje:
                        </b> {doc.val().mensaje}</p>
                    <div className="form-group" style={{width: 20 + 'rem', margin: "auto", textAlign : "center"}}>
                        <label for="exampleFormControlTextarea1">Comment</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name = "mensaje"></textarea>
                    </div>
                    
                    <button type="button" className="btn btn-secondary btn-sm">Like</button>
                    <button type="button" className="btn btn-primary btn-sm">Follow</button>
                    <button type="button" className="btn btn-secondary btn-sm">Comment</button>
                </div>
                </div>
          </div>
        )
      } else {
          return (
            <div className="card" key={i} >
                <div className="card-body" >
                    <h3 className="card-title text-center" >Tema: {doc.val().tema}</h3>
                    <p><b>Mensaje:</b> {doc.val().mensaje}</p>
                    <button onClick={()=>this.handlePost(doc.key)} className="btn btnDel btn-block m-3" >Eliminar</button>
                </div>
            </div>
        )
      }
  })
  return (
      <div>
         <div className="text-center" >
                <h2 className="text-center" >Public Posts</h2>
                {data}
          </div>
      </div>
    );
  }
}
