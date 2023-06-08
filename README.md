# Ruby AI

## Overview
Ruby is an AI recruiter and can help you streamline your recruitement flow. It can generate personalized messages for your candidates and help you hire superstar talent.
[Demo video](https://www.loom.com/share/b4015a67b642443cae7d48f8810e9b7d)

## Technical Overview
The project is broken down into a client and server component. Demo's for each are available online.
For setting up locally, clone the repo and follow instructions for sections below.

### Client
The client is built using Javascript, React and Material UI components. Here's a [demo client](https://ruby-ai.vercel.app/) hosted on Vercel.

**Local setup**\
Make sure you have npm and node setup locally

1. cd into the client directory `cd client`
2. run `npm install` to install package dependencies
3. run `npm run start` to start the client
4. view client on `http://localhost:3000` in your browser

### Server
The server is built using Python, Flask and OpenAI API. It uses a local tinydb objectDB to store metadata and state. 
Here's a [demo API server](https://rubyai.onrender.com) hosted on Render.

**Local setup**\
Make sure you have python and pip setup locally

1. cd into the server directory `cd server`
2. if you have a virtual environment setup, activate it or create a [new virtual environment](https://help.dreamhost.com/hc/en-us/articles/115000695551-Installing-and-using-virtualenv-with-Python-3)
3. run `pip install -r requirements.txt` to install package dependencies (or pip3 depending on your setup)
4. start the server using `gunicorn wsgi:app --timeout 120`
5. call API endpoints on `http://127.0.0.1:8000`