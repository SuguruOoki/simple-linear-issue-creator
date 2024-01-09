import { Issue, LinearClient, LinearFetch, User } from "@linear/sdk";
import * as fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";

const apiKey = '';
const linearClient = new LinearClient({ apiKey });

async function getCurrentUser(): LinearFetch<User> {
  return linearClient.viewer;
}

const data = fs.readFileSync('./test.csv');

const records: IssueCreateInput[] = parse(data, { columns: true, });

for (const record of records) {
  linearClient.createIssue(
    record
  );
}