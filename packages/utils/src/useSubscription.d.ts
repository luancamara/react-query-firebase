import { Unsubscribe as AuthUnsubscribe } from "firebase/auth";
import { Unsubscribe as FirestoreUnsubscribe } from "firebase/firestore";
import { Unsubscribe as DatabaseUnsubscribe } from "firebase/database";
import { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
type Unsubscribe = AuthUnsubscribe | FirestoreUnsubscribe | DatabaseUnsubscribe;
type UseSubscriptionOptions<TData, TError, R> = UseQueryOptions<TData, TError, R> & {
    onlyOnce?: boolean;
    fetchFn?: () => Promise<TData>;
};
/**
 * Utility hook to subscribe to events, given a function that returns an observer callback.
 * @param queryKey The react-query queryKey
 * @param subscriptionKey A hashable key to store the subscription
 * @param subscribeFn Returns an unsubscribe function to the event
 * @param options
 * @returns
 */
export declare function useSubscription<TData, TError, R = TData>(queryKey: QueryKey, subscriptionKey: QueryKey, subscribeFn: (cb: (data: TData | null) => Promise<void>) => Unsubscribe, options?: UseSubscriptionOptions<TData, TError, R>): UseQueryResult<R, TError>;
export {};
