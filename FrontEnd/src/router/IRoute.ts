export interface IRoute {
    route: string;
    module: React.FunctionComponent;
    subRoutes: Array<IRoute>
}