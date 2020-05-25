
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Author {
    id: number;
    firstName?: string;
    lastName?: string;
    posts?: Post[];
}

export class Post {
    id: number;
    title: string;
    votes?: number;
}

export abstract class IQuery {
    abstract author(id: number): Author | Promise<Author>;

    abstract states(name: string): States | Promise<States>;

    abstract stats(): Stats | Promise<Stats>;
}

export class States {
    state?: string;
    recovered?: string;
}

export class Stats {
    data?: Data;
}

export class Data {
    total_cases?: string;
    recovery_cases?: string;
    death_cases?: string;
    currently_infected?: string;
    last_update?: string;
}
