import React from 'react';
import { type Range } from '@zoom-studio/zoom-js-ts-utils';
import { type BaseComponent } from '../../types';
export declare namespace TypographyNS {
    namespace TextNS {
        const Types: readonly ["common", "bold", "light", "underlined", "strikethrough"];
        type Types = (typeof Types)[number];
        interface TypeProps {
            common?: boolean;
            bold?: boolean;
            light?: boolean;
            underlined?: boolean;
            strikethrough?: boolean;
        }
        interface SizeProps {
            small?: boolean;
            normal?: boolean;
            large?: boolean;
        }
        interface Props extends BaseComponent<HTMLParagraphElement>, TypeProps, SizeProps {
        }
    }
    namespace TitleNS {
        type Sizes = Range<1, 7>;
        interface HeadingProps {
            h1?: boolean;
            h2?: boolean;
            h3?: boolean;
            h4?: boolean;
            h5?: boolean;
            h6?: boolean;
        }
        interface Props extends BaseComponent<HTMLHeadingElement>, HeadingProps {
        }
    }
}
export declare const Text: React.ForwardRefExoticComponent<TypographyNS.TextNS.Props & React.RefAttributes<HTMLParagraphElement>>;
export declare const Title: React.ForwardRefExoticComponent<TypographyNS.TitleNS.Props & React.RefAttributes<HTMLHeadingElement>>;
