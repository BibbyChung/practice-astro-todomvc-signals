import crypto from 'crypto';
import { BehaviorSubject, Subject } from "rxjs";

// rxjs
export const getSubject = <T>() => new Subject<T>();
export const getBehaviorSubject = <T>(v: T) => new BehaviorSubject(v);

// get uuid
export const getUUID = () => crypto.randomUUID();
