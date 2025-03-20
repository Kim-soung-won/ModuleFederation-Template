
    export type RemoteKeys = 'remote/RemoteRoute';
    type PackageType<T> = T extends 'remote/RemoteRoute' ? typeof import('remote/RemoteRoute') :any;