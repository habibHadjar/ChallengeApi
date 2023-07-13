import {IIndexQuery, IIndexResponse, IReadWhere, ITableCount} from "../../types/CRUD.types";
import {DbTable} from "../../models/DBTables";
import {DB} from "./DB";
import {RowDataPacket} from "mysql2";

export class CRUD {

  public static async Index<T>(options: {
    query?: IIndexQuery,
    table: DbTable,
    columns?: string[],
    where?: IReadWhere
  }) : Promise<IIndexResponse<T>> {

    const db = DB.Connection;
    // On suppose que le params query sont en format string, et potentiellement
    // non-numérique, ou corrompu
    const page = parseInt(options.query?.page || "0") || 0;
    const limit = parseInt(options.query?.limit || "10") || 0;

    const offset = page * limit;

    // D'abord, récupérer le nombre total
    let whereClause = '';
    let whereValues: any[] = [];
    if (options.where) {
      const whereList: string[] = [];
      Object.entries(options.where).forEach(
        ([key, value]) => {
          whereList.push(key + ' = ?');
          whereValues.push(value);
        }
      )
      whereClause = 'where  ' + whereList.join(' and ');
    }

    const count = await db.query<ITableCount[] & RowDataPacket[]>(`select count(*) as total from ${options.table} ${whereClause}`, whereValues);

    // Récupérer les lignes
    const sqlBase = `select ${options.columns ? options.columns.join(',') : '*'} from ${options.table} ${whereClause} limit ? offset ?`;
    const data = await db.query<T[] & RowDataPacket[]>(sqlBase, [...whereValues, limit, offset].filter(e => e !== undefined));

    // Construire la réponse
    const res: IIndexResponse<T> = {
      page,
      limit,
      total: count[0][0].total,
      rows: data[0]
    }

    return res;
  }

}