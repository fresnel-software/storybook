declare const withTests: (userOptions: {
    results: any;
    filesExt?: string;
}) => (...args: any[]) => any;

export { withTests };
