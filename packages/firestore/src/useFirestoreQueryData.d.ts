import { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, SnapshotOptions, FirestoreError } from "firebase/firestore";
import { QueryType, UseFirestoreHookOptions, WithIdField } from "./index";
export declare function useFirestoreQueryData<T = DocumentData, R = WithIdField<T>[]>(key: QueryKey, query: QueryType<T>, options?: UseFirestoreHookOptions & SnapshotOptions, useQueryOptions?: Omit<UseQueryOptions<WithIdField<T>[], FirestoreError, R>, "queryFn">): UseQueryResult<R, FirestoreError>;
export declare function useFirestoreQueryData<ID extends string, T = DocumentData, R = WithIdField<T, ID>[]>(key: QueryKey, query: QueryType<T>, options?: UseFirestoreHookOptions & SnapshotOptions & {
    idField: ID;
}, useQueryOptions?: Omit<UseQueryOptions<WithIdField<T, ID>[], FirestoreError, R>, "queryFn">): UseQueryResult<R, FirestoreError>;
