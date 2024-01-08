var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect } from "react";
import { useQuery, useQueryClient, } from "@tanstack/react-query";
var unsubscribes = {};
var observerCount = {};
var eventCount = {};
/**
 * Utility hook to subscribe to events, given a function that returns an observer callback.
 * @param queryKey The react-query queryKey
 * @param subscriptionKey A hashable key to store the subscription
 * @param subscribeFn Returns an unsubscribe function to the event
 * @param options
 * @returns
 */
export function useSubscription(queryKey, subscriptionKey, subscribeFn, options) {
    var _this = this;
    var _a;
    var hashFn = (options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || JSON.stringify;
    var subscriptionHash = hashFn(subscriptionKey);
    var queryClient = useQueryClient();
    if (!(options === null || options === void 0 ? void 0 : options.onlyOnce)) {
        // if it's a subscription, we have at least one observer now
        (_a = observerCount[subscriptionHash]) !== null && _a !== void 0 ? _a : (observerCount[subscriptionHash] = 1);
    }
    function cleanupSubscription(subscriptionHash) {
        if (observerCount[subscriptionHash] === 1) {
            var unsubscribe_1 = unsubscribes[subscriptionHash];
            unsubscribe_1();
            delete unsubscribes[subscriptionHash];
            delete eventCount[subscriptionHash];
        }
    }
    useEffect(function () {
        if (!(options === null || options === void 0 ? void 0 : options.onlyOnce)) {
            observerCount[subscriptionHash] += 1;
            return function () {
                observerCount[subscriptionHash] -= 1;
                cleanupSubscription(subscriptionHash);
            };
        }
    }, []);
    var resolvePromise = function () { return null; };
    var rejectPromise = function () { return null; };
    var result = new Promise(function (resolve, reject) {
        resolvePromise = resolve;
        rejectPromise = reject;
    });
    result.cancel = function () {
        queryClient.invalidateQueries({ queryKey: queryKey });
    };
    var unsubscribe;
    if (!(options === null || options === void 0 ? void 0 : options.onlyOnce)) {
        if (unsubscribes[subscriptionHash]) {
            unsubscribe = unsubscribes[subscriptionHash];
            var old = queryClient.getQueryData(queryKey);
            resolvePromise(old || null);
        }
        else {
            unsubscribe = subscribeFn(function (data) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    (_a = eventCount[subscriptionHash]) !== null && _a !== void 0 ? _a : (eventCount[subscriptionHash] = 0);
                    eventCount[subscriptionHash]++;
                    if (eventCount[subscriptionHash] === 1) {
                        resolvePromise(data || null);
                    }
                    else {
                        queryClient.setQueryData(queryKey, data);
                    }
                    return [2 /*return*/];
                });
            }); });
            unsubscribes[subscriptionHash] = unsubscribe;
        }
    }
    else {
        if (!options.fetchFn) {
            throw new Error("You must specify fetchFn if using onlyOnce mode.");
        }
        else {
            options
                .fetchFn()
                .then(resolvePromise)
                .catch(function (err) {
                rejectPromise(err);
            });
        }
    }
    var queryFn = function () {
        return result;
    };
    return useQuery(__assign(__assign({}, options), { queryFn: queryFn, queryKey: queryKey, retry: false, staleTime: Infinity, refetchInterval: undefined, refetchOnMount: true, refetchOnWindowFocus: false, refetchOnReconnect: false }));
}
