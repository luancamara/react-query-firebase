import { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, DocumentReference, DocumentSnapshot, FirestoreError } from "firebase/firestore";
import { UseFirestoreHookOptions } from "./index";
export declare function useFirestoreDocument<T = DocumentData, R = DocumentSnapshot<T>>(queryKey: QueryKey, ref: DocumentReference<T>, options?: UseFirestoreHookOptions, useQueryOptions?: Omit<UseQueryOptions<DocumentSnapshot<T>, FirestoreError, R>, "queryFn">): UseQueryResult<R, FirestoreError>;
