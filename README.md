# n-sense

![license badge](https://img.shields.io/badge/license-MIT-brightgreen)

## Description

The frontend and backend have combined to create something special in N-Sense. It is a simple e-commerce site with the goal of taking care of every step of the shopping process. It starts with a backend powered by Express.js and Mongoose (MongoDB). It also benefits from GraphQL for handling requests. Additionally technologies seen in the server directory include AWS s3 for client-side images, bcrypt for password hashing, and jsonwebtoken to handle authentication. Lastly, a Stripe test page has been set up to deal with checkout.

On the client side of things, React stood front and center as the main technology used. Apollo and GraphQL continued to play a big role in helping with requests and communicating with the backend. Meanwhile, Redux Toolkit took care of state.

The framework used throughout the project is Tailwind. However, much of the styling was done via custom CSS.

**The site also features an admin side, where only admin accounts (which must be created manually) have access. It is a small page where categories and products can be added, changed, or deleted. If you are on the Heroku site, the email and password to access that account are admin@admin.com and admin.**

[Demonstration Video]()!

![alt text](./assets/nsense.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To run the project locally, clone or download the repo and run npm install in the root directory. After installing all packages, create a .env file in the server directory and give it a variable called MY_JWT_SECRET. Set that to anything you like. It will also need an AWS s3 Bucket with all the required setup for that if you want images to be displayed as it is currently set up. However, you can get full functionality minus images without that.

## Usage

Once you have everything set up and ready to go, you can run npm run develop from the root directory. Keep in mind that syncing changes to Tailwind requires you to run npm run develop-tailwind. From there, the server will connect and React will start.

Additionally, you can use it without installing the code locally by going to the [N-Sense Heroku Page](https://n-sense.herokuapp.com/).

## License

This project is covered under the following license:

[MIT](https://www.mit.edu/~amini/LICENSE.md)

## Contributing

The project is not accepting any contributions at this time.

## Questions

If you have any questions, you can contact those involved through their GitHub accounts. Thanks!

[Spencer Hulse's GitHub](https://github.com/SpencerHulse)

[Benjamin Molini Vilhunen's GitHub](https://github.com/D1sl)

[Chris Hailey's GitHub](https://github.com/chrisphailey)
