import {ErrorCode, IIndexQuery, IIndexResponse, IReadWhere, ITableCount} from "../../types/CRUD.types";
import {DbTable} from "../../models/DBTables";
import {DB} from "./DB";
import {OkPacket, RowDataPacket} from "mysql2";
import {ApiError} from "./ApiError";

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

  public static async Read<T>(options: {
    table: DbTable,
    idKey: string,
    idValue: number|string,
    columns?: string[]
  }): Promise<T|false> {
    const db = DB.Connection;
    const data = await db.query<T[] & RowDataPacket[]>(`select ${options.columns ? options.columns.join(',') : '*'} from ${options.table} where ${options.idKey} = ?`, [options.idValue]);


    if (data[0].length > 0) {
      return data[0][0];
    } else {
      return false;
    }
  }

  public static async Create<T>(options: {
    body: T,
    table: DbTable
  }): Promise<{ id: number }> {
    const db = DB.Connection;
    const data = await db.query<OkPacket>(`insert into ${options.table} set ?`, options.body);

    return {
      id: data[0].insertId
    }
  }

  public static async Update<T>(options: {
    body: T,
    table: DbTable,
    idKey: string,
    idValue: number|string
  }): Promise<{ id: number|string; rows: number; }> {
    const db = DB.Connection;

    const data = await db.query<OkPacket>(`update ${options.table} set ? where ${options.idKey} = ?`, [options.body, options.idValue]);

    return {
      id: options.idValue,
      rows: data[0].affectedRows
    }
  }

  public static async Delete(options: {
    table: DbTable,
    idKey: string,
    idValue: number|string
  }): Promise<{ id: number|string; rows: number; }> {
    const db = DB.Connection;
    const data = await db.query<OkPacket>(`delete from ${options.table} where ${options.idKey} = ?`, [options.idValue]);

    return {
      id: options.idValue,
      rows: data[0].affectedRows
    }
  }

}