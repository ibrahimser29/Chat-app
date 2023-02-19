import React from 'react'
import ChatsLeftSideBar from '../components/ChatsLeftSideBar'
import ChatsRightSideBar from '../components/ChatsRightSideBar'

function Chats() {
  return (
    <div class="container">


    <div class="page-title">
        <div class="row gutters">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <h5 class="title">Chat App</h5>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
    </div>

    <div class="content-wrapper">


        <div class="row gutters">

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                <div class="card m-0">

                    <div class="row no-gutters">
                        <ChatsLeftSideBar />
                        <ChatsRightSideBar />
                    </div>
                </div>

            </div>

        </div>
    </div>

</div>
  )
}

export default Chats