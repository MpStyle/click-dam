import Datastore = require('nedb');
import * as path from "path"
import { Logger } from '../book/Logger';
import { Main } from "../book/Main";

export class UserPreferencePersistence {
    public static readonly WINDOW_OFFSET_X = "WINDOW_OFFSET_X";
    public static readonly WINDOW_OFFSET_Y = "WINDOW_OFFSET_Y";
    public static readonly WINDOW_WIDTH = "WINDOW_WIDTH";
    public static readonly WINDOW_HEIGHT = "WINDOW_HEIGHT";
    public static readonly WINDOW_MAXIMIZED = "WINDOW_MAXIMIZED";

    private logger = new Logger("UserPreferencePersistence")
    private static databaseName = 'user-preference.db'
    private db: Datastore;

    /**
     * Use UserPreferencePersistence.open()
     */
    private constructor() { }

    static open(): Promise<UserPreferencePersistence> {
        return new Promise((resolve, reject) => {
            let persistence = new UserPreferencePersistence
            persistence.db = new Datastore({
                filename: Main.dbFolder() + path.sep + UserPreferencePersistence.databaseName,
                autoload: true,
                onload: (error: Error) => {
                    if (error) {
                        return reject(error)
                    }

                    persistence.db.ensureIndex({ fieldName: 'key', unique: true }, function (err) {
                        if (err) {
                            return reject(error)
                        }

                        resolve(persistence)
                    });
                }
            });
        })
    }

    get(key: string): Promise<PreferenceValueType | undefined> {
        const me = this;

        return new Promise((resolve, reject) => {
            me.db.find({ key: key })
                .exec(function (err: any, docs: Preference[]) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    if (docs) {
                        switch (docs.length) {
                            case 0: return resolve(undefined)
                            case 1: return resolve(docs[0].value)
                        }
                    }

                    reject(new Error("mmmm..."))
                });

        })
    }

    put(key: string, value: PreferenceValueType): Promise<boolean> {
        const me = this;

        return new Promise((resolve, reject) => {
            me.db.update(
                { key: key },
                { value: value, key:key },
                { upsert: true },
                (err, numReplaced) => {
                    if (err) {
                        reject(err)
                        return;
                    }

                    resolve(numReplaced == 1)
                }
            )
        })
    }
}

interface Preference {
    key: string
    value: PreferenceValueType
}

export type PreferenceValueType = string | number | boolean;