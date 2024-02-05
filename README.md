## General

This is [Linear](https://linear.app/) 's bulk issue creation tool.

1. Install [pnpm](https://pnpm.js.org/en/installation)
2. Install dependencies and run the script
3. Generate ApiKey from Linear Settings(Workspace Settings -> API -> Personal API tokens -> "Create Key" Button)
4. Add ApiKey to .api_key file
5. if you want to use default team and project id, add them(uuid) to .default_team_id and .default_project_id files

## use test.csv file

```bash
$ pnpm i
$ ./node_modules/.bin/ts-node index.ts
```

## use your original csv file

```bash
$ pnpm i
$ ./node_modules/.bin/ts-node index.ts -f <your csv file path>
```

### mode

--mode or -m

"mode" argument has 4 options

1. createIssues
2. displayProjects
3. displayUsers
4. displayTeams

default: createIssues

```bash
$ ./node_modules/.bin/ts-node index.ts --mode displayProjects
$ ./node_modules/.bin/ts-node index.ts -m displayProjects
```

if "mode" is "createIssues", you require -f option.