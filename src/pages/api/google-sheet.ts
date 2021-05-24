import { Profile } from '@/lib/types';
import { google } from 'googleapis';

export async function getProfiles(): Promise<Profile[]> {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes,
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Respuestas de formulario 1',
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows
        .filter((row) => row[18] === 'TRUE')
        .map((row) => ({
          date: row[0],
          email: row[1],
          name: row[2],
          available: row[3] !== 'No',
          discord: row[4],
          role: row[5].split(','),
          technologies: row[6].split(','),
          portfolio: row[7],
          linkedin: row[8],
          twitter: row[9],
          github: row[10],
          description: row[11],
          image: row[12],
          nationality: row[14],
        }));
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}
