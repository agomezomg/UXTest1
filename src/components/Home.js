import React, { Component } from 'react';
import { db, firebaseAuth } from '../config/constants'

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
        list : []
    }
    this.addComment = this.addComment.bind(this)
    this.addLike = this.addLike.bind(this)
}

addComment(e) {
    e.preventDefault()
    if (e.target.comment.value === "") {
        alert("can't leave a blank comment!");
    } else {
        db.ref('/posts'+e.target.keyVal.value+'/comments/').push({
            comment : e.target.comment.value,
            postedBy : firebaseAuth().currentUser.uid
        })
    }
}

addLike(key) {
    var doesExist = null;
    db.ref().child('/posts/'+key+'/likes/').orderByChild('loggedUser')
    .equalTo(firebaseAuth().currentUser.uid).on("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
            doesExist = data.key;
        });
    });
    if(doesExist) {
        db.ref('/posts/'+key+'/likes/'+firebaseAuth().currentUser.uid).set({
            loggedUser : null
        });
        alert("You have unliked a post.")
    } else {
        db.ref('/posts'+key+'/likes/').push({
            loggedUser : firebaseAuth().currentUser.uid
        })
        alert("You have liked a post.")
    }
}

componentDidMount(){
    db.ref('/posts').on('value', (snapshot)=> {
        let list = []
        snapshot.forEach(doc => {
            //if(doc.val().privacy===1) {                
                list.push(doc)
                this.setState({
                    list : list
                })
           // }
        })
    })
  }

  render() {
    let data = this.state.list.map((doc,i)=> {
      if (!this.props.checker) {
        return (
          <div>
              <form onSubmit={this.addComment} className="form-comp" >
                    <div className="card" key={i}  style={{width: 30 + 'rem', height: 20 + 'rem', marginTop : 10 +'!important' }}>
                    <div className="card-body" >
                        <h5 className="card-title text-center" ><b></b>Tema: {doc.val().tema}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" name = "keyVal">{i}</h6>
                        <p><b> Mensaje: </b> {doc.val().mensaje}</p>
                        <div className="form-group" style={{width: 20 + 'rem', margin: "auto", textAlign : "center"}}>
                            <label for="exampleFormControlTextarea1">Comment</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name = "comment"></textarea>
                        </div>
                        
                        <button onClick={()=>this.addLike(doc.key)} type="button" className="btn btn-secondary btn-sm">Like</button>
                        <button type="button" className="btn btn-primary btn-sm">Follow</button>
                        <button type="submit" className="btn btn-secondary btn-sm">Comment</button>
                    </div>
                    </div>
                </form>
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
