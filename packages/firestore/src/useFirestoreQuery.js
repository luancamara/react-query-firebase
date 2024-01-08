/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
import { useCallback } from "react";
import { onSnapshot, } from "firebase/firestore";
import { getQuerySnapshot, resolveQuery, } from "./index";
import { useSubscription } from "../../utils/src/useSubscription";
export function useFirestoreQuery(queryKey, query, options, useQueryOptions) {
    var isSubscription = !!(options === null || options === void 0 ? void 0 : options.subscribe);
    var subscribeFn = useCallback(function (callback) {
        var unsubscribe = function () {
            // noop
        };
        resolveQuery(query).then(function (res) {
            unsubscribe = onSnapshot(res, {
                includeMetadataChanges: options === null || options === void 0 ? void 0 : options.includeMetadataChanges,
            }, function (snapshot) {
                return callback(snapshot);
            });
        });
        return unsubscribe;
    }, [query, queryKey]);
    return useSubscription(queryKey, ["useFirestoreDocument", queryKey], subscribeFn, __assign(__assign({ queryKey: queryKey }, useQueryOptions), { onlyOnce: !isSubscription, fetchFn: function () {
            return resolveQuery(query).then(function (resolvedQuery) {
                return getQuerySnapshot(resolvedQuery, options === null || options === void 0 ? void 0 : options.source);
            });
        } }));
}
