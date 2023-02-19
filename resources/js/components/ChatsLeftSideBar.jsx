import React from 'react'

function ChatsLeftSideBar(props) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                            {props.errors != null && props.errors != undefined ?
                            <div>{props.errors}</div> : props.conversations.length == 0 ? (<div className="users-container">
                            <div className="chat-search-box">
                                <div className="input-group">
                                    <input className="form-control" placeholder="Search"/>
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-info">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="users scrollContainer">
                                <h4>Suggestions</h4>
                                {props.users.map((user,i)=>{
                                    return  <li key={i} className="person" data-chat="person1">
                                    <div className="user">
                                        <img src={`/images/${user.image}`} alt="Retail Admin"/>
                                        <span className="status busy"></span>
                                    </div>
                                    <p className="name-time">
                                        <span className="name">{user.name}</span>
                                        <span className="time">15/02/2019</span>
                                    </p>
                                </li>
                                })}
                            </ul>
                        </div>) : (<div className="users-container">
                            <div className="chat-search-box">
                                <div className="input-group">
                                    <input className="form-control" placeholder="Search"/>
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-info">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="users scrollContainer">
                                {props.users.map((user,i)=>{
                                    return  <li key={i} className="person" data-chat="person1">
                                    <div className="user">
                                        <img src={`/images/${user.image}`} alt="Retail Admin"/>
                                        <span className="status busy"></span>
                                    </div>
                                    <p className="name-time">
                                        <span className="name">{user.name}</span>
                                        <span className="time">15/02/2019</span>
                                    </p>
                                </li>
                                })}
                            </ul>
                        </div>)
                            }
                            
                        </div>
  )
}

export default ChatsLeftSideBar