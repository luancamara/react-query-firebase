import { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { QuerySnapshot, DocumentData, FirestoreError } from "firebase/firestore";
import { QueryType, UseFirestoreHookOptions } from "./index";
export declare function useFirestoreQuery<T = DocumentData, R = QuerySnapshot<T>>(queryKey: QueryKey, query: QueryType<T>, options?: UseFirestoreHookOptions, useQueryOptions?: Omit<UseQueryOptions<QuerySnapshot<T>, FirestoreError, R>, "queryFn">): UseQueryResult<R, FirestoreError>;
