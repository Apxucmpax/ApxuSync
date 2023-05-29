import { OrderService } from './order.service';
import { CreateDto } from './dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(data: CreateDto): Promise<{
        status: string;
    }>;
}
