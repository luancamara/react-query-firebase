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
import { addDoc, deleteDoc, runTransaction, setDoc, } from "firebase/firestore";
import { useMutation, } from "@tanstack/react-query";
export function useFirestoreCollectionMutation(ref, useMutationOptions) {
    return useMutation(__assign(__assign({}, useMutationOptions), { mutationFn: function (data) { return addDoc(ref, data); } }));
}
export function useFirestoreDocumentMutation(ref, options, useMutationOptions) {
    return useMutation(__assign(__assign({}, useMutationOptions), { mutationFn: function (data) {
            if (options) {
                return setDoc(ref, data, options);
            }
            return setDoc(ref, data);
        } }));
}
export function useFirestoreDocumentDeletion(ref, useMutationOptions) {
    return useMutation(__assign(__assign({}, useMutationOptions), { mutationFn: function () { return deleteDoc(ref); } }));
}
export function useFirestoreTransaction(firestore, updateFunction, useMutationOptions) {
    return useMutation(__assign(__assign({}, useMutationOptions), { mutationFn: function () {
            return runTransaction(firestore, updateFunction);
        } }));
}
export function useFirestoreWriteBatch(batch, useMutationOptions) {
    return useMutation(__assign(__assign({}, useMutationOptions), { mutationFn: function () {
            return batch.commit();
        } }));
}
