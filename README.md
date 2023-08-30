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

## Pages
1. Landing login page
   2. have a super simple login maybe just name
2. Dashboard Page
   3. show a list of launches for the logged in user
3. Launch Details Page
   4. show ALL the details for the launch with components


# How To Run Locally

1. Please insure running at least version
   2. npm --version 9.6.7
   3. node --version v18.17.1
4. install dependencies ```yarn install```
5. start server ```yarn dev```


# Known Issues

- clientonly with the tailwind-elements causes a hydration node mismatch warning
