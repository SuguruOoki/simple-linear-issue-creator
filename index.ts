import { LinearClient, LinearSdk, ProjectConnection, TeamConnection, UserConnection, } from "@linear/sdk";
import * as fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { IssueCreateInput, ProjectCreateInput } from "@linear/sdk/dist/_generated_documents";
import { ArgumentParser } from "argparse"

async function getProjects(linearClient: LinearClient): Promise<ProjectConnection> {
  return await linearClient.projects();
}

async function getTeams(linearClient: LinearClient): Promise<TeamConnection> {
  return await linearClient.teams();
}

async function getUsers(linearClient: LinearClient): Promise<UserConnection> {
  return await linearClient.users();
}

async function test() {
  const apiKey = fs.readFileSync('.api_key', 'utf8');
  const linearClient = new LinearClient({ apiKey });
  const teams = await getTeams(linearClient);
  return teams.nodes.map(team => console.log(team.id +': '+team.name))
}

async function main() {
    const parser = new ArgumentParser({
        description: 'Command line tool to create issues in bulk with Linear.',
        add_help: true
    })
    parser.add_argument('-f', '--filePath', {help: "csv file path | ./test.csv", required: false, default: './test.csv'})

    const args = parser.parse_args()
    const apiKey = fs.readFileSync('.api_key', 'utf8');
    const defaultTeamId = fs.readFileSync('.default_team_id', 'utf8');
    const defaultProjectId = fs.readFileSync('.default_project_id', 'utf8');
    const linearClient = new LinearClient({ apiKey });

    if (defaultTeamId !== '') {
      const data = fs.readFileSync(args.filePath)
      const records = parse(data, { columns: true, });

      for (const record of records) {
        let insertRecord = {} as IssueCreateInput
        insertRecord.teamId = record.teamId;
        insertRecord.title = record.title
        insertRecord.description = record.description
        insertRecord.projectId = record.projectId
        insertRecord.assigneeId = record.assigneeId

        if (record.assigneeId === '') {
          delete insertRecord.assigneeId;
        }

        if (record.teamId === '') {
          insertRecord.teamId = defaultTeamId;
        }

        if (record.projectId === '') {
          insertRecord.projectId = defaultProjectId;
        }

        linearClient.createIssue(
          insertRecord
        );
      }
    }
}

main();
