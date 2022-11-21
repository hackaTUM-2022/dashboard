# Responsive Dashboard React
# Demo
<img width="1440" alt="demo" src="https://user-images.githubusercontent.com/90095481/203121133-78627b38-186f-4690-9fc7-237719c09af5.png">

# Requirements
- Node[https://nodejs.org/en/]
- npm [https://www.npmjs.com/]

## If you are an on Linux - You can install it using nvm
```bash
# nvm install
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash

# choose your version and replace it
$ nvm install <version>

# Install node
$ nvm install node

# Setup - usning npm and node with sudo
$ n=$(which node)
$ n=${n%/bin/node}
$ chmod -R 755 $n/bin/* 
$ sudo cp -r $n/{bin,lib,share} /usr/local 
```

## How to use with farmproject

Within the download you'll find the following directories and files:

```
# Clone this repository 
$ cd https://github.com/hackaTUM-2022/dashboard.git

# Install required node dependencies

$ npm install 

# Start the development server locally

$ npm start
```

> **Note**: This is a project made using React and requires Node and npm for working properly.

## Licensing

- Copyright 2022 Creative Tim (https://www.creative-tim.com)
- Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)
