# Portfolio-Chat-App

This is a forum web-application that uses Python Django and React.js, to have a solid amount of control over the front-end and back-end. Users can login and register, then once in they can create forum rooms by inputting a topic, room name, and description which they - and other users - can participate in by finding it on the homepage and writing messages. In the homepage users can sort rooms by topic, or jump to their own profile through the icon on the top-right. In rooms users can write, or edit/delete their own messages. Rooms also display the host, and all participants which acts as a link to each user's profile page. Profile pages mimic most popular social media pages in that there is a banner and profile picture followed by the profile content (username, recent messages, recent rooms created).

## Languages

Python, Javascript, HTML, CSS.

## Packages

 - React.js with JWT decoder
 - Django with rest_framework and djangorestframework-simplejwt
 - Pillow

## Startup
To use this app, clone the github repo and enter the main directory via CLI and create a virtual environment. install necessary packages and run:
```
py -m manage.py runserver
```
Then in a new CLI enter the frontend folder and run:
```
npm start
```
This is done most easily in two vs-code terminal tabs.

## Next steps

Currently the biggest step to do is moving this project from http to ws protocols so that users can see each other's activity in real time. This sort of moves from the typical forum behaviour into the realm of social media but it's better for UX.

Other than that there are some polishing issues to solve:
 - add links to rooms in userpage message activity and room activity.
 - resolve weird crash on login
 - and more.
