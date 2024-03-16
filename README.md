# Delivery app

A simple delivery app that allows to create and manage orders. It uses Json database API to store data.

## Installation

Install all necessary dependencies

```bash
npm install crypto-js @mui/material @emotion/react @emotion/styled
```

Build the app with

```bash
npm run build
```

Copy contents of build folder to the root of your server.

This app has been tested with apache2 server.

This site uses browser routing which allows to update content dynamically without refreshing the page. But after you refresh page state is lost. Install the following .htaccess config to fix it:

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## Setup

Run `start-app.sh` to build and run app.

> [!WARNING]
> 
> If this app is not working as expected, please go to "Maintenance" section and set API hostname.

## Example

This app has been hosted at: https://sandbox.andrax.dev

## Run development server for testing (strictly not recommended for production)

```bash
npm start
```

## Usage

App will start at `localhost:3000` by default (Or other IP if it specified in docker settings).

## License

```
Copyright (c) 2023-2024 Dmytro Ostapenko. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```