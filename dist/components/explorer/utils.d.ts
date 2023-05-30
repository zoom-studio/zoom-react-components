import { type SelectNS } from '..';
import { ExplorerNS } from '.';
export declare const getFileTypesFilterOptions: (i18n: Required<ExplorerNS.I18n>, defaultTypeQuery?: ExplorerNS.MaybeAllFileTypesWithAll) => SelectNS.Option<ExplorerNS.MaybeAllFileTypesWithAll>[];
export declare const isImage: (fileType: ExplorerNS.MaybeAllFileTypes) => boolean;
export declare const customizeFileTypeColors: (defaultColors: ExplorerNS.TypeColors, providedColors?: Partial<ExplorerNS.TypeColors>) => ExplorerNS.TypeColors;
export declare const getFileTypeColors: (type: ExplorerNS.MaybeNotPreviewedKnownFileType, colors: ExplorerNS.TypeColors) => ExplorerNS.TypeColorInfo;
export declare const excludeFileExtension: (fileName: string) => string;
export declare const getDefaultViewMode: (providedViewMode?: ExplorerNS.ViewMode) => ExplorerNS.ViewMode;
