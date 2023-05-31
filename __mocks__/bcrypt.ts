module.exports = {
    hash: jest.fn((...args: any[]): Promise<string> => {
        return new Promise((resolve) => {
            resolve(args[args.length - 1]);
        });
    }),
    compare: jest.fn((...args: any[]) => {
        return new Promise((resolve) => {
            resolve(args[args.length - 1]);
        });
    }),
};
