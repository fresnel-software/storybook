import { Options as Options$3 } from 'telejson';
import { TransformOptions } from '@babel/core';
import { Router } from 'express';
import { Server } from 'http';
import { Parameters as Parameters$1 } from '@storybook/csf';
import * as Cache from 'file-system-cache';
import Cache__default from 'file-system-cache';

/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

@category Type
*/
type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;

declare global {
	interface SymbolConstructor {
		readonly observable: symbol;
	}
}

/**
Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.

Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.

This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.

@example
```
import type {LiteralUnion} from 'type-fest';

// Before

type Pet = 'dog' | 'cat' | string;

const pet: Pet = '';
// Start typing in your TypeScript-enabled IDE.
// You **will not** get auto-completion for `dog` and `cat` literals.

// After

type Pet2 = LiteralUnion<'dog' | 'cat', string>;

const pet: Pet2 = '';
// You **will** get auto-completion for `dog` and `cat` literals.
```

@category Type
*/
type LiteralUnion<
	LiteralType,
	BaseType extends Primitive,
> = LiteralType | (BaseType & Record<never, never>);

declare namespace PackageJson$1 {
	/**
	A person who has been involved in creating or maintaining the package.
	*/
	export type Person =
		| string
		| {
			name: string;
			url?: string;
			email?: string;
		};

	export type BugsLocation =
		| string
		| {
			/**
			The URL to the package's issue tracker.
			*/
			url?: string;

			/**
			The email address to which issues should be reported.
			*/
			email?: string;
		};

	export interface DirectoryLocations {
		[directoryType: string]: unknown;

		/**
		Location for executable scripts. Sugar to generate entries in the `bin` property by walking the folder.
		*/
		bin?: string;

		/**
		Location for Markdown files.
		*/
		doc?: string;

		/**
		Location for example scripts.
		*/
		example?: string;

		/**
		Location for the bulk of the library.
		*/
		lib?: string;

		/**
		Location for man pages. Sugar to generate a `man` array by walking the folder.
		*/
		man?: string;

		/**
		Location for test files.
		*/
		test?: string;
	}

	export type Scripts = {
		/**
		Run **before** the package is published (Also run on local `npm install` without any arguments).
		*/
		prepublish?: string;

		/**
		Run both **before** the package is packed and published, and on local `npm install` without any arguments. This is run **after** `prepublish`, but **before** `prepublishOnly`.
		*/
		prepare?: string;

		/**
		Run **before** the package is prepared and packed, **only** on `npm publish`.
		*/
		prepublishOnly?: string;

		/**
		Run **before** a tarball is packed (on `npm pack`, `npm publish`, and when installing git dependencies).
		*/
		prepack?: string;

		/**
		Run **after** the tarball has been generated and moved to its final destination.
		*/
		postpack?: string;

		/**
		Run **after** the package is published.
		*/
		publish?: string;

		/**
		Run **after** the package is published.
		*/
		postpublish?: string;

		/**
		Run **before** the package is installed.
		*/
		preinstall?: string;

		/**
		Run **after** the package is installed.
		*/
		install?: string;

		/**
		Run **after** the package is installed and after `install`.
		*/
		postinstall?: string;

		/**
		Run **before** the package is uninstalled and before `uninstall`.
		*/
		preuninstall?: string;

		/**
		Run **before** the package is uninstalled.
		*/
		uninstall?: string;

		/**
		Run **after** the package is uninstalled.
		*/
		postuninstall?: string;

		/**
		Run **before** bump the package version and before `version`.
		*/
		preversion?: string;

		/**
		Run **before** bump the package version.
		*/
		version?: string;

		/**
		Run **after** bump the package version.
		*/
		postversion?: string;

		/**
		Run with the `npm test` command, before `test`.
		*/
		pretest?: string;

		/**
		Run with the `npm test` command.
		*/
		test?: string;

		/**
		Run with the `npm test` command, after `test`.
		*/
		posttest?: string;

		/**
		Run with the `npm stop` command, before `stop`.
		*/
		prestop?: string;

		/**
		Run with the `npm stop` command.
		*/
		stop?: string;

		/**
		Run with the `npm stop` command, after `stop`.
		*/
		poststop?: string;

		/**
		Run with the `npm start` command, before `start`.
		*/
		prestart?: string;

		/**
		Run with the `npm start` command.
		*/
		start?: string;

		/**
		Run with the `npm start` command, after `start`.
		*/
		poststart?: string;

		/**
		Run with the `npm restart` command, before `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		prerestart?: string;

		/**
		Run with the `npm restart` command. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		restart?: string;

		/**
		Run with the `npm restart` command, after `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
		*/
		postrestart?: string;
	} & Partial<Record<string, string>>;

