# JPL Code Challenge

# The GOAL
User has to create a Launch with 3 requirements
- Need Rocket, Launch Pad, Time ( validation: within next 8hrs)

Mission control Detail Screen for active launch
- Show the weather
- Show distance of current user
- Have full screen option of launch window metrics
- Countdown timer -> 5m prior to launch show
- Lift off show metrics
    - Velocity
    - Altitude



https://github.com/smoothlikejazz/code-challenge-jpl/assets/7566382/12b9f586-c056-4ffa-b727-1a467874cb74



## Pages
1. Landing login page
   2. have a super simple login maybe just name
2. Dashboard Page
   3. show a list of launches for the logged in user
3. Launch Details Page
   4. show ALL the details for the launch with components

## Features
- Multiple users can login and have their own view of launches
- Fullscreen is on several components
- Launches have different statuses (Scheduled, Queued, In Flight, Cancelled and Completed)

# How To Run Locally

1. Please insure running at least version
   2. npm --version 9.6.7
   3. node --version v18.17.1
4. install dependencies ```yarn install```
5. start server ```yarn dev```


# Known Issues

- clientonly with the tailwind-elements causes a hydration node mismatch warning
- because the long poll method is ran via localStorage, opening other browsers the longpoll timer will not start So basically this only works in 1 window
- 

# Stretch Goals
- fix some of the mobile styles
- enhance the launch form to have a date time picker
- clean up tailwind classes make it more uniform, some components were copied from tailwind-elements
- better form validation, im currently just using an alert.
- Add details pages for rockets and launch pads, idea to show a carousel since API returns images
  - https://api.spacexdata.com/v4/rockets/<rocketID>
  - https://api.spacexdata.com/v4/launchpads/<launchPadId>
