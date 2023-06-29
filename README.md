# ChatV2 Widget App

This is an application running on Near Social using the NEAR blockchain network.

[**Live App**](https://near.org/wendersonpires.near/widget/ChatV2)

## Setup

Install all the dependencies:

```sh
yarn install
```

Run app:

```sh
yarn start:app
```

Run viewer

```sh
yarn start:vm
```

Now, you can see your changes in real time. Both in React App and Widget.

## Libraries

[**NEAR Social Bridge:**](https://github.com/wpdas/near-social-bridge) A library that allows you to create a common application using ReactJS and inject it in a controlled way into a Widget on Near Social. Therefore, the Widget talks to the React application and vice versa, making it possible to consume Discovery API resources within the React application.

[**NEAR Social Local Viewer:**](https://github.com/wpdas/near-social-local-viewer) A CLI tool that allows you to run and test your Near Social Widgets locally using just your preferred code editor and your default browser.