	/**
	Dependencies of the package. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or Git URL.
	*/
	export type Dependency = Partial<Record<string, string>>;

	/**
	Conditions which provide a way to resolve a package entry point based on the environment.
	*/
	export type ExportCondition = LiteralUnion<
		| 'import'
		| 'require'
		| 'node'
		| 'node-addons'
		| 'deno'
		| 'browser'
		| 'electron'
		| 'react-native'
		| 'default',
		string
	>;

	type ExportConditions = {[condition in ExportCondition]: Exports};

	/**
	Entry points of a module, optionally with conditions and subpath exports.
	*/
	export type Exports =
	| null
	| string
	| Array<string | ExportConditions>
	| ExportConditions
	| {[path: string]: Exports}; // eslint-disable-line @typescript-eslint/consistent-indexed-object-style

	/**
	Import map entries of a module, optionally with conditions.
	*/
	export type Imports = { // eslint-disable-line @typescript-eslint/consistent-indexed-object-style
		[key: string]: string | {[key in ExportCondition]: Exports};
	};

	export interface NonStandardEntryPoints {
		/**
		An ECMAScript module ID that is the primary entry point to the program.
		*/
		module?: string;

		/**
		A module ID with untranspiled code that is the primary entry point to the program.
		*/
		esnext?:
		| string
		| {
			[moduleName: string]: string | undefined;
			main?: string;
			browser?: string;
		};

		/**
		A hint to JavaScript bundlers or component tools when packaging modules for client side use.
		*/
		browser?:
		| string
		| Partial<Record<string, string | false>>;

		/**
		Denote which files in your project are "pure" and therefore safe for Webpack to prune if unused.

		[Read more.](https://webpack.js.org/guides/tree-shaking/)
		*/
		sideEffects?: boolean | string[];
	}

	export interface TypeScriptConfiguration {
		/**
		Location of the bundled TypeScript declaration file.
		*/
		types?: string;

		/**
		Version selection map of TypeScript.
		*/
		typesVersions?: Partial<Record<string, Partial<Record<string, string[]>>>>;

		/**
		Location of the bundled TypeScript declaration file. Alias of `types`.
		*/
		typings?: string;
	}

	/**
	An alternative configuration for Yarn workspaces.
	*/
	export interface WorkspaceConfig {
		/**
		An array of workspace pattern strings which contain the workspace packages.
		*/
		packages?: WorkspacePattern[];

		/**
		Designed to solve the problem of packages which break when their `node_modules` are moved to the root workspace directory - a process known as hoisting. For these packages, both within your workspace, and also some that have been installed via `node_modules`, it is important to have a mechanism for preventing the default Yarn workspace behavior. By adding workspace pattern strings here, Yarn will resume non-workspace behavior for any package which matches the defined patterns.

		[Read more](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)
		*/
		nohoist?: WorkspacePattern[];
	}

	/**
	A workspace pattern points to a directory or group of directories which contain packages that should be included in the workspace installation process.

	The patterns are handled with [minimatch](https://github.com/isaacs/minimatch).

	@example
	`docs` → Include the docs directory and install its dependencies.
	`packages/*` → Include all nested directories within the packages directory, like `packages/cli` and `packages/core`.
	*/
	type WorkspacePattern = string;

	export interface YarnConfiguration {
		/**
		Used to configure [Yarn workspaces](https://classic.yarnpkg.com/docs/workspaces/).

		Workspaces allow you to manage multiple packages within the same repository in such a way that you only need to run `yarn install` once to install all of them in a single pass.

		Please note that the top-level `private` property of `package.json` **must** be set to `true` in order to use workspaces.
		*/
		workspaces?: WorkspacePattern[] | WorkspaceConfig;

		/**
		If your package only allows one version of a given dependency, and you’d like to enforce the same behavior as `yarn install --flat` on the command-line, set this to `true`.

		Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an app), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command-line.
		*/
		flat?: boolean;

		/**
		Selective version resolutions. Allows the definition of custom package versions inside dependencies without manual edits in the `yarn.lock` file.
		*/
		resolutions?: Dependency;
	}

	export interface JSPMConfiguration {
		/**
		JSPM configuration.
		*/
		jspm?: PackageJson$1;
	}

