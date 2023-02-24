# PicShare

## Installation

To explore this project, first clone the repo on your device using the command below:

```bash
git clone https://github.com/YaseenAlGailani/picshare.git
```

Run the below to install all dependencies.

```bash
cd picshare
npm install 
```

---

## Set up a local database

This project requires a PostgreSQL database.

- Create a database and update the details `app-data-source.ts` to match your configs.
```JavaScript
// app-data-source.ts

export const picShareDB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "yaseen",
  password: "yaseen",
  database: "picshare",
  entities: [Picture]
});
```

---

## Running the app

### Run the dev version

If you would like to run the dev server, you can run the below.

```bash
npm run dev
```

Then navigate to [localhost:3000](http://localhost:3000) from your browser.

This runs both servers; the Express server and the Parcel dev server.

---

### Run the production-ready version

Alternatively, If you woud like to view the bundled, minified, optimised, etc. version, you can run the below.

```bash
npm start
```

Then navigate to [localhost:3000](http://localhost:3000) from your browser.