import * as loki from 'lokijs';
import * as fs from 'fs';
import * as path from 'path';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<loki.Db> => {
            try {
                const client = await new loki('hospital.db')
                const tables = ['users', 'patients', 'doctors', 'clinicalRecords', 'appointments', 'diseases', 'contactUs']
                tables.forEach(tableName => {
                    const rawdata = fs.readFileSync(path.resolve(__dirname, 'data', `${tableName}.json`));
                    let data = JSON.parse(rawdata.toString());
                    if (tableName == 'diseases') {
                        data = data.map(d => {
                            return {
                                name: d
                            }
                        })
                    }
                    const table = client.addCollection(tableName);
                    table.insert(data)
                })
                /*  const pt = client.getCollection('contactUs')
                 Logger.debug(JSON.stringify(pt.find(true))) */
                return client;
            } catch (error) {
                throw error;
            }
        }
    }
]