	/**
	Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Containing standard npm properties.
	*/
	export interface PackageJsonStandard {
		/**
		The name of the package.
		*/
		name?: string;

		/**
		Package version, parseable by [`node-semver`](https://github.com/npm/node-semver).
		*/
		version?: string;

		/**
		Package description, listed in `npm search`.
		*/
		description?: string;

		/**
		Keywords associated with package, listed in `npm search`.
		*/
		keywords?: string[];

		/**
		The URL to the package's homepage.
		*/
		homepage?: LiteralUnion<'.', string>;

		/**
		The URL to the package's issue tracker and/or the email address to which issues should be reported.
		*/
		bugs?: BugsLocation;

		/**
		The license for the package.
		*/
		license?: string;

		/**
		The licenses for the package.
		*/
		licenses?: Array<{
			type?: string;
			url?: string;
		}>;

		author?: Person;

		/**
		A list of people who contributed to the package.
		*/
		contributors?: Person[];

		/**
		A list of people who maintain the package.
		*/
		maintainers?: Person[];

		/**
		The files included in the package.
		*/
		files?: string[];

		/**
		Resolution algorithm for importing ".js" files from the package's scope.

		[Read more.](https://nodejs.org/api/esm.html#esm_package_json_type_field)
		*/
		type?: 'module' | 'commonjs';

		/**
		The module ID that is the primary entry point to the program.
		*/
		main?: string;

		/**
		Subpath exports to define entry points of the package.

		[Read more.](https://nodejs.org/api/packages.html#subpath-exports)
		*/
		exports?: Exports;

		/**
		Subpath imports to define internal package import maps that only apply to import specifiers from within the package itself.

		[Read more.](https://nodejs.org/api/packages.html#subpath-imports)
		*/
		imports?: Imports;

		/**
		The executable files that should be installed into the `PATH`.
		*/
		bin?:
		| string
		| Partial<Record<string, string>>;

		/**
		Filenames to put in place for the `man` program to find.
		*/
		man?: string | string[];

		/**
		Indicates the structure of the package.
		*/
		directories?: DirectoryLocations;

		/**
		Location for the code repository.
		*/
		repository?:
		| string
		| {
			type: string;
			url: string;

			/**
			Relative path to package.json if it is placed in non-root directory (for example if it is part of a monorepo).

			[Read more.](https://github.com/npm/rfcs/blob/latest/implemented/0010-monorepo-subdirectory-declaration.md)
			*/
			directory?: string;
		};

		/**
		Script commands that are run at various times in the lifecycle of the package. The key is the lifecycle event, and the value is the command to run at that point.
		*/
		scripts?: Scripts;

		/**
		Is used to set configuration parameters used in package scripts that persist across upgrades.
		*/
		config?: Record<string, unknown>;

		/**
		The dependencies of the package.
		*/
		dependencies?: Dependency;

		/**
		Additional tooling dependencies that are not required for the package to work. Usually test, build, or documentation tooling.
		*/
		devDependencies?: Dependency;

		/**
		Dependencies that are skipped if they fail to install.
		*/
		optionalDependencies?: Dependency;

		/**
		Dependencies that will usually be required by the package user directly or via another dependency.
		*/
		peerDependencies?: Dependency;

		/**
		Indicate peer dependencies that are optional.
		*/
		peerDependenciesMeta?: Partial<Record<string, {optional: true}>>;

		/**
		Package names that are bundled when the package is published.
		*/
		bundledDependencies?: string[];

		/**
		Alias of `bundledDependencies`.
		*/
		bundleDependencies?: string[];

		/**
		Engines that this package runs on.
		*/
		engines?: {
			[EngineName in 'npm' | 'node' | string]?: string;
		};

		/**
		@deprecated
		*/
		engineStrict?: boolean;

		/**
		Operating systems the module runs on.
		*/
		os?: Array<LiteralUnion<
		| 'aix'
		| 'darwin'
		| 'freebsd'
		| 'linux'
		| 'openbsd'
		| 'sunos'
		| 'win32'
		| '!aix'
		| '!darwin'
		| '!freebsd'
		| '!linux'
		| '!openbsd'
		| '!sunos'
		| '!win32',
		string
		>>;

		/**
		CPU architectures the module runs on.
		*/
		cpu?: Array<LiteralUnion<
		| 'arm'
		| 'arm64'
		| 'ia32'
		| 'mips'
		| 'mipsel'
		| 'ppc'
		| 'ppc64'
		| 's390'
		| 's390x'
		| 'x32'
		| 'x64'
		| '!arm'
		| '!arm64'
		| '!ia32'
		| '!mips'
		| '!mipsel'
		| '!ppc'
		| '!ppc64'
		| '!s390'
		| '!s390x'
		| '!x32'
		| '!x64',
		string
		>>;

