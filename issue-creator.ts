import { LinearClient, LinearFetch, User } from "@linear/sdk";
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

const apiKey = '';
const linearClient = new LinearClient({ apiKey });

async function getCurrentUser(): LinearFetch<User> {
  return linearClient.viewer;
}

const data = fs.readFileSync('src/assets/csv/test.csv');
const records = parse(data, { columns: true, });
for (const record of records) {
  console.log(record);
}

// Field	Type	Description
// id	String
// The identifier. If none is provided, the backend will generate one
//
// title	String!
// The issue's title.
//
// description	String
// The issue's description.
//
// assigneeId	String
// The id of the user to assign the issue to.
//
// subscriberIds	[String!]
// The ids of the users subscribing to this ticket.
//
// labelIds	[String!]
// The ids of the issue labels associated with this ticket.
//
// projectId	String!
// The project to associate the issue with.
//
// stateId	String
// The project state which the issue is assigned.
//
// boardOrder	Float!
// The order of the item in its column on the board.
linearClient.createIssue(

);