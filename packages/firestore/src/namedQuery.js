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
import { namedQuery as firestoreNamedQuery, } from "firebase/firestore";
var namedQueryCache = {};
export function namedQuery(firestore, name) {
    var key = "".concat(firestore.app.name, ":").concat(name);
    if (namedQueryCache[key]) {
        return namedQueryCache[key];
    }
    return function () {
        return firestoreNamedQuery(firestore, name).then(function (query) {
            if (query) {
                namedQueryCache[key] = query;
                return query;
            }
            return null;
        });
    };
}