		/**
		If set to `true`, a warning will be shown if package is installed locally. Useful if the package is primarily a command-line application that should be installed globally.

		@deprecated
		*/
		preferGlobal?: boolean;

		/**
		If set to `true`, then npm will refuse to publish it.
		*/
		private?: boolean;

		/**
		A set of config values that will be used at publish-time. It's especially handy to set the tag, registry or access, to ensure that a given package is not tagged with 'latest', published to the global public registry or that a scoped module is private by default.
		*/
		publishConfig?: PublishConfig;

		/**
		Describes and notifies consumers of a package's monetary support information.

		[Read more.](https://github.com/npm/rfcs/blob/latest/accepted/0017-add-funding-support.md)
		*/
		funding?: string | {
			/**
			The type of funding.
			*/
			type?: LiteralUnion<
			| 'github'
			| 'opencollective'
			| 'patreon'
			| 'individual'
			| 'foundation'
			| 'corporation',
			string
			>;

			/**
			The URL to the funding page.
			*/
			url: string;
		};
	}

	export interface PublishConfig {
		/**
		Additional, less common properties from the [npm docs on `publishConfig`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig).
		*/
		[additionalProperties: string]: unknown;

		/**
		When publishing scoped packages, the access level defaults to restricted. If you want your scoped package to be publicly viewable (and installable) set `--access=public`. The only valid values for access are public and restricted. Unscoped packages always have an access level of public.
		*/
		access?: 'public' | 'restricted';

		/**
		The base URL of the npm registry.

		Default: `'https://registry.npmjs.org/'`
		*/
		registry?: string;

		/**
		The tag to publish the package under.

		Default: `'latest'`
		*/
		tag?: string;
	}
}

/**
Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Also includes types for fields used by other popular projects, like TypeScript and Yarn.

@category File
*/
type PackageJson$1 =
PackageJson$1.PackageJsonStandard &
PackageJson$1.NonStandardEntryPoints &
PackageJson$1.TypeScriptConfiguration &
PackageJson$1.YarnConfiguration &
PackageJson$1.JSPMConfiguration;

declare type Options$2 = Parameters<typeof Cache__default>['0'];
declare type FileSystemCache = ReturnType<typeof Cache__default>;
declare function createFileSystemCache(options: Options$2): FileSystemCache;

/**
 * ⚠️ This file contains internal WIP types they MUST NOT be exported outside this package for now!
 */
