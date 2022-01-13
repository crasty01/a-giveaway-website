# A GIVEAWAY WEBSITE

## About

The project was created as an entry to the competition for a giveaway solution organized by the community of twitch streamer [Cdubya719](https://www.twitch.tv/cdubya719). The project is still being improved even after the end of the competition. Feel free to create an issue for enhancement ideas or errors you've encountered.

The PWA is built on the vue.js framework and It's hosted at https://giveawayplatform.tk.

## Project setup

### for vue:
```
npm ci
npm run serve
npm run build
```

### for scss/sass compiler:
```
npm i -g sass
sass -w ./src/assets/scss/all.scss:./src/assets/scss/all.css
```

## Planned enhancement

- [x] Saving data locally
- [x] Adding multiple users from list
- [x] Entries managemet (+, -, delete)
- [x] Percentage for winning probability
- [ ] Profiles for saving data
- [ ] Delete all / clear list
- [X] Sorting users by name, percentage ...
- [ ] Sharing lists

## Working on version 2.0.0

- [x] Global reactive variable store
- [x] Login with supabase
- [x] Getting user info (avatar, name)
- [X] Entries sorting (name, number of entries ...)
- [ ] User settings
- [ ] Saving data to db
- [ ] Filtering data from db
- [ ] Sharing giveaway lists
- [ ] ...

<br/>

- better file structure
- enhanced components
- connection to supabase for profile and data management
- better animations
- incorporation of issued enhancement
