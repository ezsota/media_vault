# Media Vault

A clickable React demo for a future company media portal.

## GitHub Pages demo

This repository is configured so the **frontend demo runs entirely in the browser**. It does not require Node/Express/PostgreSQL or AWS to be running.

The demo uses React Router's `HashRouter`, which works with GitHub Pages without server-side route configuration.

### Publish to GitHub Pages

1. Create a GitHub repository.
2. Upload/push this entire project.
3. Make sure the default branch is named `main`.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Push to `main` (or manually run the `Deploy Media Vault demo to GitHub Pages` workflow).
7. GitHub will provide the Pages URL after the workflow completes.

The public demo URL will look like:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

No backend deployment is required for this demo.

## Demo accounts

- `admin@example.com` — admin, access to Family, Trips, Videos
- `alex@example.com` — user, access to Family
- `jordan@example.com` — user, access to Trips and Videos

There are no passwords because this is a front-end demonstration only.

## What the demo demonstrates

- React
- Bootstrap / React-Bootstrap
- React Router
- Login flow
- Protected library route
- Protected admin route
- User CRUD UI
- Role assignment
- Directory access assignment
- Photo and video viewing
- Browser persistence using localStorage

## Future production architecture

The `server/` directory is a Node.js + Express + PostgreSQL backend template. It is **not used by the GitHub Pages demo**.

The intended production architecture is:

```text
React frontend
      |
      | HTTPS / fetch()
      v
Node.js + Express API
      |
      +---- PostgreSQL
      |     users / roles / permissions / media metadata
      |
      +---- Amazon S3
            private photos / videos / surveillance footage
```

The backend should authenticate users, check directory permissions, and generate short-lived S3 presigned URLs. The browser should never receive database credentials or permanent S3 credentials.