declare type BuilderName = 'webpack5' | '@storybook/builder-webpack5' | string;
interface CoreConfig {
    builder?: BuilderName | {
        name: BuilderName;
        options?: Record<string, any>;
    };
    disableWebpackDefaults?: boolean;
    channelOptions?: Partial<Options$3>;
    /**
     * Disables the generation of project.json, a file containing Storybook metadata
     */
    disableProjectJson?: boolean;
    /**
     * Disables Storybook telemetry
     * @see https://storybook.js.org/telemetry
     */
    disableTelemetry?: boolean;
    /**
     * Enable crash reports to be sent to Storybook telemetry
     * @see https://storybook.js.org/telemetry
     */
    enableCrashReports?: boolean;
    /**
     * enable CORS headings to run document in a "secure context"
     * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
     * This enables these headers in development-mode:
     *   Cross-Origin-Opener-Policy: same-origin
     *   Cross-Origin-Embedder-Policy: require-corp
     */
    crossOriginIsolated?: boolean;
}
interface DirectoryMapping {
    from: string;
    to: string;
}
interface Presets {
    apply(extension: 'typescript', config: TypescriptOptions, args?: Options$1): Promise<TypescriptOptions>;
    apply(extension: 'framework', config?: {}, args?: any): Promise<Preset>;
    apply(extension: 'babel', config?: {}, args?: any): Promise<TransformOptions>;
    apply(extension: 'entries', config?: [], args?: any): Promise<unknown>;
    apply(extension: 'stories', config?: [], args?: any): Promise<StoriesEntry[]>;
    apply(extension: 'managerEntries', config: [], args?: any): Promise<string[]>;
    apply(extension: 'refs', config?: [], args?: any): Promise<unknown>;
    apply(extension: 'core', config?: {}, args?: any): Promise<CoreConfig>;
    apply<T>(extension: string, config?: T, args?: unknown): Promise<T>;
}
interface LoadedPreset {
    name: string;
    preset: any;
    options: any;
}
declare type PresetConfig = string | {
    name: string;
    options?: unknown;
};
interface Ref {
    id: string;
    url: string;
    title: string;
    version: string;
    type?: string;
    disable?: boolean;
}
interface VersionCheck {
    success: boolean;
    data?: any;
    error?: any;
    time: number;
}
interface ReleaseNotesData {
    success: boolean;
    currentVersion: string;
    showOnFirstLaunch: boolean;
}
interface Stats {
    toJson: () => any;
}
interface BuilderResult {
    totalTime?: ReturnType<typeof process.hrtime>;
    stats?: Stats;
}
declare type PackageJson = PackageJson$1 & Record<string, any>;
interface LoadOptions {
    packageJson: PackageJson;
    outputDir?: string;
    configDir?: string;
    ignorePreview?: boolean;
    extendServer?: (server: Server) => void;
}
interface CLIOptions {
    port?: number;
    ignorePreview?: boolean;
    previewUrl?: string;
    forceBuildPreview?: boolean;
    disableTelemetry?: boolean;
    enableCrashReports?: boolean;
    host?: string;
    /**
     * @deprecated Use 'staticDirs' Storybook Configuration option instead
     */
    staticDir?: string[];
    configDir?: string;
    https?: boolean;
    sslCa?: string[];
    sslCert?: string;
    sslKey?: string;
    smokeTest?: boolean;
    managerCache?: boolean;
    open?: boolean;
    ci?: boolean;
    loglevel?: string;
    quiet?: boolean;
    versionUpdates?: boolean;
    releaseNotes?: boolean;
    dll?: boolean;
    docs?: boolean;
    docsDll?: boolean;
    uiDll?: boolean;
    debugWebpack?: boolean;
    webpackStatsJson?: string | boolean;
    outputDir?: string;
}
interface BuilderOptions {
    configType?: 'DEVELOPMENT' | 'PRODUCTION';
    ignorePreview: boolean;
    cache: FileSystemCache;
    configDir: string;
    docsMode: boolean;
    features?: StorybookConfig['features'];
    versionCheck?: VersionCheck;
    releaseNotesData?: ReleaseNotesData;
    disableWebpackDefaults?: boolean;
    serverChannelUrl?: string;
}
interface StorybookConfigOptions {
    presets: Presets;
    presetsList?: LoadedPreset[];
}
declare type Options$1 = LoadOptions & StorybookConfigOptions & CLIOptions & BuilderOptions;
interface Builder<Config, BuilderStats extends Stats = Stats> {
    getConfig: (options: Options$1) => Promise<Config>;
    start: (args: {
        options: Options$1;
        startTime: ReturnType<typeof process.hrtime>;
        router: Router;
        server: Server;
    }) => Promise<void | {
        stats?: BuilderStats;
        totalTime: ReturnType<typeof process.hrtime>;
        bail: (e?: Error) => Promise<void>;
    }>;
    build: (arg: {
        options: Options$1;
        startTime: ReturnType<typeof process.hrtime>;
    }) => Promise<void | BuilderStats>;
    bail: (e?: Error) => Promise<void>;
    corePresets?: string[];
    overridePresets?: string[];
}
interface IndexerOptions {
    makeTitle: (userTitle?: string) => string;
}
interface IndexedStory {
    id: string;
    name: string;
    parameters?: Parameters$1;
}
interface StoryIndex {
    meta: {
        title?: string;
    };
    stories: IndexedStory[];
}
interface StoryIndexer {
    test: RegExp;
    indexer: (fileName: string, options: IndexerOptions) => Promise<StoryIndex>;
    addDocsTemplate?: boolean;
}
/**
 * Options for TypeScript usage within Storybook.
 */
interface TypescriptOptions {
    /**
     * Enables type checking within Storybook.
     *
     * @default `false`
     */
    check: boolean;
    /**
     * Disable parsing typescript files through babel.
     *
     * @default `false`
     */
    skipBabel: boolean;
}
interface StoriesSpecifier {
    /**
     * When auto-titling, what to prefix all generated titles with (default: '')
     */
    titlePrefix?: string;
    /**
     * Where to start looking for story files
     */
    directory: string;
    /**
     * What does the filename of a story file look like?
     * (a glob, relative to directory, no leading `./`)
     * If unset, we use `** / *.stories.@(mdx|tsx|ts|jsx|js)` (no spaces)
     */
    files?: string;
}
declare type StoriesEntry = string | StoriesSpecifier;
declare type NormalizedStoriesSpecifier = Required<StoriesSpecifier> & {
    importPathMatcher: RegExp;
};
declare type Preset = string | {
    name: string;
    options?: any;
};
/**
 * An additional script that gets injected into the
 * preview or the manager,
 */
