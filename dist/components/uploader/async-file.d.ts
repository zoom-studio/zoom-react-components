import { FC } from 'react';
import { UploaderNS } from '.';
export declare namespace AsyncUploaderFileNS {
    interface Props {
        file: UploaderNS.FileInterface | File;
    }
}
export declare const AsyncUploaderFile: FC<AsyncUploaderFileNS.Props>;
