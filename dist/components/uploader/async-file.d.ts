import { type FC } from 'react';
import { type UploaderNS } from '.';
export declare namespace AsyncUploaderFileNS {
    interface Props {
        file: UploaderNS.FileInterface | File;
    }
}
export declare const AsyncUploaderFile: FC<AsyncUploaderFileNS.Props>;
