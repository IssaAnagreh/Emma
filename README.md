# EMMA Mobile - React Native

EMMA solutions mobile application.

## Table of Contents

1. [Requirements and Setup](#requirements-and-setup)
1. [Project Scripts](#project-scripts)
1. [Rules and Conditions](#rules-and-conditions)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Roadmap](#roadmap)
1. [Team](#team)

## Requirements and Setup

- Node (brew install node)
- Watchman (brew install watchman)
- React native (https://reactnative.dev/docs/environment-setup)
- Xcode
- Android studio
- git clone https://github.com/IssaAnagreh/Emma.git
- From within the root directory:

```
npm i
npm run pod (if ios xcode is installed)
npm run ios OR npm run android (if android studio simulator is open)
```

## Project Scripts

Main scripts:

```
npm run pod (before running npm run ios)
npm run ios (to start ios device if xcode is installed)
npm run android (if android device is launched from android studio)
npm run apk (to create android .apk file)
```

## Rules and Conditions

- We will use our own components (Abstract Components) as a core theme.
- We will use hooks nested of any management state exists like most of developers say, and to use the new power hooks from current release.
- We will use axios as a network management system.
- We will write script using TSX, it's the most recent.
- We will follow React/JSX Style Guide from airbnb.
- We will use react-navigation for handling screens navigation.
- We will accept camelCase key name convention for all i18ns key like this `t{signUp)`.

### Installing Dependencies

package.json has all the dependencies, from within the root directory:

```
npm i
```

### Roadmap

TBD

## Team

- **Development Team Members**: Issa
