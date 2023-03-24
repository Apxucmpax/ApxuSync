import * as Firebird from 'node-firebird';
export declare class DbService {
    private readonly options;
    constructor();
    query(query: string): Promise<unknown>;
    connect(): Promise<Firebird.Database>;
    q(db: Firebird.Database, query: string): Promise<unknown>;
}
