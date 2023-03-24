import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    staticFile(req: any, res: any): void;
    fileManager(file: string, res: any): any;
    main(res: any): void;
}
