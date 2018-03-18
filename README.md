# Node.js library for F5 iControl API

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A helper client to interact with F5 iControl APIs.

See F5 iControl REST API documentation for more details

https://devcentral.f5.com/d/icontrol-rest-user-guide

## Getting Started

### Create iControl Client Instance

```
const iControl = require('node-icontrol-client').IControlUtil;

let iControlClient = new iControl({
  host: '127.0.0.1',
  proto: 'https',
  port: 443,
  token: 'token value', //Authorization Token for Basic Auth
  output: false //Set to true if you want to see output
});


iControlClient.list('/mgmt/tm/net/bwc/policy').then(function(res)  {
     //Do Something
    })
    .catch((err) => {
     //Do Something
    })


```

- host : F5's hostname
- proto : (Optional) Protocol, either https or http. It will be default to https if not specify
- port: (Optional) TCP/IP port. Default to 443 if not indicated
- ca : CA file content, required if strict mode is set on.
- token: F5 generated basic token. Please refer  [here](https://devcentral.f5.com/wiki/iControl.Authentication_with_the_F5_REST_API.ashx) on how you can generate a basic auth token.
- output : Set it true to print out console logs

### Local Live Testing

Refer to the examples shared within repository.

Please ensure you have access to a test or development F5 Proxy.

You can specify your own testing environment, and them reference it. A sample.json has been included to help you kick start the testing

Running the file

```
cd example/

node filename.js
```

### Unit Testing

Run the following to start unit test

```
npm test
```

### Test Coverage

Run the following to check out the code coverage

```
npm run testCoverage
```

### License

Release under [GNU GENERAL PUBLIC LICENSE](https://github.com/robincher/node-f5-icontrol-client/blob/master/LICENSE)

## References
+ [Node iControl Package](https://github.com/thwi/node-icontrol)
+ [F5 iControl REST API](https://devcentral.f5.com/d/icontrol-rest-user-guide)
+ [Code Coverage with Codeship CI](https://cdaringe.com/node-js-project-coverage-with-coveralls-io/)