declare type Entry = string;
declare type StorybookRefs = Record<string, {
    title: string;
    url: string;
} | {
    disable: boolean;
}>;
declare type DocsOptions = {
    /**
     * Should we generate docs entries at all under any circumstances? (i.e. can they be rendered)
     */
    enabled?: boolean;
    /**
     * What should we call the generated docs entries?
     */
    defaultName?: string;
    /**
     * Should we generate a docs entry per CSF file?
     */
    docsPage?: boolean;
    /**
     * Only show doc entries in the side bar (usually set with the `--docs` CLI flag)
     */
    docsMode?: boolean;
};
/**
 * The interface for Storybook configuration in `main.ts` files.
 */
interface StorybookConfig {
    /**
     * Sets the addons you want to use with Storybook.
     *
     * @example `['@storybook/addon-essentials']` or `[{ name: '@storybook/addon-essentials', options: { backgrounds: false } }]`
     */
    addons?: Preset[];
    core?: CoreConfig;
    /**
     * Sets a list of directories of static files to be loaded by Storybook server
     *
     * @example `['./public']` or `[{from: './public', 'to': '/assets'}]`
     */
    staticDirs?: (DirectoryMapping | string)[];
    logLevel?: string;
    features?: {
        /**
         * Allows to disable deprecated implicit PostCSS loader. (will be removed in 7.0)
         */
        postcss?: boolean;
        /**
         * Build stories.json automatically on start/build
         */
        buildStoriesJson?: boolean;
        /**
         * Activate preview of CSF v3.0
         *
         * @deprecated This is always on now from 6.4 regardless of the setting
         */
        previewCsfV3?: boolean;
        /**
         * Activate on demand story store
         */
        storyStoreV7?: boolean;
        /**
         * Enable a set of planned breaking changes for SB7.0
         */
        breakingChangesV7?: boolean;
        /**
         * Enable the step debugger functionality in Addon-interactions.
         */
        interactionsDebugger?: boolean;
        /**
         * Use Storybook 7.0 babel config scheme
         */
        babelModeV7?: boolean;
        /**
         * Filter args with a "target" on the type from the render function (EXPERIMENTAL)
         */
        argTypeTargetsV7?: boolean;
        /**
         * Warn when there is a pre-6.0 hierarchy separator ('.' / '|') in the story title.
         * Will be removed in 7.0.
         */
        warnOnLegacyHierarchySeparator?: boolean;
        /**
         * Preview MDX2 support, will become default in 7.0
         */
        previewMdx2?: boolean;
    };
    /**
     * Tells Storybook where to find stories.
     *
     * @example `['./src/*.stories.@(j|t)sx?']`
     */
    stories: StoriesEntry[];
    /**
     * Framework, e.g. '@storybook/react', required in v7
     */
    framework?: Preset;
    /**
     * Controls how Storybook handles TypeScript files.
     */
    typescript?: Partial<TypescriptOptions>;
    /**
     * References external Storybooks
     */
    refs?: StorybookRefs | ((config: any, options: Options$1) => StorybookRefs);
    /**
     * Modify or return babel config.
     */
    babel?: (config: TransformOptions, options: Options$1) => TransformOptions | Promise<TransformOptions>;
    /**
     * Modify or return babel config.
     */
    babelDefault?: (config: TransformOptions, options: Options$1) => TransformOptions | Promise<TransformOptions>;
    /**
     * Add additional scripts to run in the preview a la `.storybook/preview.js`
     *
     * @deprecated use `previewAnnotations` or `/preview.js` file instead
     */
    config?: (entries: Entry[], options: Options$1) => Entry[];
    /**
     * Add additional scripts to run in the preview a la `.storybook/preview.js`
     */
    previewAnnotations?: (entries: Entry[], options: Options$1) => Entry[];
    /**
     * Process CSF files for the story index.
     */
    storyIndexers?: (indexers: StoryIndexer[], options: Options$1) => StoryIndexer[];
    /**
     * Docs related features in index generation
     */
    docs?: DocsOptions;
    /**
     * Programmatically modify the preview head/body HTML.
     * The previewHead and previewBody functions accept a string,
     * which is the existing head/body, and return a modified string.
     */
    previewHead?: (head: string, options: Options$1) => string;
    previewBody?: (body: string, options: Options$1) => string;
}
declare type PresetProperty<K, TStorybookConfig = StorybookConfig> = TStorybookConfig[K extends keyof TStorybookConfig ? K : never] | PresetPropertyFn<K, TStorybookConfig>;
declare type PresetPropertyFn<K, TStorybookConfig = StorybookConfig, TOptions = {}> = (config: TStorybookConfig[K extends keyof TStorybookConfig ? K : never], options: Options$1 & TOptions) => TStorybookConfig[K extends keyof TStorybookConfig ? K : never] | Promise<TStorybookConfig[K extends keyof TStorybookConfig ? K : never]>;

