import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { db, firebaseAuth } from '../../config/constants';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Dashboard extends Component {
  classes = {};
  constructor(props){
    super(props)
    this.classes = props.classes;
    this.state = {
      list : [],
      privacy : 1
    }
    this.regPost = this.regPost.bind(this);
    this.statusChange1 = this.statusChange1.bind(this);
    this.statusChange2 = this.statusChange2.bind(this);
    this.statusChange3 = this.statusChange3.bind(this);
    this.addLike = this.addLike.bind(this);
    this.addComment = this.addComment.bind(this);
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
            if(doc.val().privacy===1 || doc.val().privacy===3 || doc.val().c_user===(firebaseAuth().currentUser).uid) {
              list.push(doc)
              this.setState({
                  list : list
              })
            }
        })
    })
  }

  statusChange1() {
    this.setState({
        privacy : 1
    })
    alert("privacy set to public")
  }

  statusChange2() {
    this.setState({
        privacy : 2
    })
    alert("privacy set to private")
  }

  statusChange3() {
    this.setState({
        privacy : 3
    })
    alert("privacy set to followers only")
  }

  regPost(e){
    e.preventDefault()
    if (e.target.tema.value === "" || e.target.mensaje.value === "") {
      alert("Can't add with blank fields!")
    } else {
      db.ref('posts/').push({
        tema : e.target.tema.value,
        mensaje : e.target.mensaje.value,
        c_user : (firebaseAuth().currentUser).uid,
        n_likes : 0,
        privacy : this.privacy
      })
      alert("Posted!")
    }
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
        <form onSubmit={this.regPost} className="form-comp" >
          <div class="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.statusChange1} type="button" className="btn btn-secondary">Public</button>
            <button onClick={this.statusChange2} type="button" className="btn btn-secondary">Private</button>
            <button onClick={this.statusChange3} type="button" className="btn btn-secondary">Followers</button>
          </div>
          <div className="form-group text-left">
              <label for="formGroupExampleInput">Tema</label>
              <input type="text" className="form-control input-comp" name="tema"/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Mensaje</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name = "mensaje"></textarea>
          </div>
          <div className="form-group text-left">
            <button type="submit" className="btn btn-primary btn-block">Write Post</button>
          </div>
        </form>
        <div className="text-center" >
          <h2 className="text-center" >Public Posts</h2>
            {data}
        </div>
      </div>
      );
    }
  }
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
