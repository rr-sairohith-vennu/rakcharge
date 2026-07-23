# Rakcharge — EV Charging Portal

Internal portal showing real-time availability of Rakuten's EV charging stations.

## Prerequisites

- Node.js 18+
- A Noodoe API token

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/rr-sairohith-vennu/rakcharge.git
   cd rakcharge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   NOODOE_TOKEN=your_noodoe_api_token_here
   ```
   > Get the token from the Noodoe EV-OS API dashboard or ask the team.

4. Start the server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## How it works

- `server.js` — Express proxy server that forwards requests to the Noodoe API using the token from env
- `index.html` — Frontend that polls `/api/station/:id` every 30 seconds for live status

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NOODOE_TOKEN` | Yes | Bearer token for the Noodoe EV-OS API |

## Notes

- `.env` is gitignored — never commit the token
- For internal deployment, pass `NOODOE_TOKEN` as an environment variable in the host platform
