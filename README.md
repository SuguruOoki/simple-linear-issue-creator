## General

1. Install [pnpm](https://pnpm.js.org/en/installation)
2. Install dependencies and run the script
3. Generate ApiKey from Linear Settings(Workspace Settings -> API -> Personal API tokens -> "Create Key" Button)
4. Add ApiKey to .api_key file
5. if you want to use default team and project id, add them(uuid) to .default_team_id and .default_project_id files


```bash
$ pnpm i
$ ./node_modules/.bin/ts-node index.ts
```
