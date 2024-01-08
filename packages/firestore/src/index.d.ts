import { DocumentData, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, SnapshotListenOptions } from "firebase/firestore";
export type GetSnapshotSource = "server" | "cache";
export type GetSnapshotOptions = {
    source?: GetSnapshotSource;
};
export type UseFirestoreHookOptions = {
    subscribe?: boolean;
} & GetSnapshotOptions & SnapshotListenOptions;
export type WithIdField<D, F = void> = F extends string ? D & {
    [key in F]: string;
} : D;
export declare function getSnapshot<T>(ref: DocumentReference<T>, source?: GetSnapshotSource): Promise<DocumentSnapshot<T>>;
export type NamedQueryPromise<T> = () => Promise<Query<T> | null>;
export type NamedQuery<T = DocumentData> = Query<T> | NamedQueryPromise<T>;
export type QueryType<T> = Query<T> | NamedQuery<T>;
export declare function getQuerySnapshot<T>(query: Query<T>, source?: GetSnapshotSource): Promise<QuerySnapshot<T>>;
export declare function resolveQuery<T>(query: QueryType<T>): Promise<Query<T>>;
export * from "./useFirestoreDocument";
export * from "./useFirestoreDocumentData";
export * from "./useFirestoreInfiniteQuery";
export * from "./useFirestoreInfiniteQueryData";
export * from "./useFirestoreQuery";
export * from "./useFirestoreQueryData";
export * from "./mutations";
export * from "./namedQuery";