declare function filterPresetsConfig(presetsConfig: PresetConfig[]): PresetConfig[];
/**
 * Parse an addon into either a managerEntries or a preset. Throw on invalid input.
 *
 * Valid inputs:
 * - '@storybook/addon-actions/manager'
 *   =>  { type: 'virtual', item }
 *
 * - '@storybook/addon-docs/preset'
 *   =>  { type: 'presets', item }
 *
 * - '@storybook/addon-docs'
 *   =>  { type: 'presets', item: '@storybook/addon-docs/preset' }
 *
 * - { name: '@storybook/addon-docs(/preset)?', options: { ... } }
 *   =>  { type: 'presets', item: { name: '@storybook/addon-docs/preset', options } }
 */
interface ResolvedAddonPreset {
    type: 'presets';
    name: string;
}
interface ResolvedAddonVirtual {
    type: 'virtual';
    name: string;
    managerEntries?: string[];
    previewAnnotations?: string[];
    presets?: (string | {
        name: string;
        options?: any;
    })[];
}
declare const resolveAddonName: (configDir: string, name: string, options: any) => ResolvedAddonPreset | ResolvedAddonVirtual | undefined;
declare function loadPreset(input: PresetConfig, level: number, storybookOptions: InterPresetOptions): Promise<LoadedPreset[]>;
declare type InterPresetOptions = Omit<CLIOptions & LoadOptions & BuilderOptions, 'frameworkPresets'>;
declare function getPresets(presets: PresetConfig[], storybookOptions: InterPresetOptions): Promise<Presets>;
declare function loadAllPresets(options: CLIOptions & LoadOptions & BuilderOptions & {
    corePresets: string[];
    overridePresets: string[];
}): Promise<Presets>;

declare type OptionsEntry = {
    name: string;
};
declare type AddonEntry = string | OptionsEntry;
declare type AddonInfo = {
    name: string;
    inEssentials: boolean;
};
interface Options {
    before: AddonInfo;
    after: AddonInfo;
    configFile: string;
    getConfig: (path: string) => any;
}
declare const checkAddonOrder: ({ before, after, configFile, getConfig }: Options) => Promise<void>;

declare function loadEnvs(options?: {
    production?: boolean;
}): {
    stringified: Record<string, string>;
    raw: Record<string, string>;
};
declare const stringifyEnvs: (raw: Record<string, string>) => Record<string, string>;
declare const stringifyProcessEnvs: (raw: Record<string, string>) => Record<string, string>;

declare function handlebars(source: string, data: any): string;

declare const boost: Set<string>;
declare function getInterpretedFile(pathToFile: string): string | undefined;
declare function getInterpretedFileWithExt(pathToFile: string): {
    path: string;
    ext: string;
} | undefined;

declare function interopRequireDefault(filePath: string): any;
declare function serverRequire(filePath: string | string[]): any;
declare function serverResolve(filePath: string | string[]): string | null;

declare function loadCustomPresets({ configDir }: {
    configDir: string;
}): PresetConfig[];

declare function loadMainConfig({ configDir }: {
    configDir: string;
}): StorybookConfig;

/**
 * Framework can be a string or an object.  This utility always returns the string name.
 */
declare function getFrameworkName(options: Options$1): Promise<string>;

declare function getStorybookConfiguration(storybookScript: string, shortName: string, longName: string): string | null;

interface StorybookInfo {
    version: string;
    framework: string;
    frameworkPackage: string;
    renderer: string;
    rendererPackage: string;
    configDir?: string;
    mainConfig?: string;
    previewConfig?: string;
    managerConfig?: string;
}
declare const getStorybookInfo: (packageJson: PackageJson) => StorybookInfo;

