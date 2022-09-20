import { Configuration } from 'webpack';
export declare function webpack(config: Configuration, { configDir, angularBuilderContext }: {
    configDir: string;
    angularBuilderContext: any;
}): Promise<Configuration>;
