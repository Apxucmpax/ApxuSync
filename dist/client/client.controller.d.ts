import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClientDto: UpdateClientDto): string;
    remove(id: string): string;
}
