import Datastore = require('nedb');
import * as path from "path"
import { Main } from '../book/Main';
import { Image } from "../entity/Image";
import { ImagesFilter } from '../entity/ImagesFilter';

export class ImagePersistence {
    private static databaseName = 'images.db'
    private db: Datastore;

    /**
     * Use ImagePersistence.open()
     */
    private constructor() { }

    static open(): Promise<ImagePersistence> {
        return new Promise((resolve, reject) => {
            let persistence = new ImagePersistence
            persistence.db = new Datastore({
                filename: Main.dbFolder() + path.sep + ImagePersistence.databaseName,
                autoload: true,
                onload: (error: Error) => {
                    if (error) {
                        return reject(error)
                    }

                    persistence.db.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
                        if (err) {
                            return reject(error)
                        }

                        resolve(persistence)
                    });
                }
            });
        })
    }

    insert(image: Image): Promise<Image> {
        let me = this

        return new Promise((resolve, reject) => {
            me.db.insert(image, function (err, newDoc) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(newDoc)
            });
        })
    }

    update(image: Image): Promise<boolean> {
        const me = this;

        return new Promise((resolve, reject) => {
            me.db.update(
                { id: image.id },
                image,
                {},
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

    count(): Promise<number> {
        const me = this;

        return new Promise((resolve, reject) => {
            me.db.count({})
                .exec(function (err: Error, count: number) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    resolve(count)
                });
        })
    }

    find(filter: ImagesFilter): Promise<Image[]> {
        const me = this;

        // Remove non alphanumberic characters and create the filter clause for description and kwywords
        const freeTextFilter = filter.text ? {
            $or: filter.text.split(' ').map((word: string) => {
                let cleanedWord = word.replace(/\W/g, '')
                return {
                    description: { $regex: new RegExp(cleanedWord) }
                }
            })
        } : {}

        // Combines the filters
        const dbFilter = { $and: [freeTextFilter] }

        return new Promise((resolve, reject) => {
            me.db.find<Image>(dbFilter)
                .limit(Main.pageSize())
                .skip(Main.pageSize() * (filter.page || 0))
                .exec(function (err: any, docs: any) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    resolve(docs)
                });
        })
    }
}