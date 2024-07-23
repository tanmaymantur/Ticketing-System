## Project Overview

    -This project is demo project that mimics the ticketing system accurately -
    -Front end project - React, Router , Redux , Tailwind - Instead of backend, states and staic data is used
    -This project is created from scratch no part is copied from online github repos of ticketing system
    -The flow chart diagram is included

# Getting started

    - clone the repo
    - pull latest changes
    - in terminal execute command npm i
    - in terminal execute command npm start

# Credentials

    1. user
        email: user@company.com
        password: user

    2. tech
        email : tech@company.com
        password : tech

    3. Admin
        email : admin@company.com
        password : admin

# Testing

    a.End user:
        1. End user is able to login and register (stored in state)
        2. create a ticket (with optional file attachment) , add comment
        3. able to change status of ticket

    b.Tech Support:
        1. able to answer any assigned ticket with a file attachment
        2. tech role does not have access to create ticket or edit
        3. able to mark as close/resolve ticket
    c. Admin
        1. able to assign/change tech support to ticket (Dummy feature)
        2. able to close/resolve the ticket
