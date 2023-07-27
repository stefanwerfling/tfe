# TFE
Tinkerforge API Bindings Extended in Typescript and ESM

## Info
Tinkerforge APIs have been switched to Typescript and ESM module. Now these can be used cleanly in modern projects. Formatting and source code checking runs via ESLINT and Typescript Compiler.


## Changes
The structure and methods have been taken from the original Bindings API, but some improvements have been made:

* Types of variables have been defined
* Removal of "eval" use
* removal of deprecated methods

### Open

* Websocket support for browser
  * In my opinion, the Bricks should not be controlled directly from the browser, but always via the backend. It should always be checked again whether and how an input/output can be set/read.

## Setup

Install the lib with:

```shell
npm install git+https://github.com/stefanwerfling/tfe.git
```

## Start
```typescript
import {IPConnection} from 'tfe';

/**
 * Main
 */
(async(): Promise<void> => {
  const ipcon = new IPConnection();

  ipcon.connect('localhost', 4223, (error: number) => {
    console.log(error);
  });

  ipcon.on(IPConnection.CALLBACK_CONNECTED, (connectReason: number) => {
    console.log(connectReason);

    ipcon.enumerate();
  });

  ipcon.on(IPConnection.CALLBACK_ENUMERATE, (uid: string, connectedUid: any, position: number, hardwareVersion: number[], firmwareVersion: number[], deviceIdentifier: any, enumerationType: number) => {
    console.log(`UID:               ${uid}`);
    console.log(`Enumeration Type:  ${enumerationType}`);

    if (enumerationType === IPConnection.ENUMERATION_TYPE_DISCONNECTED) {
      console.log('');
      return;
    }

    console.log(`Connected UID:     ${connectedUid}`);
    console.log(`Position:          ${position}`);
    console.log(`Hardware Version:  ${hardwareVersion}`);
    console.log(`Firmware Version:  ${firmwareVersion}`);
    console.log(`Device Identifier: ${deviceIdentifier}`);
    console.log('');
  });
  
  // write your code
})();
```