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
