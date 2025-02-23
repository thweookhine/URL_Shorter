# URL Shorter API

API to shorten long URLs. API provides endpoints to create, retrieve, update, delete short URLs and statistics on the number of times a short URL has been accessed.

## Features

- **Create short URL**-  Create a shortCode for long url
- **Retrieve Original URL:**- Retrieve Original url from shortCode
- **Update:**- Update original Url by shortCode
- **Delete:**- Delete existing url
- **Get statistics on the short URL**-number of times accessed using shortCode

## Prerequisites

- Node.js installed on your system.
- Mysql installed on your system
- Prepare .env by referencing .env_sample

## Installation

**Clone the Repository**

```bash
git clone https://github.com/thweookhine/URL_Shorter.git

# Navigate to the project Directory
cd URL_Shorter

```
**Run by using docker**
```bash
docker-compose up --build
```

**Open your postman and import my collection**
```bash
url_shorter_json_collections
```
