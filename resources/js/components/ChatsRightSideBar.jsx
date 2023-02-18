import React from 'react'

function ChatsRightSideBar() {
  return (
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                            <div class="selected-user">
                                <span>To: <span class="name">Emily Russell</span></span>
                            </div>
                            <div class="chat-container">
                                <ul class="chat-box scrollContainer">
                                    <li class="chat-left">
                                        <div class="chat-avatar">
                                            <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
                                            <div class="chat-name">Russell</div>
                                        </div>
                                        <div class="chat-text">Hello, I'm Russell.
                                            <br/>How can I help you today?</div>
                                        <div class="chat-hour">08:55 <span class="fa fa-check-circle"></span></div>
                                    </li>
                                    <li class="chat-right">
                                        <div class="chat-hour">08:56 <span class="fa fa-check-circle"></span></div>
                                        <div class="chat-text">Hi, Russell
                                            <br /> I need more information about Developer Plan.</div>
                                        <div class="chat-avatar">
                                            <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
                                            <div class="chat-name">Sam</div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="form-group mt-3 mb-0">
                                    <textarea class="form-control" rows="3" placeholder="Type your message here..."></textarea>
                                </div>
                            </div>
                        </div>
  )
}

export default ChatsRightSideBar