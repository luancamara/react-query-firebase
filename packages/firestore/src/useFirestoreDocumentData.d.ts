import { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, DocumentReference, FirestoreError, SnapshotOptions } from "firebase/firestore";
import { UseFirestoreHookOptions, WithIdField } from "./index";
export declare function useFirestoreDocumentData<T = DocumentData, R = WithIdField<T> | undefined>(key: QueryKey, ref: DocumentReference<T>, options?: UseFirestoreHookOptions & SnapshotOptions, useQueryOptions?: Omit<UseQueryOptions<WithIdField<T> | undefined, FirestoreError, R>, "queryFn">): UseQueryResult<R, FirestoreError>;
export declare function useFirestoreDocumentData<ID extends string, T = DocumentData, R = WithIdField<T, ID> | undefined>(key: QueryKey, ref: DocumentReference<T>, options?: UseFirestoreHookOptions & SnapshotOptions & {
    idField: ID;
}, useQueryOptions?: Omit<UseQueryOptions<WithIdField<T, ID> | undefined, FirestoreError, R>, "queryFn">): UseQueryResult<R | undefined, FirestoreError>;