declare const getAutoRefs: (options: Options$1) => Promise<Record<string, Ref>>;
declare function getRefs(options: Options$1): Promise<Record<string, Ref>>;

declare function loadManagerOrAddonsFile({ configDir }: {
    configDir: string;
}): string | undefined;

declare function loadPreviewOrConfigFile({ configDir }: {
    configDir: string;
}): string | undefined;

declare function logConfig(caption: unknown, config: unknown): void;

declare const getProjectRoot: () => string;
declare const nodePathsToArray: (nodePath: string) => string[];
/**
 * Ensures that a path starts with `./` or `../`, or is entirely `.` or `..`
 */
declare function normalizeStoryPath(filename: string): string;

declare const useProgressReporting: (router: Router, startTime: [number, number], options: any) => Promise<{
    handler: any;
    modulesCount: number;
}>;

/**
 * Get the path of the file or directory with input name inside the Storybook cache directory:
 *  - `node_modules/.cache/storybook/{directoryName}` in a Node.js project or npm package
 *  - `.cache/storybook/{directoryName}` otherwise
 *
 * @param fileOrDirectoryName {string} Name of the file or directory
 * @return {string} Absolute path to the file or directory
 */
declare function resolvePathInStorybookCache(fileOrDirectoryName: string): string;

declare const cache: Cache.FileSystemCache;

declare function getPreviewBodyTemplate(configDirPath: string, interpolations?: Record<string, string>): string;
declare function getPreviewHeadTemplate(configDirPath: string, interpolations?: Record<string, string>): string;
declare function getPreviewMainTemplate(): string;

/**
 * Return a string corresponding to template filled with bindings using following pattern:
 * For each (key, value) of `bindings` replace, in template, `{{key}}` by escaped version of `value`
 *
 * @param template {String} Template with `{{binding}}`
 * @param bindings {Object} key-value object use to fill the template, `{{key}}` will be replaced by `escaped(value)`
 * @returns {String} Filled template
 */
declare const interpolate: (template: string, bindings: Record<string, string>) => string;

declare function validateConfigurationFiles(configDir: string): void;

declare function globToRegexp(glob: string): RegExp;

declare const getDirectoryFromWorkingDir: ({ configDir, workingDir, directory, }: NormalizeOptions & {
    directory: string;
}) => string;
declare const normalizeStoriesEntry: (entry: StoriesEntry, { configDir, workingDir }: NormalizeOptions) => NormalizedStoriesSpecifier;
interface NormalizeOptions {
    configDir: string;
    workingDir: string;
}
declare const normalizeStories: (entries: StoriesEntry[], options: NormalizeOptions) => NormalizedStoriesSpecifier[];

declare function readTemplate(filename: string): Promise<string>;

declare const findDistEsm: (cwd: string, relativePath: string) => string;

declare function isPreservingSymlinks(): boolean | undefined;

export { AddonEntry, AddonInfo, Builder, BuilderName, BuilderOptions, BuilderResult, CLIOptions, CoreConfig, DocsOptions, Entry, IndexedStory, IndexerOptions, LoadOptions, LoadedPreset, NormalizedStoriesSpecifier, Options$1 as Options, OptionsEntry, PackageJson, Preset, PresetConfig, PresetProperty, PresetPropertyFn, Presets, Ref, ReleaseNotesData, Stats, StoriesEntry, StoryIndex, StoryIndexer, StorybookConfig, StorybookConfigOptions, TypescriptOptions, VersionCheck, boost, cache, checkAddonOrder, createFileSystemCache, filterPresetsConfig, findDistEsm, getAutoRefs, getDirectoryFromWorkingDir, getFrameworkName, getInterpretedFile, getInterpretedFileWithExt, getPresets, getPreviewBodyTemplate, getPreviewHeadTemplate, getPreviewMainTemplate, getProjectRoot, getRefs, getStorybookConfiguration, getStorybookInfo, globToRegexp, handlebars, interopRequireDefault, interpolate, isPreservingSymlinks, loadAllPresets, loadCustomPresets, loadEnvs, loadMainConfig, loadManagerOrAddonsFile, loadPreset, loadPreviewOrConfigFile, logConfig, nodePathsToArray, normalizeStories, normalizeStoriesEntry, normalizeStoryPath, readTemplate, resolveAddonName, resolvePathInStorybookCache, serverRequire, serverResolve, stringifyEnvs, stringifyProcessEnvs, useProgressReporting, validateConfigurationFiles };