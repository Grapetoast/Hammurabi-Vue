# Hammurabi-Vue

 >Screen Art Studios take on the classic Hammurabi game built in Quick Venom. www.quickvenom.org

 ## Build Setup

 ``` bash
 # install quasar *must have admin permissions*
 $ npm install -g quasar-cli

 # install dependencies
 $ npm install

 # serve with hot reload at localhost:8080
 $ quasar dev

 # build for production with minification *must run before cordova can build*
 $ quasar build

 # lint code
 $ quasar lint
 ```

 ## Cordova Setup
 ``` bash
 # navigate to cordova folder
 $ cd cordova

 # install cordova *must have admin permissions*
 $ npm install -g cordova

 # Add Platforms
 $ cordova platform add ios
 $ cordova platform add android

 # Emulate to platform *must quasar build first*
 $ cordova emulate ios
 $ cordova emulate android

 # Build version *must quasar build first*
 $ cordova build android
 $ cordova build ios

 # Run on connected device or emulator *must sign in to device and give computer permissions, as well android must be in developer mode*
 $ cordova run android
 $ cordova run ios
 ```
