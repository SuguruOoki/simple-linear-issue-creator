import { LinearClient } from "@linear/sdk";
import * as fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";
import { ArgumentParser } from "argparse"

async function main() {
  const parser = new ArgumentParser({
    description: 'Command line tool to create issues in bulk with Linear.',
    add_help: true
  })
  parser.add_argument('-m', '--mode', {help: "mode: createIssues | displayProjects | displayUsers", required: false, default: 'createIssues'})
  parser.add_argument('-f', '--filePath', {help: "csv file path | ./test.csv", required: false, default: './test.csv'})
  const args = parser.parse_args()
  const mode: 'createIssues' | 'displayProjects' | 'displayUsers' | 'displayTeams' = args.mode
  const apiKey = fs.readFileSync('.api_key', 'utf8');
  const linearClient = new LinearClient({ apiKey });

  switch (mode) {
    case 'createIssues':
      if (!args.filePath){
        console.error('-f|--filePath option is required when you use "createIssues" mode')
        return;
      }
      createIssues(linearClient, args.filePath)
    case 'displayProjects':
      displayProjects(linearClient)
    case 'displayUsers':
      displayUsers(linearClient)
    case 'displayTeams':
      displayTeams(linearClient)
    default:
      createIssues(linearClient, args.filePath)
  }
}

async function displayTeams(linearClient: LinearClient) {
  const teams = await linearClient.teams();
  if (!teams) {
    console.log('user not found');
    return;
  }
  for (const team of teams.nodes) {
    console.log(team.id +': '+ team.name)
  }
}

async function displayUsers(linearClient: LinearClient) {
  const users = await linearClient.users();
  if (!users) {
    console.log('user not found');
    return;
  }
  for (const user of users.nodes) {
    console.log(user.id +': '+ user.name)
  }
}
async function displayProjects(linearClient: LinearClient) {
  const projects =await linearClient.projects();
  if (!projects) {
    console.log('project not found');
    return;
  }
  for (const project of projects.nodes) {
    console.log((await project.teams()).nodes[0].name + ' | '+ project.id + ': ' + project.name)
  }
}

function createIssues(linearClient: LinearClient, filePath: string) {
  const defaultTeamId = fs.readFileSync('.default_team_id', 'utf8');
  const defaultProjectId = fs.readFileSync('.default_project_id', 'utf8');

  if (defaultTeamId !== '') {
    const data = fs.readFileSync(filePath)
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
