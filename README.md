# Flesh and Bones
BIG TALENT ⚡ SMALL FILMS

---

## Build Setup

In your terminal application, open two tabs. The first tab is for Nuxt3 development, the other for Sanity development.

#### Tab 1:

```bash
# cd to nuxt folder
$ cd <your-path-to-projects>/flesh-and-bones/nuxt

# if not already installed, install NVM 22.16.0
$ nvm install 22.16.0

# set nvm to 22
$ nvm use 22
```

<p style="color:gray">*Add .env file to root of this folder (get variables from Seek and Deploy)*</p>

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

View your local Nuxt3 development at http://localhost:3000

#### Tab 2:

```bash
# cd to sanity folder
$ cd <your-path-to-projects>/flesh-and-bones/sanity

# if not already installed, install NVM 22.16.0
$ nvm install 22.16.0

# set nvm to 22
$ nvm use 22
```

<p style="color:gray">*Add .env file to root of this folder (get variables from Seek and Deploy)*</p>

```bash
# install dependencies
$ npm install

# if you don't have @sanity/cli installed, install it globally
$ npm install -g @sanity/cli

# serve with hot reload at localhost:3000
$ sanity dev

# deploy / sync Sanity changes to studio (live / production)
$ sanity deploy
```

View your local Sanity development at http://localhost:3333

Live dashboard at https://flesh-and-bones.sanity.studio
